import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { SyncProcessor } from '@/lib/sync-processor'

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const params = await context.params
    
    // Get the job
    const job = await prisma.copyJob.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }
    
    // Only allow resuming jobs that are in copying status (stalled)
    if (job.status !== 'copying') {
      return NextResponse.json(
        { error: 'Job cannot be resumed - not in copying status' },
        { status: 400 }
      )
    }
    
    // Reset any error state to allow retry
    await prisma.copyJob.update({
      where: { id: params.id },
      data: {
        errorMessage: null,
        status: 'scanning' // Set to scanning to trigger rescan
      }
    })
    
    // Start the sync processor in the background with resume capability
    const processor = new SyncProcessor(session.user.id, params.id)
    processor.execute().catch(console.error)
    
    return NextResponse.json({ 
      success: true,
      message: 'Job resume initiated. The sync processor will scan for existing files and continue copying.'
    })
  } catch (error) {
    console.error('Resume job error:', error)
    return NextResponse.json(
      { error: 'Failed to resume job' },
      { status: 500 }
    )
  }
}