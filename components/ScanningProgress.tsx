'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FolderSearch, File, Folder, HardDrive } from 'lucide-react'
import { supabase } from '@/lib/supabase-client'
import { formatBytes } from '@/lib/utils'

interface ScanningProgressProps {
  jobId: string
  status: string
}

export function ScanningProgress({ jobId, status }: ScanningProgressProps) {
  const [scanData, setScanData] = useState({
    discoveredItems: 0,
    discoveredFolders: 0,
    discoveredBytes: 0,
    lastScanPath: '',
    scanCompletedAt: null as string | null,
    completedItems: 0,
    totalItems: 0
  })

  useEffect(() => {
    // Initial fetch
    fetchScanData()

    // Subscribe to real-time updates
    const subscription = supabase
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
          setScanData(prev => ({
            ...prev,
            discoveredItems: payload.new.discovered_items || prev.discoveredItems,
            discoveredFolders: payload.new.discovered_folders || prev.discoveredFolders,
            discoveredBytes: payload.new.discovered_bytes || prev.discoveredBytes,
            lastScanPath: payload.new.last_scan_path || prev.lastScanPath,
            scanCompletedAt: payload.new.scan_completed_at,
            completedItems: payload.new.completed_items || prev.completedItems,
            totalItems: payload.new.total_items || prev.totalItems
          }))
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [jobId])

  const fetchScanData = async () => {
    const { data, error } = await supabase
      .from('copy_jobs')
      .select('discovered_items, discovered_folders, discovered_bytes, last_scan_path, scan_completed_at, completed_items, total_items')
      .eq('id', jobId)
      .single()

    if (data) {
      setScanData({
        discoveredItems: data.discovered_items || 0,
        discoveredFolders: data.discovered_folders || 0,
        discoveredBytes: data.discovered_bytes || 0,
        lastScanPath: data.last_scan_path || '',
        scanCompletedAt: data.scan_completed_at,
        completedItems: data.completed_items || 0,
        totalItems: data.total_items || 0
      })
    }
  }

  const totalDiscovered = scanData.discoveredItems + scanData.discoveredFolders
  const estimatedOperations = totalDiscovered * 2 // Read + Write operations
  const estimatedCost = (estimatedOperations * 0.0001).toFixed(4) // Example pricing

  if (status === 'scanning') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FolderSearch className="h-5 w-5 text-blue-500 animate-pulse" />
              <h3 className="font-semibold">Scanning in Progress...</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-muted-foreground">Files</p>
                  <p className="font-semibold">{scanData.discoveredItems.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-muted-foreground">Folders</p>
                  <p className="font-semibold">{scanData.discoveredFolders.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-semibold">{formatBytes(scanData.discoveredBytes)}</p>
                </div>
              </div>
            </div>

            {scanData.lastScanPath && (
              <div className="text-xs text-muted-foreground truncate">
                Current: {scanData.lastScanPath}
              </div>
            )}

            <div className="pt-2 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Operations</span>
                <span className="font-semibold">{estimatedOperations.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Cost</span>
                <span className="font-semibold">${estimatedCost}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status === 'processing' && scanData.scanCompletedAt) {
    const progress = scanData.totalItems > 0 
      ? (scanData.completedItems / scanData.totalItems) * 100 
      : 0

    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Scan Complete</h3>
              <span className="text-sm text-green-600">✓ {totalDiscovered.toLocaleString()} items discovered</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Copying Progress</span>
                <span>{scanData.completedItems}/{scanData.totalItems}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
              <div>
                <p className="text-muted-foreground">Total Operations</p>
                <p className="font-semibold">{estimatedOperations.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Cost</p>
                <p className="font-semibold">${estimatedCost}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}