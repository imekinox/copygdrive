'use client'

import { useState, useEffect } from 'react'
import { 
  ChevronRight, ChevronDown, Folder, FolderOpen, File, 
  CheckCircle, Clock, AlertCircle, Loader2, FileText,
  Image, Video, Music, Archive, Code, Table, Presentation,
  FileSpreadsheet, CircleDot, HelpCircle, FileImage,
  FileVideo, FileAudio, FileCode, FileArchive, ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  mimeType?: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'queued' | 'copying'
  size?: string
  error?: string
  children?: FileItem[]
}

interface FileTreeViewProps {
  jobId: string
  className?: string
}

export function FileTreeView({ jobId, className }: FileTreeViewProps) {
  const [tree, setTree] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Initial fetch
    fetchTree()

    // Set up realtime subscription for copy_items changes
    const channel = supabase
      .channel(`file-tree-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'copy_items',
          filter: `job_id=eq.${jobId}`
        },
        (payload) => {
          console.log('File tree update received:', payload.eventType)
          // Refetch the tree when items change
          fetchTree()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [jobId])

  const fetchTree = async () => {
    try {
      console.log(`Fetching tree for job ${jobId}`)
      const response = await fetch(`/api/jobs/${jobId}/tree`)
      if (response.ok) {
        const text = await response.text()
        if (text) {
          try {
            const data = JSON.parse(text)
            console.log(`Tree data received:`, data.tree?.length || 0, 'items')
            setTree(data.tree || [])
          } catch (parseError) {
            console.error('Failed to parse tree response:', parseError, 'Response:', text)
            setTree([])
          }
        } else {
          console.log('Empty response from tree API')
          setTree([])
        }
        setLoading(false)
      } else {
        console.error('Tree API returned error:', response.status)
      }
    } catch (error) {
      console.error('Failed to fetch file tree:', error)
      setLoading(false)
    }
  }

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      if (next.has(folderId)) {
        next.delete(folderId)
      } else {
        next.add(folderId)
      }
      return next
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'processing':
      case 'copying':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'queued':
        return <CircleDot className="w-4 h-4 text-yellow-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-400" />
      case 'skipped':
        return <CheckCircle className="w-4 h-4 text-gray-400" />
      default:
        return <HelpCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getItemIcon = (item: FileItem, isExpanded: boolean) => {
    if (item.type === 'folder') {
      if (isExpanded) {
        return <FolderOpen className="w-4 h-4 text-blue-500" />
      }
      return <Folder className="w-4 h-4 text-blue-500" />
    }
    
    // Get file icon based on mime type or file extension
    const name = item.name.toLowerCase()
    const mimeType = item.mimeType?.toLowerCase() || ''
    
    // Google Docs types
    if (mimeType.includes('google-apps.document')) {
      return <FileText className="w-4 h-4 text-blue-600" />
    }
    if (mimeType.includes('google-apps.spreadsheet')) {
      return <Table className="w-4 h-4 text-green-600" />
    }
    if (mimeType.includes('google-apps.presentation')) {
      return <Presentation className="w-4 h-4 text-orange-600" />
    }
    
    // Regular file types by mime
    if (mimeType.includes('image/') || name.match(/\.(jpg|jpeg|png|gif|svg|webp|heic|heif)$/)) {
      return <FileImage className="w-4 h-4 text-purple-500" />
    }
    if (mimeType.includes('video/') || name.match(/\.(mp4|avi|mov|wmv|flv|mkv)$/)) {
      return <FileVideo className="w-4 h-4 text-pink-500" />
    }
    if (mimeType.includes('audio/') || name.match(/\.(mp3|wav|flac|aac|ogg)$/)) {
      return <FileAudio className="w-4 h-4 text-cyan-500" />
    }
    if (mimeType.includes('zip') || name.match(/\.(zip|rar|7z|tar|gz)$/)) {
      return <FileArchive className="w-4 h-4 text-yellow-600" />
    }
    if (name.match(/\.(js|ts|py|java|cpp|c|h|css|html|json|xml)$/)) {
      return <FileCode className="w-4 h-4 text-gray-700" />
    }
    if (name.match(/\.(pdf)$/)) {
      return <FileText className="w-4 h-4 text-red-600" />
    }
    if (name.match(/\.(xls|xlsx)$/)) {
      return <FileSpreadsheet className="w-4 h-4 text-green-600" />
    }
    if (name.match(/\.(doc|docx)$/)) {
      return <FileText className="w-4 h-4 text-blue-600" />
    }
    if (name.match(/\.(ppt|pptx)$/)) {
      return <Presentation className="w-4 h-4 text-orange-600" />
    }
    
    return <File className="w-4 h-4 text-gray-500" />
  }

  const formatSize = (bytes: string) => {
    const size = parseInt(bytes)
    if (size === 0) return ''
    const units = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(size) / Math.log(1024))
    return `${(size / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
  }

  const renderItem = (item: FileItem, depth = 0) => {
    const isExpanded = expandedFolders.has(item.id)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id}>
        <div
          className={cn(
            "flex items-center gap-2 py-1.5 px-2 hover:bg-gray-50 rounded text-sm transition-colors",
            item.status === 'processing' && "bg-blue-50 animate-pulse",
            item.status === 'copying' && "bg-blue-50 animate-pulse",
            item.status === 'failed' && "bg-red-50",
            item.status === 'queued' && "bg-yellow-50"
          )}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
        >
          {item.type === 'folder' && (
            <button
              onClick={() => toggleFolder(item.id)}
              className="p-0.5 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          )}
          {item.type === 'file' && (
            <div className="w-4" /> // Spacer for alignment
          )}
          
          {getItemIcon(item, isExpanded)}
          
          <span className={cn(
            "flex-1 truncate",
            item.status === 'completed' && "text-green-700",
            item.status === 'failed' && "text-red-700",
            item.status === 'copying' && "text-blue-700 font-medium",
            item.status === 'processing' && "text-blue-700 font-medium"
          )}>
            {item.name}
          </span>
          
          {item.size && (
            <span className="text-xs text-gray-500">
              {formatSize(item.size)}
            </span>
          )}
          
          {getStatusIcon(item.status)}
          
          {item.error && (
            <span className="text-xs text-red-500 ml-2" title={item.error}>
              Error
            </span>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {item.children!.map(child => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (tree.length === 0) {
    return (
      <div className={cn("text-center p-8 text-gray-500", className)}>
        {loading ? (
          <div className="space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            <p>Loading file tree...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p>Waiting for scan to begin...</p>
            <p className="text-sm">Files will appear here as they are discovered</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("border rounded-lg bg-white overflow-auto", className)}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">File Structure</h3>
          <button
            onClick={() => {
              if (expandedFolders.size > 0) {
                setExpandedFolders(new Set())
              } else {
                // Expand all folders
                const allFolderIds = new Set<string>()
                const collectFolderIds = (items: FileItem[]) => {
                  items.forEach(item => {
                    if (item.type === 'folder') {
                      allFolderIds.add(item.id)
                      if (item.children) {
                        collectFolderIds(item.children)
                      }
                    }
                  })
                }
                collectFolderIds(tree)
                setExpandedFolders(allFolderIds)
              }
            }}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            {expandedFolders.size > 0 ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
        <div className="space-y-0.5">
          {tree.map(item => renderItem(item))}
        </div>
      </div>
    </div>
  )
}