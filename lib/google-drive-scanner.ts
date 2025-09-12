import { drive_v3 } from 'googleapis'
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

interface ScanProgress {
  discoveredItems: number
  discoveredFolders: number
  discoveredBytes: number
  skippedItems: number
  lastPath: string
}

interface ScanResult {
  items: number
  folders: number
  bytes: number
  skipped: number
}

// Create Supabase admin client lazily
function getSupabaseAdmin() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

/**
 * Progressively scan a folder with simple concurrent subfolder processing
 * Uses the same logic as sequential but processes subfolders in parallel
 */
export async function scanFolder(
  drive: drive_v3.Drive,
  sourceFolderId: string,
  destFolderId: string,
  jobId: string,
  basePath: string = '',
  onProgress?: (progress: ScanProgress) => Promise<void>,
  maxConcurrency: number = 2
) {
  const startTime = Date.now()
  console.log(`🚀 Starting concurrent scan with ${maxConcurrency} parallel subfolder scans`)
  let discoveredItems = 0
  let discoveredFolders = 0
  let discoveredBytes = 0
  let skippedItems = 0
  const BATCH_SIZE = 10 // Reduced for more frequent progress updates
  
  // Build a map of destination folder structure
  const destFolderMap = new Map<string, string>()
  
  // Check if the root folder already exists in destination
  // The actual destination is a folder with basePath name INSIDE destFolderId
  let actualDestFolderId = destFolderId
  if (basePath) {
    const existingRootFolders = await drive.files.list({
      q: `name='${basePath.replace(/'/g, "\\'")}'` +
         ` and '${destFolderId}' in parents` +
         ` and mimeType='application/vnd.google-apps.folder'` +
         ` and trashed=false`,
      fields: 'files(id)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    })
    
    if (existingRootFolders.data.files && existingRootFolders.data.files.length > 0) {
      actualDestFolderId = existingRootFolders.data.files[0].id!
      console.log(`📁 Found existing destination folder: ${basePath} (${actualDestFolderId})`)
      // This is where we'll actually be copying files to
      destFolderMap.set('', actualDestFolderId)
    } else {
      console.log(`📁 Destination folder ${basePath} doesn't exist yet in ${destFolderId}`)
      // Keep destFolderId as is - the folder will be created during copy
      destFolderMap.set('', destFolderId)
    }
  } else {
    destFolderMap.set('', actualDestFolderId)
  }

  // Semaphore to control concurrent subfolder scans
  let activeScans = 0
  const pendingScans: (() => Promise<void>)[] = []
  const allScans: Promise<void>[] = [] // Track ALL scans globally

  async function scanFolder(folderId: string, path: string, destParentId: string, isRoot: boolean = false): Promise<void> {
    console.log(`📂 [${activeScans} active] Starting scan: ${path || 'ROOT'}`)
    let pageToken: string | undefined
    let batch: any[] = []
    const subfolderScans: Promise<void>[] = []

    do {
      // Fetch a page of items
      const response = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime)',
        pageSize: 100,
        pageToken,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      })

      if (response.data.files) {
        for (const file of response.data.files) {
          const fullPath = path ? `${path}/${file.name}` : file.name!
          const isFolder = file.mimeType === 'application/vnd.google-apps.folder'
          
          // Check if item already exists in destination
          let status = 'pending'
          let destId: string | null = null
          
          // Only check for existing items if the destination folder actually exists
          // If actualDestFolderId !== destFolderId, it means we found an existing destination folder
          const shouldCheckExisting = actualDestFolderId !== destFolderId || !isRoot
          
          if (shouldCheckExisting) {
            if (isFolder) {
              // Check for existing folder
              const existingFolders = await drive.files.list({
                q: `name='${file.name!.replace(/'/g, "\\'")}'` +
                   ` and '${destParentId}' in parents` +
                   ` and mimeType='application/vnd.google-apps.folder'` +
                   ` and trashed=false`,
                fields: 'files(id)',
                supportsAllDrives: true,
                includeItemsFromAllDrives: true
              })
              
              if (existingFolders.data.files && existingFolders.data.files.length > 0) {
                status = 'skipped'
                destId = existingFolders.data.files[0].id!
                destFolderMap.set(fullPath, destId)
                skippedItems++
              }
            } else {
              // Check for existing file
              const existingFiles = await drive.files.list({
                q: `name='${file.name!.replace(/'/g, "\\'")}'` +
                   ` and '${destParentId}' in parents` +
                   ` and trashed=false`,
                fields: 'files(id)',
                supportsAllDrives: true,
                includeItemsFromAllDrives: true
              })
              
              if (existingFiles.data.files && existingFiles.data.files.length > 0) {
                status = 'skipped'
                destId = existingFiles.data.files[0].id!
                skippedItems++
              }
            }
          }
          
          // Add to batch
          batch.push({
            job_id: jobId,
            source_id: file.id,
            source_name: file.name,
            source_path: fullPath,
            mime_type: file.mimeType,
            size: file.size ? parseInt(file.size, 10) : null,
            status: status,
            new_id: destId
          })

          // Update counts
          if (isFolder) {
            discoveredFolders++
          } else {
            discoveredItems++
            if (status === 'pending') {
              discoveredBytes += parseInt(file.size || '0', 10)
            }
          }

          // Store batch when it reaches BATCH_SIZE
          if (batch.length >= BATCH_SIZE) {
            await storeBatch(batch)
            batch = []
            
            // Report progress
            if (onProgress) {
              await onProgress({
                discoveredItems,
                discoveredFolders,
                discoveredBytes,
                skippedItems,
                lastPath: fullPath
              })
            }
          }

          // Handle subfolder scanning with concurrency control
          if (isFolder && file.id) {
            const childDestId = destFolderMap.get(fullPath) || destParentId
            
            // Create a promise for scanning this subfolder
            const scanPromise = async () => {
              // Wait if we're at max concurrency
              if (activeScans >= maxConcurrency) {
                console.log(`⏳ [${activeScans} active] Queuing: ${fullPath} (waiting for slot)`)
                while (activeScans >= maxConcurrency) {
                  await new Promise(resolve => setTimeout(resolve, 10)) // Reduced wait time
                }
              }
              
              activeScans++
              console.log(`🔄 [${activeScans} active] Starting subfolder: ${fullPath}`)
              try {
                await scanFolder(file.id!, fullPath, childDestId)
              } finally {
                activeScans--
                console.log(`✓ [${activeScans} active] Completed: ${fullPath}`)
                
                // Start next pending scan if any
                const nextScan = pendingScans.shift()
                if (nextScan) {
                  console.log(`🚀 [${activeScans} active] Starting queued scan`)
                  const scanTask = nextScan() // Start the deferred scan
                  allScans.push(scanTask) // Track it globally
                  subfolderScans.push(scanTask) // Add to parent's waits
                }
              }
            }
            
            // If under concurrency limit, start immediately
            if (activeScans < maxConcurrency) {
              console.log(`➕ [${activeScans} active] Starting immediate scan: ${fullPath}`)
              const scanTask = scanPromise()
              allScans.push(scanTask)
              subfolderScans.push(scanTask)
            } else {
              // Queue it for later - defer promise creation
              console.log(`📋 [${activeScans} active] Adding to pending queue: ${fullPath}`)
              pendingScans.push(scanPromise) // Store the function, not the result
            }
          }
        }
      }

      pageToken = response.data.nextPageToken || undefined
    } while (pageToken)

    // Store remaining items in batch
    if (batch.length > 0) {
      await storeBatch(batch)
      
      // Final progress update for this folder
      if (onProgress) {
        await onProgress({
          discoveredItems,
          discoveredFolders,
          discoveredBytes,
          skippedItems,
          lastPath: path
        })
      }
    }

    // Wait for all subfolder scans to complete
    if (subfolderScans.length > 0) {
      console.log(`⏸️  [${activeScans} active] Waiting for ${subfolderScans.length} subfolder scans in: ${path || 'ROOT'}`)
      await Promise.all(subfolderScans)
    }
    console.log(`✅ [${activeScans} active] Finished scanning: ${path || 'ROOT'}`)
  }

  async function storeBatch(items: any[]) {
    const supabaseAdmin = getSupabaseAdmin()
    const { error } = await supabaseAdmin
      .from('copy_items')
      .insert(items)
    
    if (error) {
      console.error('Error storing batch:', error)
    }
  }

  // Start scanning from root
  // For root scan, we use actualDestFolderId which is either:
  // - The existing folder with basePath name if it exists
  // - The original destFolderId if the folder doesn't exist yet
  await scanFolder(sourceFolderId, basePath, actualDestFolderId, true)
  
  // Wait for ALL scans to complete (including any that were queued)
  console.log(`⏳ Waiting for all scans to complete...`)
  
  // Keep checking until all scans are done
  while (activeScans > 0 || pendingScans.length > 0) {
    console.log(`⏳ Active: ${activeScans}, Pending: ${pendingScans.length}`)
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log(`✅ All scans completed!`)
  
  // Calculate and print scan duration
  const duration = (Date.now() - startTime) / 1000
  console.log(`⏱️  Scan completed in ${duration.toFixed(2)} seconds`)
  console.log(`📊 Results: ${discoveredItems} files, ${discoveredFolders} folders, ${skippedItems} skipped`)
  
  // Send final progress update with correct totals
  if (onProgress) {
    console.log(`📊 Sending final update: ${discoveredItems} files, ${discoveredFolders} folders`)
    await onProgress({
      discoveredItems,
      discoveredFolders,
      discoveredBytes,
      skippedItems,
      lastPath: 'Scan completed'
    })
  }

  return {
    discoveredItems,
    discoveredFolders,
    discoveredBytes,
    skippedItems
  }
}

