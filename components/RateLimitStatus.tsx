'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, Activity } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface RateLimitStatus {
  recentRequests: number
  maxRequests: number
  recentWrites: number
  maxWrites: number
  dailyUploadedGB: string
  maxDailyGB: number
  percentOfRequestLimit: string
  percentOfWriteLimit: string
  percentOfDailyUpload: string
}

export default function RateLimitStatus() {
  const [status, setStatus] = useState<RateLimitStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/rate-limit/status')
      if (!response.ok) throw new Error('Failed to fetch status')
      const data = await response.json()
      setStatus(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rate limit status')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            API Rate Limits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  if (error || !status) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            API Rate Limits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || 'Unable to load rate limit status'}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const isDailyLimitClose = parseFloat(status.percentOfDailyUpload) > 90
  const isRequestLimitClose = parseFloat(status.percentOfRequestLimit) > 80
  const isWriteLimitClose = parseFloat(status.percentOfWriteLimit) > 80

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          API Rate Limits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Daily Upload Limit */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Daily Upload</span>
            <span className={isDailyLimitClose ? 'text-red-600 font-semibold' : 'text-muted-foreground'}>
              {status.dailyUploadedGB} / {status.maxDailyGB} GB
            </span>
          </div>
          <Progress 
            value={parseFloat(status.percentOfDailyUpload)} 
            className={isDailyLimitClose ? 'bg-red-100' : ''}
          />
          <div className="text-xs text-muted-foreground">
            {status.percentOfDailyUpload}% of daily limit used
          </div>
        </div>

        {/* Request Rate */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Requests (100s window)</span>
            <span className={isRequestLimitClose ? 'text-orange-600' : 'text-muted-foreground'}>
              {status.recentRequests} / {status.maxRequests}
            </span>
          </div>
          <Progress 
            value={parseFloat(status.percentOfRequestLimit)} 
            className={isRequestLimitClose ? 'bg-orange-100' : ''}
          />
        </div>

        {/* Write Rate */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Write Operations (per second)</span>
            <span className={isWriteLimitClose ? 'text-orange-600' : 'text-muted-foreground'}>
              {status.recentWrites} / {status.maxWrites}
            </span>
          </div>
          <Progress 
            value={parseFloat(status.percentOfWriteLimit)} 
            className={isWriteLimitClose ? 'bg-orange-100' : ''}
          />
        </div>

        {/* Warning if close to limits */}
        {(isDailyLimitClose || isRequestLimitClose || isWriteLimitClose) && (
          <Alert variant={isDailyLimitClose ? 'destructive' : 'default'}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {isDailyLimitClose && (
                <div>⚠️ Approaching daily upload limit! Only {(status.maxDailyGB - parseFloat(status.dailyUploadedGB)).toFixed(2)} GB remaining.</div>
              )}
              {isRequestLimitClose && (
                <div>⚠️ High request rate detected. Operations may be throttled.</div>
              )}
              {isWriteLimitClose && (
                <div>⚠️ Write operations are being rate limited.</div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground pt-2 border-t">
          <div>• Daily limit resets every 24 hours</div>
          <div>• Request limits reset every 100 seconds</div>
          <div>• Refreshes every 5 seconds</div>
        </div>
      </CardContent>
    </Card>
  )
}