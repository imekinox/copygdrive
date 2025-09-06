'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, CloudOff, HardDrive } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface DriveQuota {
  limit: string
  usage: string
  usageInDrive: string
  usageInDriveTrash: string
  userEmail: string
  remaining: string
  percentUsed: string
}

export default function GoogleDriveQuota() {
  const [quota, setQuota] = useState<DriveQuota | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const fetchQuota = async () => {
    try {
      const response = await fetch('/api/drive/quota')
      const data = await response.json()
      
      if (!response.ok) {
        setError(data)
      } else {
        setQuota(data)
        setError(null)
      }
    } catch (err) {
      setError({ error: 'Failed to fetch quota', details: err instanceof Error ? err.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuota()
    const interval = setInterval(fetchQuota, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Google Drive Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Loading quota information...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    const isRateLimit = error.error === 'Rate limit exceeded'
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Google Drive Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant={isRateLimit ? "destructive" : "default"}>
            <CloudOff className="h-4 w-4" />
            <AlertDescription>
              <div className="font-semibold">{error.error}</div>
              {error.details && (
                <div className="mt-1 text-sm">{error.details}</div>
              )}
              {isRateLimit && (
                <div className="mt-2 text-sm">
                  <div className="font-semibold text-red-600">⚠️ Daily 750 GB upload limit likely exceeded</div>
                  <div>The limit resets 24 hours after you started uploading.</div>
                  {error.retryAfter && (
                    <div>Try again in: {error.retryAfter}</div>
                  )}
                </div>
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!quota) {
    return null
  }

  const isUnlimited = quota.limit === 'Unlimited'
  const percentUsed = parseFloat(quota.percentUsed)
  const isNearLimit = !isUnlimited && percentUsed > 90

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="w-5 h-5" />
          Google Drive Storage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Storage Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Storage Used</span>
            <span className={isNearLimit ? 'text-red-600 font-semibold' : 'text-muted-foreground'}>
              {quota.usage} GB {!isUnlimited && `/ ${quota.limit} GB`}
            </span>
          </div>
          {!isUnlimited && (
            <>
              <Progress 
                value={percentUsed} 
                className={isNearLimit ? 'bg-red-100' : ''}
              />
              <div className="text-xs text-muted-foreground">
                {quota.percentUsed}% used • {quota.remaining} GB remaining
              </div>
            </>
          )}
        </div>

        {/* Breakdown */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Files in Drive:</span>
            <span>{quota.usageInDrive} GB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Files in Trash:</span>
            <span>{quota.usageInDriveTrash} GB</span>
          </div>
        </div>

        {/* Account info */}
        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground">
            Account: {quota.userEmail}
          </div>
        </div>

        {/* Warning if near limit */}
        {isNearLimit && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              ⚠️ Storage nearly full! Only {quota.remaining} GB remaining.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground pt-2 border-t">
          <div className="font-semibold mb-1">Daily Upload Limits:</div>
          <div>• 750 GB upload/copy per 24 hours</div>
          <div>• Resets 24 hours after first upload</div>
          <div>• Applies to all Google Drive operations</div>
        </div>
      </CardContent>
    </Card>
  )
}