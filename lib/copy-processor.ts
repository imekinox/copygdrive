import { prisma } from './prisma'
import { getDriveClient } from './google-drive'
import { drive_v3 } from 'googleapis'
import { getRateLimiter } from './rate-limiter'

interface FolderMapping {
  sourceId: string
  destId: string
}

export class CopyProcessor {
  private userId: string
  private jobId: string
  private drive: drive_v3.Drive | null = null
  private rateLimiter: ReturnType<typeof getRateLimiter>
  private folderMappings: Map<string, string> = new Map()
  private processedItems = 0
  private totalSize = 0
  private itemsToProcess: Array<{
    file: drive_v3.Schema$File
    sourceParentId: string  // Track the source parent folder
    destFolderId: string    // Will be set to the actual destination after folders are created
    path: string
  }> = []
  private foldersToCreate: Array<{
    sourceId: string
    name: string
    destParentId: string
    path: string
  }> = []
  
  constructor(userId: string, jobId: string) {
    this.userId = userId
    this.jobId = jobId
    this.rateLimiter = getRateLimiter(userId)
  }
  
  async process() {
    try {
      // Get job details
      const job = await prisma.copyJob.findUnique({
        where: { id: this.jobId }
      })
      
      if (!job) {
        throw new Error('Job not found')
      }
      
      // Initialize Drive client
      this.drive = await getDriveClient(this.userId)
      
      // Get source folder details to create it in destination
      const sourceFolder = await this.rateLimiter.executeWithRetry(
        () => this.drive!.files.get({
          fileId: job.sourceFolderId,
          fields: 'id,name',
          supportsAllDrives: true
        }),
        false // This is a read operation
      )
      
      const folderName = sourceFolder.data.name!
      
      // Escape single quotes in folder name for the query
      const escapedFolderName = folderName.replace(/'/g, "\\'")
      
      // Check if folder already exists in destination
      console.log(`🔍 Checking for existing folder "${folderName}" in destination...`)
      const existingFolders = await this.rateLimiter.executeWithRetry(
        () => this.drive!.files.list({
          q: `'${job.destFolderId}' in parents and name='${escapedFolderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
          fields: 'files(id,name)',
          supportsAllDrives: true,
          includeItemsFromAllDrives: true
        }),
        false
      )
      
      let rootDestFolderId: string
      
      if (existingFolders.data.files && existingFolders.data.files.length > 0) {
        // Use existing folder
        console.log(`✅ Found existing root folder: ${folderName} (${existingFolders.data.files[0].id})`)
        rootDestFolderId = existingFolders.data.files[0].id!
      } else {
        // Create new root folder
        console.log(`📁 Creating new root folder: ${folderName}`)
        const rootFolder = await this.rateLimiter.executeWithRetry(
          () => this.drive!.files.create({
            requestBody: {
              name: folderName,
              mimeType: 'application/vnd.google-apps.folder',
              parents: [job.destFolderId]
            },
            fields: 'id',
            supportsAllDrives: true
          }),
          true // This is a write operation
        )
        console.log(`✅ Created new root folder: ${folderName} (${rootFolder.data.id})`)
        rootDestFolderId = rootFolder.data.id!
      }
      
      // Phase 1: Scan everything first (now into the newly created root folder)
      await this.updateJobStatus('scanning')
      await this.scanFolder(job.sourceFolderId, rootDestFolderId, '')
      
      // Update total items count
      await prisma.copyJob.update({
        where: { id: this.jobId },
        data: {
          totalItems: this.itemsToProcess.length,
          totalBytes: this.totalSize.toString()
        }
      })
      
      // Check if user has enough credits
      const creditsNeeded = Math.ceil(this.totalSize / (1024 * 1024 * 1024))
      const user = await prisma.user.findUnique({
        where: { id: this.userId },
        select: { credits: true }
      })
      
      if (!user || user.credits < creditsNeeded) {
        throw new Error(`Insufficient credits. Need ${creditsNeeded} GB but only have ${user?.credits || 0} GB`)
      }
      
      // Phase 2: Create all folders first
      await this.updateJobStatus('copying')
      await this.createAllFolders()
      
      // Phase 3: Copy all files
      await this.copyAllFiles()
      
      // Calculate credits used
      const creditsUsed = Math.ceil(this.totalSize / (1024 * 1024 * 1024))
      
      // Update job as completed
      await prisma.copyJob.update({
        where: { id: this.jobId },
        data: {
          status: 'completed',
          completedAt: new Date(),
          creditsUsed,
          totalBytes: this.totalSize.toString()
        }
      })
      
      // Deduct credits from user
      await prisma.user.update({
        where: { id: this.userId },
        data: {
          credits: { decrement: creditsUsed }
        }
      })
      
    } catch (error) {
      console.error('Copy job failed:', error)
      await prisma.copyJob.update({
        where: { id: this.jobId },
        data: {
          status: 'failed',
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          completedAt: new Date()
        }
      })
    }
  }
  
  private async scanFolder(sourceFolderId: string, destFolderId: string, path: string) {
    if (!this.drive) throw new Error('Drive client not initialized')
    
    // Map this folder
    this.folderMappings.set(sourceFolderId, destFolderId)
    
    let pageToken: string | undefined
    let scannedCount = 0
    
    do {
      const response = await this.rateLimiter.executeWithRetry(
        () => this.drive!.files.list({
          q: `'${sourceFolderId}' in parents and trashed=false`,
          fields: 'nextPageToken,files(id,name,mimeType,size)',
          pageSize: 1000,
          pageToken,
          supportsAllDrives: true,
          includeItemsFromAllDrives: true
        }),
        false // This is a read operation
      )
      
      pageToken = response.data.nextPageToken ?? undefined
      const files = response.data.files || []
      
      for (const file of files) {
        const filePath = path ? `${path}/${file.name}` : file.name!
        
        // Create a copyItem record for tracking
        await prisma.copyItem.create({
          data: {
            jobId: this.jobId,
            sourceId: file.id!,
            sourceName: file.name!,
            sourcePath: filePath,
            mimeType: file.mimeType!,
            size: file.size || '0',
            status: 'pending'
          }
        })
        
        if (file.mimeType === 'application/vnd.google-apps.folder') {
          // Add folder to creation list
          this.foldersToCreate.push({
            sourceId: file.id!,
            name: file.name!,
            destParentId: destFolderId,
            path: filePath
          })
          
          // Recursively scan subfolder (destination will be determined after folder creation)
          await this.scanFolder(file.id!, destFolderId, filePath)
        } else {
          // Add file to processing list
          this.itemsToProcess.push({
            file,
            sourceParentId: sourceFolderId,  // Store the source parent folder ID
            destFolderId: '',  // Will be set after folders are created
            path: filePath
          })
          
          // Track size
          if (file.size) {
            this.totalSize += parseInt(file.size)
          }
        }
        
        scannedCount++
        
        // Update scanning progress every 100 items
        if (scannedCount % 100 === 0) {
          await prisma.copyJob.update({
            where: { id: this.jobId },
            data: {
              totalItems: this.itemsToProcess.length + this.foldersToCreate.length
            }
          })
        }
      }
    } while (pageToken)
  }
  
  private async createAllFolders() {
    if (!this.drive) throw new Error('Drive client not initialized')
    
    // Sort folders by path depth to create parents first
    this.foldersToCreate.sort((a, b) => {
      const depthA = a.path.split('/').length
      const depthB = b.path.split('/').length
      return depthA - depthB
    })
    
    let createdFolderCount = 0
    
    for (const folder of this.foldersToCreate) {
      try {
        // Find the parent folder in the destination
        // If the parent was a created folder, use its new ID
        // Otherwise use the original destination parent ID
        let actualParentId = folder.destParentId
        
        // Check if the parent folder is one we created
        for (const createdFolder of this.foldersToCreate) {
          if (createdFolder.sourceId === folder.sourceId) continue // Skip self
          
          // Check if this folder's path indicates it's a child of createdFolder
          if (folder.path.startsWith(createdFolder.path + '/')) {
            const mappedId = this.folderMappings.get(createdFolder.sourceId)
            if (mappedId) {
              // Check if this is the direct parent
              const relativePath = folder.path.substring(createdFolder.path.length + 1)
              if (!relativePath.includes('/')) {
                actualParentId = mappedId
                break
              }
            }
          }
        }
        
        // Check if folder already exists in the parent
        const escapedFolderName = folder.name.replace(/'/g, "\\'")
        const existingFolders = await this.rateLimiter.executeWithRetry(
          () => this.drive!.files.list({
            q: `'${actualParentId}' in parents and name='${escapedFolderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id,name)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true
          }),
          false
        )
        
        let newFolderId: string
        
        if (existingFolders.data.files && existingFolders.data.files.length > 0) {
          // Use existing folder
          console.log(`  ✅ Found existing folder: ${folder.path} (${existingFolders.data.files[0].id})`)
          newFolderId = existingFolders.data.files[0].id!
        } else {
          // Create new folder
          const newFolder = await this.rateLimiter.executeWithRetry(
            () => this.drive!.files.create({
              requestBody: {
                name: folder.name,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [actualParentId]
              },
              fields: 'id',
              supportsAllDrives: true
            }),
            true // This is a write operation
          )
          console.log(`  📁 Created folder: ${folder.path} (${newFolder.data.id})`)
          newFolderId = newFolder.data.id!
        }
        
        // Map the old folder ID to the new one
        this.folderMappings.set(folder.sourceId, newFolderId)
        
        // Update copyItem status
        await prisma.copyItem.updateMany({
          where: { 
            jobId: this.jobId,
            sourceId: folder.sourceId
          },
          data: {
            status: 'completed',
            newId: newFolderId
          }
        })
        
        // Track folder creation as a completed item
        createdFolderCount++
        this.processedItems++
        
        // Update progress every 10 folders
        if (createdFolderCount % 10 === 0) {
          await prisma.copyJob.update({
            where: { id: this.jobId },
            data: {
              completedItems: this.processedItems
            }
          })
        }
        
      } catch (error) {
        console.error(`Failed to create folder ${folder.name}:`, error)
      }
    }
    
    // Final update for any remaining folders
    if (createdFolderCount > 0) {
      await prisma.copyJob.update({
        where: { id: this.jobId },
        data: {
          completedItems: this.processedItems
        }
      })
    }
  }
  
