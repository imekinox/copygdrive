import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const params = await context.params
    
    // Check if job belongs to user
    const job = await prisma.copyJob.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })
    
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }
    
    // Delete the job and all related items (cascade delete)
    await prisma.copyJob.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    )
  }
}