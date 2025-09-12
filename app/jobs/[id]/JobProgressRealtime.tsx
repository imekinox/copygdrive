'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { File, Folder, CheckCircle, XCircle, Clock, TreePine, List, Wifi, SkipForward } from 'lucide-react'
import { FileTreeView } from '@/components/FileTreeView'
import { supabase } from '@/lib/supabase'

interface CopyItem {
  id: string
  source_name: string
  source_path: string
  mime_type: string
  status: string
  error?: string | null
  updated_at: string
}

interface CopyJob {
  id: string
  status: string
  total_items: number | null
  completed_items: number
  failed_items: number
  total_bytes: string | null
  copied_bytes: string
}

interface JobProgressRealtimeProps {
  jobId: string
  initialStatus: string
}

export default function JobProgressRealtime({ jobId, initialStatus }: JobProgressRealtimeProps) {
  const [items, setItems] = useState<CopyItem[]>([])
  const [job, setJob] = useState<CopyJob | null>(null)
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      try {
        // Fetch job details
        const { data: jobData, error: jobError } = await supabase
          .from('copy_jobs')
          .select('*')
          .eq('id', jobId)
          .single()

        if (jobError) throw jobError
        setJob(jobData)

        // Fetch items
        const { data: itemsData, error: itemsError } = await supabase
          .from('copy_items')
          .select('*')
          .eq('job_id', jobId)
          .order('created_at', { ascending: false })

        if (itemsError) throw itemsError
        setItems(itemsData || [])
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Set up real-time subscription for job updates
    const jobChannel = supabase
      .channel(`job-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'copy_jobs',
          filter: `id=eq.${jobId}`
        },
        (payload) => {
          console.log('Job updated:', payload)
          setJob(payload.new as CopyJob)
        }
      )
      .subscribe((status) => {
        setConnected(status === 'SUBSCRIBED')
      })

    // Set up real-time subscription for items
    const itemsChannel = supabase
      .channel(`items-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'copy_items',
          filter: `job_id=eq.${jobId}`
        },
        (payload) => {
          console.log('Item changed:', payload)
          
          if (payload.eventType === 'INSERT') {
            setItems(prev => [payload.new as CopyItem, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setItems(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new as CopyItem : item
            ))
          } else if (payload.eventType === 'DELETE') {
            setItems(prev => prev.filter(item => item.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      jobChannel.unsubscribe()
      itemsChannel.unsubscribe()
    }
  }, [jobId])

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; icon: React.ReactNode; label?: string }> = {
      pending: { color: 'bg-gray-500', icon: <Clock className="w-3 h-3" /> },
      copying: { color: 'bg-blue-500', icon: <Clock className="w-3 h-3" /> },
      completed: { color: 'bg-green-500', icon: <CheckCircle className="w-3 h-3" /> },
      failed: { color: 'bg-red-500', icon: <XCircle className="w-3 h-3" /> },
      skipped: { color: 'bg-amber-500', icon: <SkipForward className="w-3 h-3" />, label: 'Already Exists' },
    }
    
    const variant = variants[status] || variants.pending
    
    return (
      <Badge className={`${variant.color} text-white`}>
        <span className="flex items-center gap-1">
          {variant.icon}
          {variant.label || status}
        </span>
      </Badge>
    )
  }

  const getIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-4 h-4 text-blue-500" />
    }
    return <File className="w-4 h-4 text-gray-500" />
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const completedItems = items.filter(item => item.status === 'completed')
  const failedItems = items.filter(item => item.status === 'failed')
  const pendingItems = items.filter(item => item.status === 'pending')
  const skippedItems = items.filter(item => item.status === 'skipped')

  return (
    <div className="space-y-4">
      {/* Items List/Tree */}
      <Card>
        <CardContent className="pt-4">
          <Tabs defaultValue="tree" className="w-full">
            <TabsList>
              <TabsTrigger value="tree">
                <TreePine className="w-4 h-4 mr-2" />
                Tree View
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="w-4 h-4 mr-2" />
                List View
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tree" className="mt-4">
              <FileTreeView jobId={jobId} className="max-h-[70vh]" />
            </TabsContent>
            
            <TabsContent value="list" className="mt-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getIcon(item.mime_type)}
                      <div>
                        <div className="font-medium">{item.source_name}</div>
                        <div className="text-sm text-gray-500">{item.source_path}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(item.status)}
                      {item.error && item.status !== 'skipped' && (
                        <div className="text-sm text-red-600 max-w-xs truncate" title={item.error}>
                          {item.error}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}