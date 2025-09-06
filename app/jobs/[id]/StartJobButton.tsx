'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Play, RefreshCw } from 'lucide-react'

interface StartJobButtonProps {
  jobId: string
  jobStatus: string
  isStalled?: boolean
}

export default function StartJobButton({ jobId, jobStatus, isStalled = false }: StartJobButtonProps) {
  const router = useRouter()
  const [starting, setStarting] = useState(false)
  const [checkingStalled, setCheckingStalled] = useState(false)
  const [jobIsStalled, setJobIsStalled] = useState(isStalled)
  
  useEffect(() => {
    // Check if job is stalled for copying status
    if (jobStatus === 'copying' && !isStalled) {
      const checkStalled = async () => {
        setCheckingStalled(true)
        try {
          const response = await fetch(`/api/jobs/${jobId}/status`)
          if (response.ok) {
            const data = await response.json()
            setJobIsStalled(data.isStalled)
          }
        } catch (error) {
          console.error('Failed to check stalled status:', error)
        } finally {
          setCheckingStalled(false)
        }
      }
      checkStalled()
    }
  }, [jobId, jobStatus, isStalled])
  
  // Show for queued jobs or stalled copying jobs
  if (jobStatus === 'queued') {
    // Show start button for queued jobs
  } else if (jobStatus === 'copying' && !jobIsStalled) {
    // Don't show button if job is actively copying
    return null
  } else if (jobStatus !== 'queued' && jobStatus !== 'copying') {
    // Don't show for completed, failed, etc.
    return null
  }
  
  const handleStart = async () => {
    setStarting(true)
    
    try {
      const endpoint = jobStatus === 'copying' 
        ? `/api/jobs/${jobId}/resume`  // Resume endpoint for stalled jobs
        : `/api/jobs/${jobId}/process` // Process endpoint for new jobs
        
      const response = await fetch(endpoint, {
        method: 'POST'
      })
      
      if (response.ok) {
        router.refresh()
      } else {
        alert(`Failed to ${jobStatus === 'copying' ? 'resume' : 'start'} job processing`)
      }
    } catch (error) {
      console.error(`Error ${jobStatus === 'copying' ? 'resuming' : 'starting'} job:`, error)
      alert(`Failed to ${jobStatus === 'copying' ? 'resume' : 'start'} job processing`)
    } finally {
      setStarting(false)
    }
  }
  
  // Different button appearance for resume vs start
  if (jobStatus === 'copying') {
    return (
      <Button 
        variant="default" 
        size="sm"
        onClick={handleStart}
        disabled={starting}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        {starting ? 'Resuming...' : 'Resume Job'}
      </Button>
    )
  }
  
  return (
    <Button 
      variant="default" 
      size="sm"
      onClick={handleStart}
      disabled={starting}
    >
      <Play className="w-4 h-4 mr-2" />
      {starting ? 'Starting...' : 'Start Processing'}
    </Button>
  )
}