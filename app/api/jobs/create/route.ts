import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { CopyProcessor } from "@/lib/copy-processor"

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const body = await request.json()
    const { 
      sourceFolderId, 
      sourceFolderName, 
      destFolderId, 
      destFolderName,
      estimatedSizeGB = 10 // Default to 10GB if no estimate
    } = body
    
    if (!sourceFolderId || !destFolderId) {
      return NextResponse.json(
        { error: "Source and destination folders are required" },
        { status: 400 }
      )
    }
    
    // Check if user has enough credits (using estimate)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true }
    })
    
    // Allow the job to start even with low credits - we'll check again after scanning
    const hasEnoughCredits = user && user.credits >= estimatedSizeGB
    
    if (!hasEnoughCredits && estimatedSizeGB > 0) {
      // Just warn, don't block
      console.log(`Warning: User may not have enough credits. Has ${user?.credits}, needs ~${estimatedSizeGB}`)
    }
    
    // Create the copy job immediately (no scanning)
    const job = await prisma.copyJob.create({
      data: {
        userId: session.user.id,
        sourceFolderId,
        sourceFolderName,
        destFolderId,
        destFolderName,
        status: 'queued',
        creditsReserved: Math.min(estimatedSizeGB, user?.credits || 0)
      }
    })
    
    // Start processing in the background
    const processor = new CopyProcessor(session.user.id, job.id)
    
    // Don't await - let it run completely async
    processor.process().then(() => {
      console.log(`Job ${job.id} completed`)
    }).catch((error) => {
      console.error(`Job ${job.id} failed:`, error)
    })
    
    return NextResponse.json({ jobId: job.id })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    )
  }
}