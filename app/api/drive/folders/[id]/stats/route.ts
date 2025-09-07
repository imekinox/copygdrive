import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { getFolderStatsQuick, getDriveClient } from "@/lib/google-drive"

async function scanFolder(drive: any, folderId: string, fileMap: Map<string, {size: string, modifiedTime?: string, mimeType?: string}>) {
  let pageToken: string | undefined
  
  do {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'nextPageToken,files(id,name,mimeType,size,modifiedTime)',
      pageSize: 1000,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    })
    
    pageToken = response.data.nextPageToken ?? undefined
    const files = response.data.files || []
    
    for (const file of files) {
      const path = file.name
      
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        // Recursively scan subfolders
        await scanFolder(drive, file.id!, fileMap)
      } else {
        // Add file to map with its path as key
        // Google Docs/Sheets/Slides don't have size - they're not actually transferred
        fileMap.set(path, { 
          size: file.size || '0',
          modifiedTime: file.modifiedTime,
          mimeType: file.mimeType
        })
      }
    }
  } while (pageToken)
}

async function compareWithDestination(
  userId: string,
  sourceId: string, 
  destId: string,
  sourceStats: any
) {
  const drive = await getDriveClient(userId)
  
  // Get source folder name
  const sourceFolder = await drive.files.get({
    fileId: sourceId,
    fields: 'name',
    supportsAllDrives: true
  })
  
  const folderName = sourceFolder.data.name!
  
  // Check if folder exists in destination
  const escapedFolderName = folderName.replace(/'/g, "\\'")
  const destFolders = await drive.files.list({
    q: `'${destId}' in parents and name='${escapedFolderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id,name)',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true
  })
  
  if (!destFolders.data.files || destFolders.data.files.length === 0) {
    // Folder doesn't exist, everything needs to be copied
    return {
      ...sourceStats,
      toCreate: sourceStats.totalFiles,
      toSkip: 0,
      sizeToTransfer: sourceStats.totalSize,
      sizeToTransferGB: sourceStats.totalSizeGB
    }
  }
  
  // Folder exists, scan both and compare
  const destFolderId = destFolders.data.files[0].id!
  
  console.log(`Scanning source folder ${sourceId} and destination folder ${destFolderId}...`)
  
  // Scan both folders
  const sourceFiles = new Map<string, {size: string, modifiedTime?: string, mimeType?: string}>()
  const destFiles = new Map<string, {size: string, modifiedTime?: string, mimeType?: string}>()
  
  await Promise.all([
    scanFolder(drive, sourceId, sourceFiles),
    scanFolder(drive, destFolderId, destFiles)
  ])
  
  // Compare files
  let toCreate = 0
  let toSkip = 0
  let toUpdate = 0
  let sizeToTransfer = 0
  let hasOnlyGoogleFiles = true
  
  for (const [fileName, sourceFile] of sourceFiles) {
    const destFile = destFiles.get(fileName)
    
    // Check if this is a regular file (not Google Workspace)
    const isGoogleFile = sourceFile.mimeType?.startsWith('application/vnd.google-apps.')
    if (!isGoogleFile && sourceFile.size !== '0') {
      hasOnlyGoogleFiles = false
    }
    
    if (!destFile) {
      // File doesn't exist in destination
      toCreate++
      // Only count size for non-Google files
      if (!isGoogleFile) {
        const size = parseInt(sourceFile.size)
        sizeToTransfer += size
      }
    } else {
      // File exists - check if it needs updating
      let needsUpdate = false
      
      // For Google files, only check modified time
      if (isGoogleFile) {
        if (sourceFile.modifiedTime && destFile.modifiedTime) {
          const sourceTime = new Date(sourceFile.modifiedTime).getTime()
          const destTime = new Date(destFile.modifiedTime).getTime()
          if (sourceTime > destTime + 60000) {
            needsUpdate = true
          }
        }
      } else {
        // For regular files, check size and modified time
        if (sourceFile.size !== destFile.size) {
          needsUpdate = true
        }
        
        if (!needsUpdate && sourceFile.modifiedTime && destFile.modifiedTime) {
          const sourceTime = new Date(sourceFile.modifiedTime).getTime()
          const destTime = new Date(destFile.modifiedTime).getTime()
          if (sourceTime > destTime + 60000) {
            needsUpdate = true
          }
        }
      }
      
      if (needsUpdate) {
        toUpdate++
        // Only count size for non-Google files
        if (!isGoogleFile) {
          const size = parseInt(sourceFile.size)
          sizeToTransfer += size
        }
      } else {
        toSkip++
      }
    }
  }
  
  console.log(`Comparison complete: ${toCreate} to create, ${toUpdate} to update, ${toSkip} to skip`)
  
  return {
    ...sourceStats,
    toCreate,
    toUpdate,
    toSkip,
    sizeToTransfer,
    sizeToTransferGB: Number((sizeToTransfer / (1024 * 1024 * 1024)).toFixed(2)),
    hasOnlyGoogleFiles  // Flag to indicate if we only have Google Workspace files
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const params = await context.params
    const { searchParams } = new URL(request.url)
    const destFolderId = searchParams.get('destFolderId')
    
    // Get source folder stats
    const stats = await getFolderStatsQuick(session.user.id, params.id)
    
    // If destination folder provided, compare to see what needs copying
    if (destFolderId) {
      const comparedStats = await compareWithDestination(
        session.user.id,
        params.id,
        destFolderId,
        stats
      )
      return NextResponse.json(comparedStats)
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching folder stats:', error)
    return NextResponse.json(
      { error: "Failed to fetch folder stats" },
      { status: 500 }
    )
  }
}