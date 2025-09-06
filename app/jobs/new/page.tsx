'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FolderPicker from '@/components/FolderPicker'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Copy, Calculator } from 'lucide-react'

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
}

export default function NewJobPage() {
  const router = useRouter()
  const [sourceFolder, setSourceFolder] = useState<Folder | null>(null)
  const [destFolder, setDestFolder] = useState<Folder | null>(null)
  const [estimating, setEstimating] = useState(false)
  const [creating, setCreating] = useState(false)
  const [stats, setStats] = useState<FolderStats | null>(null)
  const [error, setError] = useState<string | null>(null)

  const estimateJob = async () => {
    if (!sourceFolder) return
    
    setEstimating(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/drive/folders/${sourceFolder.id}/stats`)
      
      if (!response.ok) {
        throw new Error('Failed to estimate folder size')
      }
      
      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to estimate')
    } finally {
      setEstimating(false)
    }
  }

  const createJob = async () => {
    if (!sourceFolder || !destFolder) return
    
    setCreating(true)
    setError(null)
    
    try {
      const response = await fetch('/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sourceFolderId: sourceFolder.id,
          sourceFolderName: sourceFolder.name,
          destFolderId: destFolder.id,
          destFolderName: destFolder.name,
          estimatedSizeGB: stats?.totalSizeGB || 1 // Pass the estimate we already calculated
        })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create job')
      }
      
      const { jobId } = await response.json()
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
            onSelect={setSourceFolder}
            selectedFolder={sourceFolder}
          />
          
          <FolderPicker
            mode="destination"
            onSelect={setDestFolder}
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

              {stats && (
                <div className="p-4 bg-blue-50 rounded-lg">
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
                        {stats.totalSizeGB}
                      </p>
                      <p className="text-sm text-blue-800">GB</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.totalSizeGB}
                      </p>
                      <p className="text-sm text-blue-800">Credits Required</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {!stats && (
                  <Button
                    onClick={estimateJob}
                    disabled={estimating}
                    variant="outline"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    {estimating ? 'Estimating...' : 'Estimate Size'}
                  </Button>
                )}
                
                <Button
                  onClick={createJob}
                  disabled={creating || (!stats && sourceFolder.id !== destFolder.id)}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {creating ? 'Creating Job...' : 'Start Copy Job'}
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