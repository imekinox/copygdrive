'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Clock, AlertCircle, ExternalLink, FolderOpen } from 'lucide-react'
import { formatBytes } from '@/lib/format-utils'
import JobProgressClient from './JobProgressClient'
import DeleteJobButton from './DeleteJobButton'
import StartJobButton from './StartJobButton'

interface Job {
  id: string
  sourceFolderName: string
  destFolderName: string
  destFolderId: string | null
  status: string
  totalItems: number | null
  completedItems: number
  failedItems: number
  copiedBytes: string
  totalBytes: string | null
  creditsUsed: number
  errorMessage: string | null
  createdAt: string
  completedAt: string | null
  isStalled?: boolean
}

interface JobDetailsClientProps {
  initialJob: Job
}

export default function JobDetailsClient({ initialJob }: JobDetailsClientProps) {
  const [job, setJob] = useState(initialJob)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Only poll if job is active
    if (job.status === 'queued' || job.status === 'scanning' || job.status === 'copying') {
      const fetchJobStatus = async () => {
        try {
          const response = await fetch(`/api/jobs/${job.id}/status`)
          if (response.ok) {
            const data = await response.json()
            setJob(prev => ({ ...prev, ...data }))
          }
        } catch (error) {
          console.error('Failed to fetch job status:', error)
        }
      }

      // Initial fetch
      fetchJobStatus()

      // Set up polling interval - same as file tree (3 seconds)
      const interval = setInterval(fetchJobStatus, 3000)
      return () => clearInterval(interval)
    }
  }, [job.id, job.status])

  const progress = job.totalItems ? (job.completedItems / job.totalItems) * 100 : 0
  const bytesProgress = job.totalBytes ? 
    (parseInt(job.copiedBytes) / parseInt(job.totalBytes)) * 100 : 0

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'copying':
      case 'scanning':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'copying':
      case 'scanning':
        return 'bg-blue-100 text-blue-800'
      case 'queued':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDuration = () => {
    const start = new Date(job.createdAt).getTime()
    const end = job.completedAt ? new Date(job.completedAt).getTime() : Date.now()
    return Math.round((end - start) / 60000) // minutes
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(job.status)}
                {job.sourceFolderName} → {job.destFolderName}
              </CardTitle>
              <CardDescription>
                Started {new Date(job.createdAt).toLocaleString()}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(job.status)}>
                {job.status}
              </Badge>
              {job.status === 'completed' && job.destFolderId && (
                <Link 
                  href={`https://drive.google.com/drive/folders/${job.destFolderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">
                    <FolderOpen className="w-4 h-4 mr-1" />
                    View in Drive
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              )}
              <StartJobButton jobId={job.id} jobStatus={job.status} isStalled={job.isStalled} />
              <DeleteJobButton jobId={job.id} jobStatus={job.status} createdAt={new Date(job.createdAt)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Files Progress</span>
                <span>{job.completedItems} / {job.totalItems || '?'} files</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Data Transferred</span>
                <span>
                  {formatBytes(job.copiedBytes)}{job.totalBytes && job.totalBytes !== '0' ? ` / ${formatBytes(job.totalBytes)}` : ''}
                </span>
              </div>
              {job.totalBytes && job.totalBytes !== '0' && (
                <Progress value={bytesProgress} className="h-2" />
              )}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{job.completedItems}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{job.failedItems}</p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{job.creditsUsed}</p>
              <p className="text-sm text-muted-foreground">Credits Used</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{getDuration()} min</p>
              <p className="text-sm text-muted-foreground">Duration</p>
            </div>
          </div>

          {job.errorMessage && (
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Error:</strong> {job.errorMessage}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File progress - this already auto-refreshes */}
      <JobProgressClient jobId={job.id} initialStatus={job.status} />
    </>
  )
}