  private async copyAllFiles() {
    let copiedCount = 0
    
    for (const item of this.itemsToProcess) {
      try {
        // Look up the actual destination folder from our mappings
        const actualDestFolderId = this.folderMappings.get(item.sourceParentId)
        
        if (!actualDestFolderId) {
          console.error(`No destination mapping found for source parent ${item.sourceParentId}`)
          continue
        }
        
        await this.copyFile(item.file, actualDestFolderId)
        copiedCount++
        this.processedItems++
        
        // Update progress every 10 files
        if (copiedCount % 10 === 0) {
          await prisma.copyJob.update({
            where: { id: this.jobId },
            data: {
              completedItems: this.processedItems
            }
          })
        }
        
      } catch (error) {
        console.error(`Failed to copy ${item.file.name}:`, error)
        await this.recordFailedItem(item.file, error)
      }
    }
    
    // Final update for any remaining files
    if (copiedCount > 0) {
      await prisma.copyJob.update({
        where: { id: this.jobId },
        data: {
          completedItems: this.processedItems
        }
      })
    }
  }
  
  private async copyFolder(sourceFolderId: string, destFolderId: string, folderName: string): Promise<string> {
    if (!this.drive) throw new Error('Drive client not initialized')
    
    // Create the folder in destination with rate limiter
    const newFolder = await this.rateLimiter.executeWithRetry(
      () => this.drive!.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [destFolderId]
        },
        fields: 'id,name',
        supportsAllDrives: true
      }),
      true // This is a write operation
    )
    
    const newFolderId = newFolder.data.id!
    this.folderMappings.set(sourceFolderId, newFolderId)
    
    // List all items in the source folder with rate limiter
    let pageToken: string | undefined
    
    do {
      const response = await this.rateLimiter.executeWithRetry(
        () => this.drive!.files.list({
          q: `'${sourceFolderId}' in parents and trashed=false`,
          fields: 'nextPageToken,files(id,name,mimeType,size,parents)',
          pageSize: 1000,
          pageToken,
          supportsAllDrives: true,
          includeItemsFromAllDrives: true
        }),
        false // This is a read operation
      )
      
      pageToken = response.data.nextPageToken ?? undefined
      const files = response.data.files || []
      
      // Process each file/folder
      for (const file of files) {
        try {
          if (file.mimeType === 'application/vnd.google-apps.folder') {
            // Recursively copy subfolder
            await this.copyFolder(file.id!, newFolderId, file.name!)
          } else {
            // Copy file
            await this.copyFile(file, newFolderId)
          }
          
          this.processedItems++
          
          // Update progress every 10 items
          if (this.processedItems % 10 === 0) {
            await this.updateProgress()
          }
          
        } catch (error) {
          console.error(`Failed to copy ${file.name}:`, error)
          await this.recordFailedItem(file, error)
        }
      }
    } while (pageToken)
    
    return newFolderId
  }
  
  private async copyFile(file: drive_v3.Schema$File, destFolderId: string) {
    if (!this.drive) throw new Error('Drive client not initialized')
    
    // Update the existing copyItem status to copying (created during scan)
    await prisma.copyItem.updateMany({
      where: {
        jobId: this.jobId,
        sourceId: file.id!
      },
      data: { status: 'copying' }
    })
    
    try {
      // Google Docs/Sheets/Slides need special handling
      if (file.mimeType?.startsWith('application/vnd.google-apps.')) {
        // Export and re-import Google Workspace files
        // For now, just copy them directly
        const copiedFile = await this.rateLimiter.executeWithRetry(
          () => this.drive!.files.copy({
            fileId: file.id!,
            requestBody: {
              name: file.name,
              parents: [destFolderId]
            },
            fields: 'id,name,size',
            supportsAllDrives: true
          }),
          true, // This is a write operation
          parseInt(file.size || '0') // Include file size for daily quota tracking
        )
        
        // Update item as completed
        await prisma.copyItem.updateMany({
          where: { 
            jobId: this.jobId,
            sourceId: file.id!
          },
          data: {
            newId: copiedFile.data.id,
            status: 'completed'
          }
        })
      } else {
        // Regular files - copy directly
        const copiedFile = await this.rateLimiter.executeWithRetry(
          () => this.drive!.files.copy({
            fileId: file.id!,
            requestBody: {
              name: file.name,
              parents: [destFolderId]
            },
            fields: 'id,name,size',
            supportsAllDrives: true
          }),
          true, // This is a write operation
          parseInt(file.size || '0') // Include file size for daily quota tracking
        )
        
        // Update item as completed
        await prisma.copyItem.updateMany({
          where: { 
            jobId: this.jobId,
            sourceId: file.id!
          },
          data: {
            newId: copiedFile.data.id,
            status: 'completed'
          }
        })
        
        // Track size for credit calculation
        if (file.size) {
          this.totalSize += parseInt(file.size)
        }
      }
    } catch (error) {
      // Update item as failed
      await prisma.copyItem.updateMany({
        where: { 
          jobId: this.jobId,
          sourceId: file.id!
        },
        data: {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Copy failed'
        }
      })
      throw error
    }
  }
  
  private async recordFailedItem(file: drive_v3.Schema$File, error: any) {
    await prisma.copyItem.create({
      data: {
        jobId: this.jobId,
        sourceId: file.id!,
        sourceName: file.name!,
        sourcePath: file.name!,
        mimeType: file.mimeType!,
        size: file.size || '0',
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    })
    
    // Increment failed count
    await prisma.copyJob.update({
      where: { id: this.jobId },
      data: {
        failedItems: { increment: 1 }
      }
    })
  }
  
  private async updateProgress() {
    await prisma.copyJob.update({
      where: { id: this.jobId },
      data: {
        completedItems: this.processedItems,
        copiedBytes: this.totalSize.toString(),
        totalItems: this.processedItems // We don't know total ahead of time
      }
    })
  }
  
  private async updateJobStatus(status: string) {
    await prisma.copyJob.update({
      where: { id: this.jobId },
      data: {
        status,
        startedAt: status === 'scanning' ? new Date() : undefined
      }
    })
  }
}