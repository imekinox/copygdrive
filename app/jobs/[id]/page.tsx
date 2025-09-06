import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import JobDetailsClient from "./JobDetailsClient"

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/login")
  }
  
  const resolvedParams = await params
  const job = await prisma.copyJob.findFirst({
    where: {
      id: resolvedParams.id,
      userId: session.user.id
    },
    select: {
      id: true,
      sourceFolderName: true,
      destFolderName: true,
      destFolderId: true,
      status: true,
      totalItems: true,
      completedItems: true,
      failedItems: true,
      copiedBytes: true,
      totalBytes: true,
      creditsUsed: true,
      errorMessage: true,
      createdAt: true,
      completedAt: true,
      updatedAt: true
    }
  })
  
  if (!job) {
    notFound()
  }
  
  // Check if job is stalled (no updates in last 5 minutes for copying status)
  const isStalled = job.status === 'copying' && 
    new Date(job.updatedAt).getTime() < Date.now() - (5 * 60 * 1000)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Copy Job Details</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobDetailsClient 
          initialJob={{
            ...job,
            createdAt: job.createdAt.toISOString(),
            completedAt: job.completedAt?.toISOString() || null,
            isStalled
          }} 
        />
      </main>
    </div>
  )
}