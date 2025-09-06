import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { getRateLimiter } from '@/lib/rate-limiter'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const rateLimiter = getRateLimiter(session.user.id)
    const status = rateLimiter.getStatus()
    
    return NextResponse.json({
      ...status,
      percentOfRequestLimit: ((status.recentRequests / status.maxRequests) * 100).toFixed(1),
      percentOfWriteLimit: ((status.recentWrites / status.maxWrites) * 100).toFixed(1),
      percentOfDailyUpload: ((parseFloat(status.dailyUploadedGB) / status.maxDailyGB) * 100).toFixed(1)
    })
  } catch (error) {
    console.error('Error fetching rate limit status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rate limit status' },
      { status: 500 }
    )
  }
}