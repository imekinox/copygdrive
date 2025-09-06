'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface Job {
  id: string
  sourceFolderName: string
  destFolderName: string
  status: string
  totalItems: number | null
  completedItems: number
  createdAt: Date
}

interface JobsListProps {
  jobs: Job[]
}

export default function JobsList({ jobs: initialJobs }: JobsListProps) {
  const router = useRouter()
  const [jobs, setJobs] = useState(initialJobs)
  const [deleting, setDeleting] = useState<string | null>(null)
  
  const handleDelete = async (e: React.MouseEvent, jobId: string) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation()
    
    if (!confirm('Are you sure you want to delete this job?')) {
      return
    }
    
    setDeleting(jobId)
    
    try {
      const response = await fetch(`/api/jobs/${jobId}/delete`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setJobs(jobs.filter(job => job.id !== jobId))
        router.refresh()
      } else {
        alert('Failed to delete job')
      }
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Failed to delete job')
    } finally {
      setDeleting(null)
    }
  }
  
  const getStatusColor = (status: string) => {
    const colors = {
      queued: "bg-gray-100 text-gray-800",
      scanning: "bg-blue-100 text-blue-800",
      copying: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800"
    }
    return colors[status as keyof typeof colors] || colors.queued
  }
  
  const canDelete = (status: string) => {
    return ['completed', 'failed', 'cancelled', 'queued'].includes(status)
  }
  
  if (jobs.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No copy jobs yet.</p>
        <p className="mt-2">
          <Link href="/jobs/new" className="text-primary hover:underline">
            Start your first copy job
          </Link>
        </p>
      </div>
    )
  }
  
  return (
    <div className="divide-y">
      {jobs.map((job) => (
        <div key={job.id} className="relative group">
          <Link
            href={`/jobs/${job.id}`}
            className="block p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{job.sourceFolderName}</p>
                <p className="text-sm text-muted-foreground">
                  → {job.destFolderName}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  {job.totalItems && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {job.completedItems}/{job.totalItems} items
                    </p>
                  )}
                </div>
                {canDelete(job.status) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleDelete(e, job.id)}
                    disabled={deleting === job.id}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}