/**
 * Copy files concurrently with controlled parallelism
 */
export async function copyStoredItemsConcurrent(
  drive: drive_v3.Drive,
  jobId: string,
  destFolderId: string,
  onProgress?: (completed: number, total: number) => Promise<void>,
  maxConcurrency: number = 10
) {
  const startTime = Date.now()
  console.log(`🚀 Starting concurrent copy with ${maxConcurrency} parallel operations`)
  
  const supabaseAdmin = getSupabaseAdmin()
  
  // First, get ALL items to build the folder map
  const { data: allItems, error: allError } = await supabaseAdmin
    .from('copy_items')
    .select('*')
    .eq('job_id', jobId)
    .order('source_path')

  if (allError || !allItems) {
    throw new Error('Failed to fetch items')
  }

  const folderMap = new Map<string, string>() // source path -> dest folder id
  folderMap.set('', destFolderId) // Root maps to destination folder
  
  // Build folder map from skipped folders (they already exist in destination)
  console.log(`Building folder map from ${allItems.length} total items`)
  for (const item of allItems) {
    if (item.status === 'skipped' && item.new_id && item.mime_type === 'application/vnd.google-apps.folder') {
      folderMap.set(item.source_path, item.new_id)
      console.log(`  📁 Using existing folder: ${item.source_path} -> ${item.new_id}`)
    }
  }
  console.log(`Folder map has ${folderMap.size} entries`)
  
  // Get only pending items to copy
  const { data: items, error } = await supabaseAdmin
    .from('copy_items')
    .select('*')
    .eq('job_id', jobId)
    .eq('status', 'pending')
    .order('source_path')

  if (error || !items) {
    throw new Error('Failed to fetch items to copy')
  }
  
  let completed = 0
  const total = items.length
  
  // Separate folders and files
  const folders = items.filter(item => item.mime_type === 'application/vnd.google-apps.folder')
  const files = items.filter(item => item.mime_type !== 'application/vnd.google-apps.folder')
  
  console.log(`📂 Processing ${folders.length} folders with concurrent creation...`)
  
  // Group folders by depth level for concurrent processing
  const foldersByLevel = new Map<number, any[]>()
  
  for (const folder of folders) {
    const depth = folder.source_path.split('/').length - 1
    if (!foldersByLevel.has(depth)) {
      foldersByLevel.set(depth, [])
    }
    foldersByLevel.get(depth)!.push(folder)
  }
  
  // Sort levels to process from root to leaves
  const levels = Array.from(foldersByLevel.keys()).sort((a, b) => a - b)
  
  // Process each level concurrently
  for (const level of levels) {
    const foldersAtLevel = foldersByLevel.get(level) || []
    console.log(`  📁 Creating ${foldersAtLevel.length} folders at depth ${level} with ${maxConcurrency} concurrent operations...`)
    
    // Process folders at this level concurrently
    const activeFolderOps = new Set<Promise<void>>()
    
    for (const folder of foldersAtLevel) {
      // Wait if we're at max concurrency
      while (activeFolderOps.size >= maxConcurrency) {
        await Promise.race(activeFolderOps)
      }
      
      const folderPromise = (async () => {
        try {
          // Update status to copying
          await supabaseAdmin
            .from('copy_items')
            .update({ status: 'copying' })
            .eq('id', folder.id)

          const parentPath = folder.source_path.substring(0, folder.source_path.lastIndexOf('/'))
          const parentDestId = folderMap.get(parentPath) || destFolderId
          
          // Trust the scan results - no need to check again
          // Items with status 'pending' need to be created
          // Items with status 'skipped' already exist (handled earlier in folderMap)
          
          // Create new folder
          const response = await drive.files.create({
            requestBody: {
              name: folder.source_name,
              mimeType: 'application/vnd.google-apps.folder',
              parents: [parentDestId]
            },
            fields: 'id',
            supportsAllDrives: true
          })
          
          const folderId = response.data.id
          console.log(`    📁 Created folder: ${folder.source_name}`)

          if (folderId) {
            // Store mapping for child items
            folderMap.set(folder.source_path, folderId)
            
            // Update item with new ID
            await supabaseAdmin
              .from('copy_items')
              .update({ 
                status: 'completed',
                new_id: folderId 
              })
              .eq('id', folder.id)
          }
          
          completed++
          if (onProgress) {
            await onProgress(completed, total)
          }
        } catch (error) {
          console.error(`Failed to create folder ${folder.source_name}:`, error)
          await supabaseAdmin
            .from('copy_items')
            .update({ 
              status: 'failed',
              error: error instanceof Error ? error.message : 'Unknown error'
            })
            .eq('id', folder.id)
          
          completed++
          if (onProgress) {
            await onProgress(completed, total)
          }
        }
      })().finally(() => {
        activeFolderOps.delete(folderPromise)
      })
      
      activeFolderOps.add(folderPromise)
    }
    
    // Wait for all folders at this level to complete before moving to next level
    await Promise.all(activeFolderOps)
  }
  
  console.log(`📄 Processing ${files.length} files with ${maxConcurrency} concurrent operations...`)
  
  async function processFile(file: any) {
    try {
      // Update status to copying
      await supabaseAdmin
        .from('copy_items')
        .update({ status: 'copying' })
        .eq('id', file.id)

      const parentPath = file.source_path.substring(0, file.source_path.lastIndexOf('/'))
      const parentDestId = folderMap.get(parentPath) || destFolderId
      
      // Trust the scan results - no need to check again
      // We're only processing 'pending' items, so they need to be copied
      
      // Copy file
      const response = await drive.files.copy({
        fileId: file.source_id,
        requestBody: {
          name: file.source_name,
          parents: [parentDestId]
        },
        fields: 'id',
        supportsAllDrives: true
      })

      if (response.data.id) {
        console.log(`  📄 Copied file: ${file.source_name}`)
        
        await supabaseAdmin
          .from('copy_items')
          .update({ 
            status: 'completed',
            new_id: response.data.id 
          })
          .eq('id', file.id)
      }
      
      completed++
      if (onProgress) {
        await onProgress(completed, total)
      }
    } catch (error) {
      console.error(`Failed to copy ${file.source_name}:`, error)
      
      await supabaseAdmin
        .from('copy_items')
        .update({ 
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        })
        .eq('id', file.id)
      
      completed++
      if (onProgress) {
        await onProgress(completed, total)
      }
    }
  }
  
  // Process files in batches to avoid memory issues
  const activeBatch = new Set<Promise<void>>()
  
  for (const file of files) {
    // Wait if we're at max concurrency
    while (activeBatch.size >= maxConcurrency) {
      await Promise.race(activeBatch)
    }
    
    // Start processing file
    const promise = processFile(file).finally(() => {
      activeBatch.delete(promise)
    })
    
    activeBatch.add(promise)
  }
  
  // Wait for all remaining operations
  await Promise.all(activeBatch)
  
  const duration = (Date.now() - startTime) / 1000
  console.log(`⏱️  Copy completed in ${duration.toFixed(2)} seconds`)
  console.log(`📊 Results: ${completed}/${total} items processed`)
  
  return { completed, total }
}