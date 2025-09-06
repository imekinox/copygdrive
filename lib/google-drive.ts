import { drive_v3, google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { prisma } from './prisma'

export async function getDriveClient(userId: string) {
  // Get the user's tokens from database
  const account = await prisma.account.findFirst({
    where: {
      userId: userId,
      provider: 'google'
    }
  })
  
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
  
  let q = "mimeType='application/vnd.google-apps.folder' and trashed=false"
  
  if (options?.sharedWithMe) {
    q += " and sharedWithMe=true"
  } else if (options?.parentId) {
    q += ` and '${options.parentId}' in parents`
  } else if (!options?.sharedDrives) {
    q += " and 'root' in parents"
  }
  
  const response = await drive.files.list({
    q,
    fields: 'files(id,name,mimeType,parents,shared,capabilities)',
    orderBy: 'name',
    pageSize: 100,
    ...(options?.sharedDrives && {
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    })
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