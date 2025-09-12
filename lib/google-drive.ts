import { drive_v3, google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function getDriveClient(userId: string) {
  // Get the user's tokens from Supabase
  const { data: account } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', userId)
    .eq('provider', 'google')
    .single()
  
  if (!account || !account.access_token) {
    throw new Error('No Google account found')
  }
  
  const oauth2Client = new OAuth2Client(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET
  )
  
  oauth2Client.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
  })
  
  return google.drive({ version: 'v3', auth: oauth2Client })
}

export interface DriveFolder {
  id: string
  name: string
  mimeType: string
  parents?: string[]
  shared?: boolean
  capabilities?: {
    canAddChildren?: boolean
    canCopy?: boolean
    canDownload?: boolean
  }
}

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  size?: string
  parents?: string[]
  webViewLink?: string
  iconLink?: string
}

// List folders accessible to user
export async function listFolders(userId: string, options?: {
  sharedWithMe?: boolean
  sharedDrives?: boolean
  parentId?: string
}) {
  const drive = await getDriveClient(userId)
  
  // If requesting shared drives list, use the drives.list API
  if (options?.sharedDrives && !options?.parentId) {
    const response = await drive.drives.list({
      pageSize: 100
    })
    
    // Convert shared drives to folder format
    const sharedDrives = response.data.drives?.map(drive => ({
      id: drive.id!,
      name: drive.name!,
      mimeType: 'application/vnd.google-apps.folder',
      capabilities: {
        canAddChildren: true,
        canCopy: true
      }
    })) || []
    
    return sharedDrives as DriveFolder[]
  }
  
  let q = "mimeType='application/vnd.google-apps.folder' and trashed=false"
  
  if (options?.parentId) {
    // When we have a parent ID, always use it
    q += ` and '${options.parentId}' in parents`
  } else if (options?.sharedWithMe) {
    // Only show root-level shared folders (not subfolders)
    q += " and sharedWithMe=true"
  } else if (!options?.sharedDrives) {
    // Default to root of My Drive
    q += " and 'root' in parents"
  }
  
  const response = await drive.files.list({
    q,
    fields: 'files(id,name,mimeType,parents,shared,capabilities)',
    orderBy: 'name',
    pageSize: 100,
    // Only include shared drive support when explicitly working with shared drives
    ...(options?.sharedDrives ? {
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    } : {})
  })
  
  return response.data.files as DriveFolder[]
}

// Get folder details
export async function getFolder(userId: string, folderId: string) {
  const drive = await getDriveClient(userId)
  
  const response = await drive.files.get({
    fileId: folderId,
    fields: 'id,name,mimeType,parents,shared,capabilities,size',
    supportsAllDrives: true
  })
  
  return response.data as DriveFolder
}

// List files in a folder
export async function listFiles(userId: string, folderId: string) {
  const drive = await getDriveClient(userId)
  
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: 'files(id,name,mimeType,size,parents,webViewLink,iconLink)',
    orderBy: 'folder,name',
    pageSize: 1000,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true
  })
  
  return response.data.files as DriveFile[]
}

// Count items and calculate size - Recursive version for accurate counts
export async function getFolderStatsQuick(userId: string, folderId: string) {
  const drive = await getDriveClient(userId)
  
  let totalFiles = 0
  let totalSize = 0
  let totalFolders = 0
  
  // Recursive helper function
  async function scanFolder(currentFolderId: string) {
    let pageToken: string | undefined
    
    do {
      const response = await drive.files.list({
        q: `'${currentFolderId}' in parents and trashed=false`,
        fields: 'nextPageToken,files(id,mimeType,size)',
        pageSize: 1000,
        pageToken,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      })
      
      pageToken = response.data.nextPageToken ?? undefined
      
      for (const file of response.data.files || []) {
        if (file.mimeType === 'application/vnd.google-apps.folder') {
          totalFolders++
          // Recursively scan subfolders
          await scanFolder(file.id!)
        } else {
          totalFiles++
          totalSize += parseInt(file.size || '0')
        }
      }
    } while (pageToken)
  }
  
  // Start recursive scan
  await scanFolder(folderId)
  
  return {
    totalFiles,
    totalFolders,
    totalItems: totalFiles + totalFolders,  // Total items like Python script
    totalSize,
    totalSizeGB: Math.ceil(totalSize / (1024 * 1024 * 1024)),
    isEstimate: false // Now it's accurate, not an estimate
  }
}

// Count items and calculate size - Full recursive version (can be slow)
export async function getFolderStats(userId: string, folderId: string, maxDepth = 3) {
  const drive = await getDriveClient(userId)
  
  let totalFiles = 0
  let totalSize = 0
  let foldersProcessed = 0
  const maxFolders = 100 // Limit to prevent timeout
  
  const processFolder = async (id: string, depth = 0) => {
    if (depth > maxDepth || foldersProcessed > maxFolders) {
      return // Stop if too deep or too many folders
    }
    
    foldersProcessed++
    let pageToken: string | undefined
    
    do {
      const response = await drive.files.list({
        q: `'${id}' in parents and trashed=false`,
        fields: 'nextPageToken,files(id,mimeType,size)',
        pageSize: 1000,
        pageToken,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      })
      
      pageToken = response.data.nextPageToken ?? undefined
      
      for (const file of response.data.files || []) {
        if (file.mimeType === 'application/vnd.google-apps.folder') {
          // Recursively process subfolders (with depth limit)
          await processFolder(file.id!, depth + 1)
        } else {
          totalFiles++
          totalSize += parseInt(file.size || '0')
        }
      }
    } while (pageToken)
  }
  
  await processFolder(folderId)
  
  return {
    totalFiles,
    totalSize,
    totalSizeGB: Math.ceil(totalSize / (1024 * 1024 * 1024)),
    foldersProcessed,
    isComplete: foldersProcessed <= maxFolders
  }
}

