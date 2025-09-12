'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  PlayCircle, 
  PauseCircle, 
  XCircle, 
  CheckCircle, 
  AlertCircle,
  Trash2,
  Activity,
  Wifi
} from 'lucide-react'
import { formatBytes } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

interface JobDetailsRealtimeProps {
  jobId: string
}

interface CopyJob {
  id: string
  source_folder_name: string
  dest_folder_name: string
  status: string
  total_items: number | null
  completed_items: number
  failed_items: number
  skipped_items: number | null
  total_bytes: string | null
  copied_bytes: string
  error_message: string | null
  started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export default function JobDetailsRealtime({ jobId }: JobDetailsRealtimeProps) {
  const [job, setJob] = useState<CopyJob | null>(null)
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    // Initial fetch
    const fetchJob = async () => {
      try {
        const { data, error } = await supabase
          .from('copy_jobs')
          .select('*')
          .eq('id', jobId)
          .single()

        if (error) throw error
        setJob(data)
      } catch (error) {
        console.error('Failed to fetch job:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()

    // Set up real-time subscription
    const channel = supabase
      .channel(`job-details-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'copy_jobs',
          filter: `id=eq.${jobId}`
        },
        (payload) => {
          console.log('Job details updated:', payload)
          setJob(payload.new as CopyJob)
        }
      )
      .subscribe((status) => {
        setConnected(status === 'SUBSCRIBED')
      })

    return () => {
      channel.unsubscribe()
    }
  }, [jobId])

  const handleAction = async (action: 'resume' | 'pause' | 'cancel' | 'delete') => {
    setActionLoading(action)
    try {
      const method = action === 'delete' ? 'DELETE' : 'POST'
      const response = await fetch(`/api/jobs/${jobId}/${action}`, {
        method
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Action failed')
      }

      // For delete action, redirect to dashboard
      if (action === 'delete') {
        window.location.href = '/dashboard'
      }
      // The real-time subscription will update the job automatically for other actions
    } catch (error) {
      console.error(`Failed to ${action} job:`, error)
      alert(`Failed to ${action} job: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setActionLoading(null)
    }
  }

  if (loading || !job) {
    return (
      <Card className="w-full">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate progress excluding skipped items
  const actualTotal = job.total_items ? job.total_items - (job.skipped_items || 0) : 0
  const progress = actualTotal > 0
    ? Math.round((job.completed_items / actualTotal) * 100)
    : 0

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      queued: 'bg-gray-500',
      scanning: 'bg-blue-500',
      copying: 'bg-blue-500',
      completed: 'bg-green-500',
      failed: 'bg-red-500',
      cancelled: 'bg-gray-500'
    }
    return colors[status] || 'bg-gray-500'
  }

  const getStatusIcon = (status: string) => {
    const icons: Record<string, React.ReactNode> = {
      queued: <Activity className="w-4 h-4" />,
      scanning: <Activity className="w-4 h-4 animate-pulse" />,
      copying: <Activity className="w-4 h-4 animate-pulse" />,
      completed: <CheckCircle className="w-4 h-4" />,
      failed: <XCircle className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />
    }
    return icons[status] || <Activity className="w-4 h-4" />
  }

  const isActive = ['queued', 'scanning', 'copying'].includes(job.status)

  const getDuration = () => {
    if (!job.started_at) return null
    const start = new Date(job.started_at)
    const end = job.completed_at ? new Date(job.completed_at) : new Date()
    const duration = Math.floor((end.getTime() - start.getTime()) / 1000)
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = duration % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-3">
        <div className="space-y-3">
          {/* Header with real-time indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className={`${getStatusColor(job.status)} text-white`}>
                <span className="flex items-center gap-1">
                  {getStatusIcon(job.status)}
                  {job.status}
                </span>
              </Badge>
            </div>
            
            <div className="flex gap-2">
              {isActive && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction('pause')}
                    disabled={actionLoading !== null}
                  >
                    <PauseCircle className="w-4 h-4 mr-1" />
                    Pause
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction('cancel')}
                    disabled={actionLoading !== null}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </>
              )}
              
              {job.status === 'failed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction('resume')}
                  disabled={actionLoading !== null}
                >
                  <PlayCircle className="w-4 h-4 mr-1" />
                  Resume
                </Button>
              )}
              
              {['completed', 'failed', 'cancelled'].includes(job.status) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction('delete')}
                  disabled={actionLoading !== null}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {job.total_items && job.total_items > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{job.completed_items} of {actualTotal} items</span>
                {job.total_bytes && job.total_bytes !== '0' && (
                  <span>{formatBytes(parseInt(job.copied_bytes))} of {formatBytes(parseInt(job.total_bytes))}</span>
                )}
              </div>
            </div>
          )}

          {/* Job Details - Single Line */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Source:</span>
              <span className="font-medium truncate max-w-[200px]" title={job.source_folder_name}>
                {job.source_folder_name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Destination:</span>
              <span className="font-medium truncate max-w-[200px]" title={job.dest_folder_name}>
                {job.dest_folder_name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Started:</span>
              <span className="font-medium">
                {job.started_at ? new Date(job.started_at).toLocaleString() : 'Not started'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Duration:</span>
              <span className="font-medium">
                {getDuration() || 'Not started'}
              </span>
            </div>
          </div>

          {/* Stats - Single Row */}
          <div className="flex justify-around pt-2 border-t text-sm">
            <div className="text-center">
              <span className="text-gray-500">Remaining: </span>
              <span className="font-bold text-gray-700">
                {actualTotal > 0 ? actualTotal - job.completed_items - job.failed_items : 0}
              </span>
            </div>
            <div className="text-center">
              <span className="text-gray-500">Completed: </span>
              <span className="font-bold text-green-600">{job.completed_items}</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500">Failed: </span>
              <span className="font-bold text-red-600">{job.failed_items}</span>
            </div>
          </div>

          {/* Error Message */}
          {job.error_message && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">{job.error_message}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}