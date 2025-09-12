'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FolderPicker from '@/components/FolderPicker'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Copy, Calculator, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Folder {
  id: string
  name: string
  mimeType: string
}

interface FolderStats {
  totalFiles: number
  totalFolders: number
  totalItems: number
  totalSize: number
  totalSizeGB: number
  toSkip?: number
  toCreate?: number
  toUpdate?: number
  sizeToTransfer?: number
  sizeToTransferGB?: number
  hasOnlyGoogleFiles?: boolean
}

export default function NewJobPage() {
  const router = useRouter()
  const [sourceFolder, setSourceFolder] = useState<Folder | null>(null)
  const [destFolder, setDestFolder] = useState<Folder | null>(null)
  const [estimating, setEstimating] = useState(false)
  const [creating, setCreating] = useState(false)
  const [stats, setStats] = useState<FolderStats | null>(null)
  const [estimatedJobId, setEstimatedJobId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [scanComplete, setScanComplete] = useState(false)
  const [realtimeStats, setRealtimeStats] = useState<{
    discoveredItems: number
    discoveredFolders: number
    discoveredBytes: number
    lastPath?: string
  } | null>(null)
  
  const handleSourceFolderSelect = (folder: Folder | null) => {
    setSourceFolder(folder)
    // Reset stats and job ID when source folder changes or is cleared
    if (!folder || folder.id !== sourceFolder?.id) {
      setStats(null)
      setEstimatedJobId(null)
    }
  }
  
  const handleDestFolderSelect = (folder: Folder | null) => {
    setDestFolder(folder)
    // Reset stats and job ID when destination folder changes or is cleared
    if (!folder || folder.id !== destFolder?.id) {
      setStats(null)
      setEstimatedJobId(null)
    }
  }

  // Subscribe to real-time updates when estimating
  useEffect(() => {
    if (!estimatedJobId || scanComplete) return
    
    const channel = supabase
      .channel(`job-estimation-${estimatedJobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'copy_jobs',
          filter: `id=eq.${estimatedJobId}`
        },
        (payload: any) => {
          const job = payload.new
          
          // Update real-time stats
          setRealtimeStats({
            discoveredItems: job.discovered_items || 0,
            discoveredFolders: job.discovered_folders || 0,
            discoveredBytes: job.discovered_bytes || 0,
            lastPath: job.last_scan_path
          })
          
          // Check if scan is complete
          if (job.scan_completed_at) {
            setScanComplete(true)
            setEstimating(false)
            
            // Set final stats
            const totalItems = (job.discovered_items || 0) + (job.discovered_folders || 0)
            const skippedItems = job.skipped_items || 0
            const itemsToCreate = totalItems - skippedItems
            
            setStats({
              totalFiles: job.discovered_items || 0,
              totalFolders: job.discovered_folders || 0,
              totalItems: totalItems,
              totalSize: job.discovered_bytes || 0,
              totalSizeGB: (job.discovered_bytes || 0) / (1024 * 1024 * 1024),
              sizeToTransfer: job.discovered_bytes || 0,
              sizeToTransferGB: (job.discovered_bytes || 0) / (1024 * 1024 * 1024),
              toCreate: itemsToCreate,
              toSkip: skippedItems
            })
          }
        }
      )
      .subscribe()
    
    return () => {
      channel.unsubscribe()
    }
  }, [estimatedJobId, scanComplete])
  
  const estimateJob = async () => {
    if (!sourceFolder || !destFolder) return
    
    setEstimating(true)
    setScanComplete(false)
    setRealtimeStats(null)
    setStats(null)
    setError(null)
    
    try {
      // Use async estimate endpoint which returns immediately
      const response = await fetch('/api/jobs/estimate-async', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sourceFolderId: sourceFolder.id,
          sourceFolderName: sourceFolder.name,
          destFolderId: destFolder.id,
          destFolderName: destFolder.name
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to start estimation')
      }
      
      const data = await response.json()
      setEstimatedJobId(data.jobId) // Store the job ID for tracking and activation
      
      // Estimation continues in background, real-time updates will show progress
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to estimate')
      setEstimating(false)
    }
  }

  const createJob = async () => {
    if (!sourceFolder || !destFolder) return
    
    setCreating(true)
    setError(null)
    
    try {
      let jobIdToActivate = estimatedJobId
      
      // If no estimation was done, run it first
      if (!jobIdToActivate) {
        const response = await fetch('/api/jobs/estimate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sourceFolderId: sourceFolder.id,
            sourceFolderName: sourceFolder.name,
            destFolderId: destFolder.id,
            destFolderName: destFolder.name
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to estimate job')
        }
        
        const data = await response.json()
        jobIdToActivate = data.jobId
      }
      
      // Activate the pre-scanned job
      const response = await fetch('/api/jobs/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobId: jobIdToActivate
        })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to activate job')
      }
      
      const { jobId } = await response.json()
      // Redirect immediately - items are already cached from estimation
      router.push(`/jobs/${jobId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job')
      setCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Create New Copy Job</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FolderPicker
            mode="source"
            onSelect={handleSourceFolderSelect}
            selectedFolder={sourceFolder}
          />
          
          <FolderPicker
            mode="destination"
            onSelect={handleDestFolderSelect}
            selectedFolder={destFolder}
          />
        </div>

        {sourceFolder && destFolder && (
          <Card>
            <CardHeader>
              <CardTitle>Job Summary</CardTitle>
              <CardDescription>
                Review your copy job before starting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Source</p>
                  <p className="font-medium">{sourceFolder.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Destination</p>
                  <p className="font-medium">{destFolder.name}</p>
                </div>
              </div>

              {/* Show real-time progress during estimation */}
              {estimating && realtimeStats && (
                <div className="p-4 bg-yellow-50 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Scanning folders...</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {(realtimeStats.discoveredItems || 0) + (realtimeStats.discoveredFolders || 0)}
                      </p>
                      <p className="text-sm text-yellow-800">Items Found</p>
                      <p className="text-xs text-yellow-600 mt-1">
                        {realtimeStats.discoveredItems || 0} files, {realtimeStats.discoveredFolders || 0} folders
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {realtimeStats.discoveredBytes ? 
                          (realtimeStats.discoveredBytes < 1024 * 1024 * 1024 ?
                            `${Math.round(realtimeStats.discoveredBytes / (1024 * 1024))} MB` :
                            `${(realtimeStats.discoveredBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
                          ) : '0 MB'
                        }
                      </p>
                      <p className="text-sm text-yellow-800">Size Discovered</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {Math.ceil(((realtimeStats.discoveredItems || 0) + (realtimeStats.discoveredFolders || 0)) / 100)}
                      </p>
                      <p className="text-sm text-yellow-800">Credits Required</p>
                      <p className="text-xs text-yellow-600 mt-1">
                        (1 per 100 items)
                      </p>
                    </div>
                  </div>
                  {realtimeStats.lastPath && (
                    <p className="text-xs text-yellow-600 truncate">
                      Scanning: {realtimeStats.lastPath}
                    </p>
                  )}
                </div>
              )}
              
              {/* Show final stats after estimation */}
              {stats && (
                <div className="p-4 bg-blue-50 rounded-lg space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.totalItems || (stats.totalFiles + (stats.totalFolders || 0))}
                      </p>
                      <p className="text-sm text-blue-800">Total Items</p>
                      <p className="text-xs text-blue-600 mt-1">
                        {stats.totalFiles} files, {stats.totalFolders || 0} folders
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {(stats.toCreate || 0) + (stats.toUpdate || 0)}
                      </p>
                      <p className="text-sm text-blue-800">Files to Process</p>
                      {stats.sizeToTransferGB !== undefined && stats.sizeToTransferGB > 0 && !stats.hasOnlyGoogleFiles && (
                        <p className="text-xs text-blue-600 mt-1">
                          {stats.sizeToTransferGB < 1 ? 
                            `${Math.round(stats.sizeToTransferGB * 1024)} MB` : 
                            `${stats.sizeToTransferGB.toFixed(2)} GB`}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.max(1, Math.ceil((stats.totalItems || 0) / 100))}
                      </p>
                      <p className="text-sm text-blue-800">Credits Required</p>
                      <p className="text-xs text-blue-600 mt-1">
                        (1 per 100 items)
                      </p>
                    </div>
                  </div>
                  
                  {stats.toSkip !== undefined && (
                    <div className="border-t pt-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">New files:</span>
                          <span className="font-medium text-green-600">{stats.toCreate || 0}</span>
                        </div>
                        {stats.toUpdate !== undefined && stats.toUpdate > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">To update:</span>
                            <span className="font-medium text-yellow-600">{stats.toUpdate}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Up to date:</span>
                          <span className="font-medium text-gray-500">{stats.toSkip || 0}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                {(!stats || !scanComplete) && (
                  <Button
                    onClick={estimateJob}
                    disabled={estimating}
                    variant="outline"
                  >
                    {estimating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4 mr-2" />
                        Estimate Size
                      </>
                    )}
                  </Button>
                )}
                
                <Button
                  onClick={createJob}
                  disabled={creating || estimating || !scanComplete}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {creating ? 'Starting Job...' : 
                   !scanComplete ? 'Complete Scan First' : 
                   'Start Copy Job'}
                </Button>
              </div>

              {!stats && (
                <p className="text-sm text-muted-foreground text-center">
                  Tip: Estimate the folder size to see how many credits will be used
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}