// Create a folder
export async function createFolder(userId: string, name: string, parentId?: string) {
  const drive = await getDriveClient(userId)
  
  const response = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      ...(parentId && { parents: [parentId] })
    },
    fields: 'id,name',
    supportsAllDrives: true
  })
  
  return response.data
}

// Copy a file
export async function copyFile(userId: string, fileId: string, newName: string, parentId: string) {
  const drive = await getDriveClient(userId)
  
  const response = await drive.files.copy({
    fileId,
    requestBody: {
      name: newName,
      parents: [parentId]
    },
    fields: 'id,name',
    supportsAllDrives: true
  })
  
  return response.data
}

// Copy entire folder (creates the folder and copies contents)
export async function copyFolder(
  drive: drive_v3.Drive,
  sourceFolderId: string,
  sourceFolderName: string,
  destFolderId: string,
  jobId: string,
  progressCallback?: (progress: {
    processedItems: number
    totalItems: number
    currentItem?: string
    totalBytes: number
    processedBytes: number
  }) => Promise<void>
) {
  // First, create the folder in the destination
  const newFolder = await drive.files.create({
    requestBody: {
      name: sourceFolderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [destFolderId]
    },
    fields: 'id',
    supportsAllDrives: true
  })
  
  if (!newFolder.data.id) {
    throw new Error('Failed to create destination folder')
  }
  
  // Now copy the contents into the new folder
  return copyFolderContents(
    drive,
    sourceFolderId,
    newFolder.data.id,
    jobId,
    progressCallback
  )
}

// Copy folder contents recursively (helper function)
export async function copyFolderContents(
  drive: drive_v3.Drive,
  sourceFolderId: string,
  destFolderId: string,
  jobId: string,
  progressCallback?: (progress: {
    processedItems: number
    totalItems: number
    currentItem?: string
    totalBytes: number
    processedBytes: number
  }) => Promise<void>
) {
  let processedItems = 0
  let totalItems = 0
  let totalBytes = 0
  let processedBytes = 0
  
  // First, count all items and calculate total size
  async function countItems(folderId: string): Promise<{ count: number; size: number }> {
    let count = 0
    let size = 0
    let pageToken: string | undefined
    
    do {
      const response = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields: 'nextPageToken, files(id, name, mimeType, size)',
        pageSize: 1000,
        pageToken,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      })
      
      if (response.data.files) {
        for (const file of response.data.files) {
          count++
          size += parseInt(file.size || '0', 10)
          
          // If it's a folder, count its contents recursively
          if (file.mimeType === 'application/vnd.google-apps.folder') {
            const subCount = await countItems(file.id!)
            count += subCount.count
            size += subCount.size
          }
        }
      }
      
      pageToken = response.data.nextPageToken || undefined
    } while (pageToken)
    
    return { count, size }
  }
  
  // Count total items
  const { count, size } = await countItems(sourceFolderId)
  totalItems = count
  totalBytes = size
  
  // Copy items recursively
  async function copyItems(sourceFolderId: string, destFolderId: string, path: string = '') {
    let pageToken: string | undefined
    
    do {
      const response = await drive.files.list({
        q: `'${sourceFolderId}' in parents and trashed = false`,
        fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime)',
        pageSize: 100,
        pageToken,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      })
      
      if (response.data.files) {
        for (const file of response.data.files) {
          const fullPath = path ? `${path}/${file.name}` : file.name
          
          if (file.mimeType === 'application/vnd.google-apps.folder') {
            // Create folder in destination
            const newFolder = await drive.files.create({
              requestBody: {
                name: file.name,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [destFolderId]
              },
              fields: 'id',
              supportsAllDrives: true
            })
            
            processedItems++
            
            // Report progress
            if (progressCallback) {
              await progressCallback({
                processedItems,
                totalItems,
                currentItem: fullPath,
                totalBytes,
                processedBytes
              })
            }
            
            // Copy folder contents recursively
            await copyItems(file.id!, newFolder.data.id!, fullPath)
          } else {
            // Copy file
            try {
              // Add a small delay to avoid rate limiting
              await new Promise(resolve => setTimeout(resolve, 100)) // 100ms delay between files
              
              await drive.files.copy({
                fileId: file.id!,
                requestBody: {
                  name: file.name,
                  parents: [destFolderId],
                  modifiedTime: file.modifiedTime
                },
                fields: 'id',
                supportsAllDrives: true
              })
              
              processedItems++
              processedBytes += parseInt(file.size || '0', 10)
              
              // Report progress
              if (progressCallback) {
                await progressCallback({
                  processedItems,
                  totalItems,
                  currentItem: fullPath,
                  totalBytes,
                  processedBytes
                })
              }
            } catch (error) {
              console.error(`Failed to copy file ${file.name}:`, error)
              // Continue with other files even if one fails
            }
          }
        }
      }
      
      pageToken = response.data.nextPageToken || undefined
    } while (pageToken)
  }
  
  // Start copying
  await copyItems(sourceFolderId, destFolderId)
  
  return {
    processedItems,
    totalItems,
    totalBytes,
    processedBytes
  }
}