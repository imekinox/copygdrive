import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface TreeItem {
  id: string
  name: string
  type: 'file' | 'folder'
  mimeType?: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'queued' | 'copying'
  size?: string
  error?: string
  children?: TreeItem[]
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
    const jobId = params.id

    // Get the job to verify ownership
    const job = await prisma.copyJob.findUnique({
      where: { id: jobId },
      select: { userId: true }
    })

    if (!job || job.userId !== session.user.id) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Get all items for this job - use DISTINCT to avoid duplicates
    const items = await prisma.copyItem.findMany({
      where: { jobId },
      orderBy: { sourcePath: 'asc' }
    })

    // Remove duplicates based on sourceId (keep the latest one)
    const uniqueItems = items.reduce((acc, item) => {
      const existing = acc.find(i => i.sourceId === item.sourceId)
      if (!existing || item.updatedAt > existing.updatedAt) {
        return [...acc.filter(i => i.sourceId !== item.sourceId), item]
      }
      return acc
    }, [] as typeof items)

    // Build tree structure
    const tree = buildTree(uniqueItems)

    return NextResponse.json({ tree })
  } catch (error) {
    console.error('Error fetching job tree:', error)
    return NextResponse.json(
      { error: "Failed to fetch job tree" },
      { status: 500 }
    )
  }
}

function buildTree(items: any[]): TreeItem[] {
  const root: TreeItem[] = []
  const lookup: Record<string, TreeItem> = {}
  
  // First pass: create all items
  items.forEach(item => {
    const parts = item.sourcePath.split('/')
    const name = parts[parts.length - 1]
    
    const treeItem: TreeItem = {
      id: item.sourceId,
      name: name || item.sourceName,
      type: item.mimeType === 'application/vnd.google-apps.folder' ? 'folder' : 'file',
      mimeType: item.mimeType,
      status: item.status === 'pending' ? 'queued' : item.status,
      size: item.type === 'file' ? item.size : undefined,
      error: item.error || undefined,
      children: item.mimeType === 'application/vnd.google-apps.folder' ? [] : undefined
    }
    
    lookup[item.sourceId] = treeItem
  })
  
  // Second pass: build hierarchy
  items.forEach(item => {
    const parts = item.sourcePath.split('/')
    
    if (parts.length === 1) {
      // Root level item
      root.push(lookup[item.sourceId])
    } else {
      // Find parent and add as child
      // Try to find parent by path matching
      const parentPath = parts.slice(0, -1).join('/')
      const parent = items.find(i => i.sourcePath === parentPath && i.mimeType === 'application/vnd.google-apps.folder')
      
      if (parent && lookup[parent.sourceId]) {
        if (!lookup[parent.sourceId].children) {
          lookup[parent.sourceId].children = []
        }
        lookup[parent.sourceId].children!.push(lookup[item.sourceId])
      } else {
        // If no parent found, add to root
        root.push(lookup[item.sourceId])
      }
    }
  })
  
  // Sort items: folders first, then files, alphabetically
  const sortItems = (items: TreeItem[]) => {
    items.sort((a, b) => {
      if (a.type === 'folder' && b.type === 'file') return -1
      if (a.type === 'file' && b.type === 'folder') return 1
      return a.name.localeCompare(b.name)
    })
    
    items.forEach(item => {
      if (item.children) {
        sortItems(item.children)
      }
    })
  }
  
  sortItems(root)
  
  return root
}