import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the project ID from environment variable
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
    
    if (!projectId) {
      return NextResponse.json({ 
        error: 'Cloud Monitoring not configured',
        details: 'GOOGLE_CLOUD_PROJECT_ID environment variable not set'
      }, { status: 501 })
    }

    // Initialize monitoring client
    const authClient = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/monitoring.read']
    })
    
    const monitoring = google.monitoring({
      version: 'v3',
      auth: authClient
    })

    // Get quota metrics for Drive API
    const endTime = new Date()
    const startTime = new Date(endTime.getTime() - 5 * 60 * 1000) // Last 5 minutes

    const response = await monitoring.projects.timeSeries.list({
      name: `projects/${projectId}`,
      filter: 'metric.type="serviceruntime.googleapis.com/quota/rate/net_usage" AND resource.type="consumer_quota" AND resource.label.service="drive.googleapis.com"',
      interval: {
        endTime: endTime.toISOString(),
        startTime: startTime.toISOString()
      },
      view: 'FULL'
    })

    const quotaMetrics = response.data.timeSeries || []
    
    // Parse the metrics
    const metrics = quotaMetrics.map(series => ({
      quotaLimit: series.metric?.labels?.quota_metric,
      usage: series.points?.[0]?.value?.int64Value || 0,
      limit: series.resource?.labels?.quota_limit || 'unknown',
      timestamp: series.points?.[0]?.interval?.endTime
    }))

    // Also try to get allocation quota (for daily limits)
    const allocationResponse = await monitoring.projects.timeSeries.list({
      name: `projects/${projectId}`,
      filter: 'metric.type="serviceruntime.googleapis.com/quota/allocation/usage" AND resource.type="consumer_quota" AND resource.label.service="drive.googleapis.com"',
      interval: {
        endTime: endTime.toISOString(),
        startTime: new Date(endTime.getTime() - 24 * 60 * 60 * 1000).toISOString() // Last 24 hours
      },
      view: 'FULL'
    })

    const allocationMetrics = allocationResponse.data.timeSeries || []
    
    const dailyMetrics = allocationMetrics.map(series => ({
      quotaLimit: series.metric?.labels?.quota_metric,
      usage: series.points?.[0]?.value?.int64Value || 0,
      limit: series.resource?.labels?.quota_limit || 'unknown',
      timestamp: series.points?.[0]?.interval?.endTime
    }))

    return NextResponse.json({
      rateMetrics: metrics,
      dailyMetrics: dailyMetrics,
      projectId,
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error('Error fetching quota metrics:', error)
    
    // Check if it's an API not enabled error
    if (error?.message?.includes('Cloud Monitoring API has not been used')) {
      return NextResponse.json({
        error: 'Cloud Monitoring API not enabled',
        details: 'Please enable Cloud Monitoring API in Google Cloud Console',
        enableUrl: `https://console.cloud.google.com/apis/library/monitoring.googleapis.com`
      }, { status: 501 })
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch quota metrics',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}