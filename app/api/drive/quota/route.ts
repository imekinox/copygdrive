import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { getDriveClient } from '@/lib/google-drive'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const drive = await getDriveClient(session.user.id)
    
    // Get storage quota and usage from Google Drive API
    const about = await drive.about.get({
      fields: 'storageQuota, user'
    })
    
    const quota = about.data.storageQuota
    
    if (!quota) {
      return NextResponse.json({ error: 'Unable to fetch quota information' }, { status: 500 })
    }
    
    // Convert bytes to GB
    const bytesToGB = (bytes: string) => {
      return (parseInt(bytes) / (1024 * 1024 * 1024)).toFixed(2)
    }
    
    return NextResponse.json({
      limit: quota.limit ? bytesToGB(quota.limit) : 'Unlimited',
      usage: quota.usage ? bytesToGB(quota.usage) : '0',
      usageInDrive: quota.usageInDrive ? bytesToGB(quota.usageInDrive) : '0',
      usageInDriveTrash: quota.usageInDriveTrash ? bytesToGB(quota.usageInDriveTrash) : '0',
      userEmail: about.data.user?.emailAddress,
      // Calculate remaining storage
      remaining: quota.limit && quota.usage 
        ? bytesToGB((parseInt(quota.limit) - parseInt(quota.usage)).toString())
        : 'Unlimited',
      // Percentage used
      percentUsed: quota.limit && quota.usage
        ? ((parseInt(quota.usage) / parseInt(quota.limit)) * 100).toFixed(1)
        : '0'
    })
  } catch (error: any) {
    console.error('Error fetching Drive quota:', error)
    
    // Check if it's a rate limit error
    if (error?.message?.includes('rate limit') || error?.code === 403 || error?.code === 429) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          details: 'You have exceeded Google Drive API rate limits. The daily upload limit is 750 GB and resets every 24 hours.',
          retryAfter: '24 hours'
        },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch quota information' },
      { status: 500 }
    )
  }
}