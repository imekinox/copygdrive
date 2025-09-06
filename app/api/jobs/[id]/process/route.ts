import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { SyncProcessor } from "@/lib/sync-processor"

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const params = await context.params
    
    // Verify job belongs to user and is queued
    const job = await prisma.copyJob.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
        status: 'queued'
      }
    })
    
    if (!job) {
      return NextResponse.json({ error: "Job not found or already processing" }, { status: 404 })
    }
    
    // Start processing in background
    // In production, this would be handled by a queue worker
    const processor = new SyncProcessor(session.user.id, params.id)
    
    // Don't await - let it run in background
    processor.execute().catch(console.error)
    
    return NextResponse.json({ success: true, message: "Job processing started" })
  } catch (error) {
    console.error('Error starting job processing:', error)
    return NextResponse.json(
      { error: "Failed to start job processing" },
      { status: 500 }
    )
  }
}

// GET endpoint to manually trigger processing for testing
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  return POST(request, context)
}