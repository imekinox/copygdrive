import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const params = await context.params
    const job = await prisma.copyJob.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      },
      select: {
        id: true,
        status: true,
        totalItems: true,
        completedItems: true,
        failedItems: true,
        copiedBytes: true,
        totalBytes: true,
        creditsUsed: true,
        errorMessage: true,
        sourceFolderName: true,
        destFolderName: true,
        destFolderId: true,
        createdAt: true,
        completedAt: true,
        updatedAt: true
      }
    })
    
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }
    
    // Check if job is actually stalled (no updates in last 5 minutes for copying status)
    const isStalled = job.status === 'copying' && 
      new Date(job.updatedAt).getTime() < Date.now() - (5 * 60 * 1000)
    
    return NextResponse.json({
      ...job,
      isStalled
    })
  } catch (error) {
    console.error('Error fetching job status:', error)
    return NextResponse.json(
      { error: "Failed to fetch job status" },
      { status: 500 }
    )
  }
}