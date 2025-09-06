'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { File, Folder, CheckCircle, XCircle, Clock, TreePine, List } from 'lucide-react'
import { FileTreeView } from '@/components/FileTreeView'

interface CopyItem {
  id: string
  sourceName: string
  sourcePath: string
  mimeType: string
  status: string
  error?: string | null
  updatedAt: string
}

interface JobProgressClientProps {
  jobId: string
  initialStatus: string
}

export default function JobProgressClient({ jobId, initialStatus }: JobProgressClientProps) {
  const [items, setItems] = useState<CopyItem[]>([])
  const [status, setStatus] = useState(initialStatus)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}/progress`)
        if (response.ok) {
          const data = await response.json()
          setItems(data.items)
          setStatus(data.status)
        }
      } catch (error) {
        console.error('Failed to fetch progress:', error)
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchProgress()

    // Set up polling if job is still active
    if (status === 'queued' || status === 'scanning' || status === 'copying') {
      const interval = setInterval(fetchProgress, 3000) // Poll every 3 seconds
      return () => clearInterval(interval)
    }
  }, [jobId, status])

  const getItemIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-4 h-4 text-blue-500" />
    }
    return <File className="w-4 h-4 text-gray-500" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'copying':
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      copying: 'bg-blue-100 text-blue-800',
      pending: 'bg-gray-100 text-gray-800',
      skipped: 'bg-yellow-100 text-yellow-800'
    }
    
    return (
      <Badge className={colors[status as keyof typeof colors] || colors.pending}>
        {status}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">File Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tree" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tree" className="flex items-center gap-2">
              <TreePine className="w-4 h-4" />
              Tree View
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Recent Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tree" className="mt-4">
            <FileTreeView jobId={jobId} className="max-h-[600px]" />
          </TabsContent>
          
          <TabsContent value="activity" className="mt-4">
            {loading && items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading activity...
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No items processed yet
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {getItemIcon(item.mimeType)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {item.sourceName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.sourcePath}
                        </p>
                        {item.error && (
                          <p className="text-xs text-red-600 mt-1">
                            {item.error}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {(status === 'scanning' || status === 'copying') && (
              <div className="mt-4 text-center text-sm text-muted-foreground animate-pulse">
                Refreshing every 3 seconds...
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}