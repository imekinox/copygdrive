'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Folder, FolderOpen, HardDrive, Users, ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Folder {
  id: string
  name: string
  mimeType: string
  parents?: string[]
  shared?: boolean
  capabilities?: {
    canAddChildren?: boolean
    canCopy?: boolean
  }
}

interface FolderPickerProps {
  mode: 'source' | 'destination'
  onSelect: (folder: Folder | null) => void
  selectedFolder?: Folder | null
}

export default function FolderPicker({ mode, onSelect, selectedFolder }: FolderPickerProps) {
  const [folders, setFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<'root' | 'shared' | 'drives'>('root')
  const [currentPath, setCurrentPath] = useState<Folder[]>([])
  const [currentParentId, setCurrentParentId] = useState<string | null>(null)
  const [isInSharedDrive, setIsInSharedDrive] = useState(false)

  const fetchFolders = async (options?: {
    sharedWithMe?: boolean
    sharedDrives?: boolean
    parentId?: string
  }) => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (options?.sharedWithMe) params.append('sharedWithMe', 'true')
      if (options?.sharedDrives) params.append('sharedDrives', 'true')
      if (options?.parentId) params.append('parentId', options.parentId)
      
      console.log(`Fetching folders: /api/drive/folders?${params}`)
      const response = await fetch(`/api/drive/folders?${params}`)
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 307) {
          // Session expired or not authenticated
          window.location.href = '/login'
          return
        }
        throw new Error('Failed to fetch folders')
      }
      
      const data = await response.json()
      setFolders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(`FolderPicker mounted/view changed: ${view}`)
    if (view === 'root') {
      fetchFolders()
    } else if (view === 'shared') {
      fetchFolders({ sharedWithMe: true })
    } else if (view === 'drives') {
      fetchFolders({ sharedDrives: true })
    }
  }, [view])

  const navigateToFolder = async (folder: Folder) => {
    setCurrentPath([...currentPath, folder])
    setCurrentParentId(folder.id)
    
    // If we're at the root of shared drives view, mark that we're now in a shared drive
    if (view === 'drives' && currentPath.length === 0) {
      setIsInSharedDrive(true)
      await fetchFolders({ parentId: folder.id, sharedDrives: true })
    } else if (view === 'shared') {
      // When navigating within "Shared with me", just use parentId
      await fetchFolders({ parentId: folder.id })
    } else {
      await fetchFolders({ parentId: folder.id, ...(isInSharedDrive && { sharedDrives: true }) })
    }
  }

  const navigateBack = async () => {
    if (currentPath.length === 0) return
    
    const newPath = [...currentPath]
    newPath.pop()
    setCurrentPath(newPath)
    
    if (newPath.length === 0) {
      setCurrentParentId(null)
      if (isInSharedDrive) {
        setIsInSharedDrive(false)
        setView('drives')
      } else {
        // Stay in the current view (root, shared, or drives)
        setView(view)
      }
    } else {
      const parentId = newPath[newPath.length - 1].id
      setCurrentParentId(parentId)
      if (view === 'shared') {
        await fetchFolders({ parentId })
      } else {
        await fetchFolders({ parentId, ...(isInSharedDrive && { sharedDrives: true }) })
      }
    }
  }

  const handleFolderClick = (folder: Folder) => {
    if (mode === 'destination' && !folder.capabilities?.canAddChildren) {
      setError("You don't have permission to add files to this folder")
      return
    }
    
    if (selectedFolder?.id === folder.id) {
      onSelect(folder)
    } else {
      onSelect(folder)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {mode === 'source' ? 'Select Source Folder' : 'Select Destination Folder'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* View selector */}
        {currentPath.length === 0 && (
          <div className="flex gap-2 mb-4">
            <Button
              variant={view === 'root' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('root')}
            >
              <HardDrive className="w-4 h-4 mr-2" />
              My Drive
            </Button>
            <Button
              variant={view === 'shared' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('shared')}
            >
              <Users className="w-4 h-4 mr-2" />
              Shared with me
            </Button>
            <Button
              variant={view === 'drives' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('drives')}
            >
              <HardDrive className="w-4 h-4 mr-2" />
              Shared Drives
            </Button>
          </div>
        )}

        {/* Breadcrumb */}
        {currentPath.length > 0 && (
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={navigateBack}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <button
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              onClick={() => {
                setCurrentPath([])
                setCurrentParentId(null)
                if (isInSharedDrive) {
                  setIsInSharedDrive(false)
                  setView('drives')
                } else {
                  setView(view)
                }
              }}
            >
              {view === 'shared' ? 'Shared with me' : view === 'drives' ? 'Shared Drives' : 'My Drive'}
            </button>
            {currentPath.map((folder, index) => (
              <div key={folder.id} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <button
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={async () => {
                    // Navigate to this folder in the path
                    const newPath = currentPath.slice(0, index + 1)
                    setCurrentPath(newPath)
                    setCurrentParentId(folder.id)
                    
                    // Maintain the context when navigating via breadcrumb
                    if (view === 'shared') {
                      await fetchFolders({ parentId: folder.id })
                    } else {
                      await fetchFolders({ 
                        parentId: folder.id, 
                        ...(isInSharedDrive && { sharedDrives: true }) 
                      })
                    }
                  }}
                >
                  {folder.name}
                </button>
              </div>
            ))}
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Folder list */}
        <div className="border rounded-md max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading folders...
            </div>
          ) : folders.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No folders found
            </div>
          ) : (
            <div className="divide-y">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between ${
                    selectedFolder?.id === folder.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div
                    className="flex items-center gap-3 flex-1"
                    onClick={() => navigateToFolder(folder)}
                  >
                    {selectedFolder?.id === folder.id ? (
                      <FolderOpen className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Folder className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="font-medium">{folder.name}</span>
                    {folder.shared && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        Shared
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant={selectedFolder?.id === folder.id ? 'default' : 'outline'}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFolderClick(folder)
                    }}
                  >
                    Select
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected folder display */}
        {selectedFolder && (
          <div className="mt-4 p-3 bg-green-50 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Selected: {selectedFolder.name}
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  onSelect(null)
                  setCurrentPath([])
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}