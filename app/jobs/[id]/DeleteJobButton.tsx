'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteJobButtonProps {
  jobId: string
  jobStatus: string
  createdAt?: Date
}

export default function DeleteJobButton({ jobId, jobStatus, createdAt }: DeleteJobButtonProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  
  const handleDelete = async () => {
    setDeleting(true)
    
    try {
      const response = await fetch(`/api/jobs/${jobId}/delete`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        alert('Failed to delete job')
      }
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Failed to delete job')
    } finally {
      setDeleting(false)
    }
  }
  
  // Check if job is stalled (in scanning/copying for more than 5 minutes)
  const isStalled = ['scanning', 'copying'].includes(jobStatus) && 
    createdAt && 
    (Date.now() - new Date(createdAt).getTime()) > 5 * 60 * 1000
  
  // Allow deletion of completed, failed, queued, or stalled jobs
  const canDelete = ['completed', 'failed', 'queued'].includes(jobStatus) || isStalled
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="sm"
          disabled={!canDelete || deleting}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {isStalled ? 'Delete Stalled Job' : 'Delete Job'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job and all its history.
            This action cannot be undone.
            {isStalled && (
              <p className="mt-2 text-yellow-600">
                This job appears to be stalled (running for more than 5 minutes).
                It's safe to delete it.
              </p>
            )}
            {!canDelete && !isStalled && (
              <p className="mt-2 text-red-600">
                Note: Active jobs cannot be deleted. Wait for completion or failure.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={!canDelete || deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}