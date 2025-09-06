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
        status: true,
        completedItems: true,
        totalItems: true,
        failedItems: true,
        copiedBytes: true,
        totalBytes: true,
        creditsUsed: true
      }
    })
    
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }
    
    // Get all items but group by sourceId to remove duplicates
    const items = await prisma.copyItem.findMany({
      where: { jobId: params.id },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        sourceId: true,
        sourceName: true,
        sourcePath: true,
        mimeType: true,
        status: true,
        error: true,
        updatedAt: true
      }
    })
    
    // Remove duplicates based on sourceId using a Map for efficiency
    const uniqueMap = new Map<string, typeof items[0]>()
    for (const item of items) {
      if (!uniqueMap.has(item.sourceId)) {
        uniqueMap.set(item.sourceId, item)
      }
    }
    
    // Convert back to array and take first 10
    const uniqueItems = Array.from(uniqueMap.values()).slice(0, 10)
    
    return NextResponse.json({
      ...job,
      items: uniqueItems
    })
  } catch (error) {
    console.error('Error fetching job progress:', error)
    return NextResponse.json(
      { error: "Failed to fetch job progress" },
      { status: 500 }
    )
  }
}