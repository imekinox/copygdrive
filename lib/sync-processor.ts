import { drive_v3 } from '@googleapis/drive'
import { getDriveClient } from './google-drive'
import { prisma } from './prisma'
import { RateLimiter } from './rate-limiter'

interface FileInfo {
  id: string
  name: string
  mimeType: string
  size?: string
  modifiedTime?: string
  parents?: string[]
}

interface SyncStrategy {
  toCreate: FileInfo[]  // Files that don't exist in destination
  toUpdate: FileInfo[]   // Files that exist but are newer in source
  toSkip: FileInfo[]     // Files that already exist and are up to date
  foldersToCreate: Map<string, string> // Source folder ID -> name
}

export class SyncProcessor {
  private userId: string
  private jobId: string
  private drive: drive_v3.Drive | null = null
  private rateLimiter: RateLimiter
  private destFileMap: Map<string, FileInfo> = new Map() // name -> file info for destination
  private processedItems = 0
  private skippedItems = 0
  private totalSize = 0
  private copiedSize = 0  // Size of newly copied files
  private skippedSize = 0  // Size of already existing files

  constructor(userId: string, jobId: string) {
    this.userId = userId
    this.jobId = jobId
    this.rateLimiter = new RateLimiter(userId)
  }

  async execute() {
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
      
      // Phase 1: Scan destination folder to build existing file map
      await this.updateJobStatus('scanning')
      console.log('🔍 Scanning destination folder for existing files...')
      
      // Check if root folder already exists in destination
      let rootDestFolderId = await this.findOrCreateRootFolder(job.sourceFolderId, job.destFolderId)
      
      // Scan destination to build map of existing files
      await this.scanDestinationFolder(rootDestFolderId)
      console.log(`📊 Found ${this.destFileMap.size} existing files in destination`)
      
      // Phase 2: Compare source with destination to build sync strategy
      console.log('🔄 Building sync strategy...')
      const strategy = await this.buildSyncStrategy(job.sourceFolderId, rootDestFolderId)
      
      // Log sync plan
      console.log(`📋 Sync Plan:`)
      console.log(`  - Files to copy: ${strategy.toCreate.length}`)
      console.log(`  - Files to update: ${strategy.toUpdate.length}`)
      console.log(`  - Files to skip: ${strategy.toSkip.length}`)
      console.log(`  - Folders to create: ${strategy.foldersToCreate.size}`)
      
      // Update job with sync information
      // Total items = all items found (new + existing + to update)
      const totalSourceItems = strategy.toCreate.length + strategy.toSkip.length + strategy.toUpdate.length
      const itemsToProcess = strategy.toCreate.length + strategy.toUpdate.length
      
      // Calculate size of already copied files
      for (const file of strategy.toSkip) {
        if (file.size) {
          this.skippedSize += parseInt(file.size)
        }
      }
      
      await prisma.copyJob.update({
        where: { id: this.jobId },
        data: {
          totalItems: totalSourceItems,  // Total items in source
          completedItems: strategy.toSkip.length,  // Already completed (existing files)
          totalBytes: this.totalSize.toString(),
          copiedBytes: this.skippedSize.toString(),  // Size of already copied files
          status: 'copying'
        }
      })
      
      // Phase 3: Create missing folders
      const folderMappings = new Map<string, string>()
      folderMappings.set(job.sourceFolderId, rootDestFolderId)
      
      for (const [sourceFolderId, folderName] of strategy.foldersToCreate) {
        // Find parent folder in destination
        const parentId = folderMappings.get(sourceFolderId) || rootDestFolderId
        
        // Check if folder already exists in the parent
        const escapedFolderName = folderName.replace(/'/g, "\\'")
        const existingFolders = await this.rateLimiter.executeWithRetry(
          () => this.drive!.files.list({
            q: `'${parentId}' in parents and name='${escapedFolderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id,name)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true
          }),
          false
        )
        
        let newFolderId: string
        
        if (existingFolders.data.files && existingFolders.data.files.length > 0) {
          // Use existing folder
          console.log(`  ✅ Found existing subfolder: ${folderName} (${existingFolders.data.files[0].id})`)
          newFolderId = existingFolders.data.files[0].id!
        } else {
          // Create new folder
          const newFolder = await this.rateLimiter.executeWithRetry(
            () => this.drive!.files.create({
              requestBody: {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [parentId]
              },
              fields: 'id',
              supportsAllDrives: true
            }),
            true
          )
          console.log(`  📁 Created subfolder: ${folderName} (${newFolder.data.id})`)
          newFolderId = newFolder.data.id!
        }
        
        folderMappings.set(sourceFolderId, newFolderId)
        this.processedItems++
        
        // Update progress
        await this.updateProgress()
      }
      
      // Phase 4: Copy missing files
      for (const file of strategy.toCreate) {
        await this.copyFile(file, folderMappings)
        this.processedItems++
        
        if (this.processedItems % 10 === 0) {
          await this.updateProgress()
        }
      }
      
      // Phase 5: Update modified files (if enabled)
      for (const file of strategy.toUpdate) {
        // For now, skip updates unless explicitly enabled
        // In future, add option to update newer files
        console.log(`⏭️ Skipping update for ${file.name} (updates not enabled)`)
        this.skippedItems++
      }
      
      // Mark job as completed
      // Total completed = newly processed + previously existing (skipped)
      const totalCompleted = this.processedItems + strategy.toSkip.length
      
      // Calculate total copied size (newly copied + previously existing)
      const totalCopiedSize = this.copiedSize + this.skippedSize
      
      await prisma.copyJob.update({
        where: { id: this.jobId },
        data: {
          status: 'completed',
          completedAt: new Date(),
          completedItems: totalCompleted,
          copiedBytes: totalCopiedSize.toString(),
          creditsUsed: Math.ceil(this.copiedSize / (1024 * 1024 * 1024))  // Only charge for newly copied data
        }
      })
      
      console.log(`✅ Sync completed! Newly copied: ${this.processedItems} items, Already existed: ${strategy.toSkip.length} items, Total: ${totalCompleted} items`)
      
    } catch (error) {
      console.error('Sync job failed:', error)
      await prisma.copyJob.update({
        where: { id: this.jobId },
        data: {
          status: 'failed',
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          completedAt: new Date()
        }
      })
      throw error
    }
  }
  
  private async findOrCreateRootFolder(sourceFolderId: string, destFolderId: string): Promise<string> {
    // Get source folder name
    const sourceFolder = await this.rateLimiter.executeWithRetry(
      () => this.drive!.files.get({
        fileId: sourceFolderId,
        fields: 'id,name',
        supportsAllDrives: true
      }),
      false
    )
    
    const folderName = sourceFolder.data.name!
    
    // Escape single quotes in folder name for the query
    const escapedFolderName = folderName.replace(/'/g, "\\'")
    
    // Check if folder already exists in destination
    console.log(`🔍 Checking for existing folder "${folderName}" in destination...`)
    const existingFolders = await this.rateLimiter.executeWithRetry(
      () => this.drive!.files.list({
        q: `'${destFolderId}' in parents and name='${escapedFolderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id,name)',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      }),
      false
    )
    
    if (existingFolders.data.files && existingFolders.data.files.length > 0) {
      console.log(`✅ Found existing root folder: ${folderName} (${existingFolders.data.files[0].id})`)
      return existingFolders.data.files[0].id!
    }
    
    // Create new root folder
    console.log(`📁 Creating new root folder: ${folderName}`)
    const newFolder = await this.rateLimiter.executeWithRetry(
      () => this.drive!.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [destFolderId]
        },
        fields: 'id',
        supportsAllDrives: true
      }),
      true
    )
    
    console.log(`✅ Created new root folder: ${folderName} (${newFolder.data.id})`)
    return newFolder.data.id!
  }
  
  private async scanDestinationFolder(folderId: string, path = '') {
    let pageToken: string | undefined
    
    do {
      const response = await this.rateLimiter.executeWithRetry(
        () => this.drive!.files.list({
          q: `'${folderId}' in parents and trashed=false`,
          fields: 'nextPageToken,files(id,name,mimeType,size,modifiedTime,parents)',
          pageSize: 1000,
          pageToken,
          supportsAllDrives: true,
          includeItemsFromAllDrives: true
        }),
        false
      )
      
      pageToken = response.data.nextPageToken ?? undefined
      const files = response.data.files || []
      
      for (const file of files) {
        const filePath = path ? `${path}/${file.name}` : file.name!
        
        // Store file info by path for quick lookup
        this.destFileMap.set(filePath, {
          id: file.id!,
          name: file.name!,
          mimeType: file.mimeType!,
          size: file.size || undefined,
          modifiedTime: file.modifiedTime || undefined,
          parents: file.parents || undefined
        })
        
        // Recursively scan subfolders
        if (file.mimeType === 'application/vnd.google-apps.folder') {
          await this.scanDestinationFolder(file.id!, filePath)
        }
      }
    } while (pageToken)
  }
  
  private async buildSyncStrategy(sourceFolderId: string, destFolderId: string, path = ''): Promise<SyncStrategy> {
    const strategy: SyncStrategy = {
      toCreate: [],
      toUpdate: [],
      toSkip: [],
      foldersToCreate: new Map()
    }
    
    let pageToken: string | undefined
    
    do {
      const response = await this.rateLimiter.executeWithRetry(
        () => this.drive!.files.list({
          q: `'${sourceFolderId}' in parents and trashed=false`,
          fields: 'nextPageToken,files(id,name,mimeType,size,modifiedTime)',
          pageSize: 1000,
          pageToken,
          supportsAllDrives: true,
          includeItemsFromAllDrives: true
        }),
        false
      )
      
      pageToken = response.data.nextPageToken ?? undefined
      const files = response.data.files || []
      
      for (const file of files) {
        const filePath = path ? `${path}/${file.name}` : file.name!
        const existingFile = this.destFileMap.get(filePath)
        
        // Create or update CopyItem record for tracking
        await prisma.copyItem.upsert({
          where: {
            jobId_sourceId: {
              jobId: this.jobId,
              sourceId: file.id!
            }
          },
          create: {
            jobId: this.jobId,
            sourceId: file.id!,
            sourceName: file.name!,
            sourcePath: filePath,
            mimeType: file.mimeType!,
            size: file.size || '0',
            status: existingFile ? 'completed' : 'pending',
            newId: existingFile?.id
          },
          update: {
            status: existingFile ? 'completed' : 'pending',
            newId: existingFile?.id,
            updatedAt: new Date()
          }
        })
        
        if (file.mimeType === 'application/vnd.google-apps.folder') {
          // Check if folder exists in destination
          if (!existingFile) {
            strategy.foldersToCreate.set(file.id!, file.name!)
          }
          
          // Recursively check subfolder
          const subStrategy = await this.buildSyncStrategy(file.id!, destFolderId, filePath)
          strategy.toCreate.push(...subStrategy.toCreate)
          strategy.toUpdate.push(...subStrategy.toUpdate)
          strategy.toSkip.push(...subStrategy.toSkip)
          subStrategy.foldersToCreate.forEach((name, id) => {
            strategy.foldersToCreate.set(id, name)
          })
        } else {
          // Check if file exists and compare
          if (!existingFile) {
            // File doesn't exist - need to copy
            strategy.toCreate.push({
              id: file.id!,
              name: file.name!,
              mimeType: file.mimeType!,
              size: file.size || undefined,
              modifiedTime: file.modifiedTime || undefined
            })
            
            if (file.size) {
              this.totalSize += parseInt(file.size)
            }
          } else if (this.shouldUpdate(file, existingFile)) {
            // File exists but is newer in source
            strategy.toUpdate.push({
              id: file.id!,
              name: file.name!,
              mimeType: file.mimeType!,
              size: file.size || undefined,
              modifiedTime: file.modifiedTime || undefined
            })
          } else {
            // File exists and is up to date
            strategy.toSkip.push({
              id: file.id!,
              name: file.name!,
              mimeType: file.mimeType!,
              size: file.size || undefined,
              modifiedTime: file.modifiedTime || undefined
            })
          }
        }
      }
    } while (pageToken)
    
    return strategy
  }
  
  private shouldUpdate(sourceFile: drive_v3.Schema$File, destFile: FileInfo): boolean {
    // Compare file size first
    if (sourceFile.size && destFile.size && sourceFile.size !== destFile.size) {
      return true
    }
    
    // Compare modified time if available
    if (sourceFile.modifiedTime && destFile.modifiedTime) {
      const sourceTime = new Date(sourceFile.modifiedTime).getTime()
      const destTime = new Date(destFile.modifiedTime).getTime()
      return sourceTime > destTime
    }
    
    return false
  }
  
  private async copyFile(file: FileInfo, folderMappings: Map<string, string>) {
    if (!this.drive) throw new Error('Drive client not initialized')
    
    // Update CopyItem status
    await prisma.copyItem.updateMany({
      where: {
        jobId: this.jobId,
        sourceId: file.id
      },
      data: { status: 'copying' }
    })
    
    try {
      // Find destination parent folder
      const destParentId = folderMappings.get(file.parents?.[0] || '') || folderMappings.values().next().value
      
      // Copy the file
      const copiedFile = await this.rateLimiter.executeWithRetry(
        () => this.drive!.files.copy({
          fileId: file.id,
          requestBody: {
            name: file.name,
            parents: [destParentId]
          },
          fields: 'id,name,size',
          supportsAllDrives: true
        }),
        true,
        parseInt(file.size || '0')
      )
      
      // Update CopyItem as completed
      await prisma.copyItem.updateMany({
        where: {
          jobId: this.jobId,
          sourceId: file.id
        },
        data: {
          status: 'completed',
          newId: copiedFile.data.id
        }
      })
      
      if (file.size) {
        this.copiedSize += parseInt(file.size)
      }
      
    } catch (error) {
      // Update CopyItem as failed
      await prisma.copyItem.updateMany({
        where: {
          jobId: this.jobId,
          sourceId: file.id
        },
        data: {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Copy failed'
        }
      })
      throw error
    }
  }
  
  private async updateJobStatus(status: string) {
    await prisma.copyJob.update({
      where: { id: this.jobId },
      data: { status }
    })
  }
  
  private async updateProgress() {
    // Count all completed items in database for accurate count
    const completedCount = await prisma.copyItem.count({
      where: { 
        jobId: this.jobId,
        status: 'completed'
      }
    })
    
    // Total bytes copied = skipped (already existed) + newly copied
    const totalCopiedBytes = this.skippedSize + this.copiedSize
    
    await prisma.copyJob.update({
      where: { id: this.jobId },
      data: {
        completedItems: completedCount,
        copiedBytes: totalCopiedBytes.toString()
      }
    })
  }
}