import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import JobDetailsClient from "./JobDetailsClient"
import JobDetailsRealtime from "./JobDetailsRealtime"
import JobProgressRealtime from "./JobProgressRealtime"
import { ScanningProgress } from "@/components/ScanningProgress"
import { supabaseAdmin } from "@/lib/supabase-client"

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/login")
  }
  
  const resolvedParams = await params
  const jobId = resolvedParams.id
  
  // Fetch job from Supabase using id
  const { data: jobs, error } = await supabaseAdmin
    .from('copy_jobs')
    .select('*')
    .eq('id', jobId)
    .single()
  
  if (error || !jobs) {
    notFound()
  }
  
  const job = {
    id: jobs.id,
    sourceFolderName: jobs.source_folder_name,
    destFolderName: jobs.dest_folder_name,
    destFolderId: jobs.dest_folder_id,
    status: jobs.status,
    totalItems: jobs.total_items || 0,
    completedItems: jobs.completed_items || 0,
    failedItems: 0,
    copiedBytes: jobs.copied_bytes || '0',
    totalBytes: jobs.total_bytes || '0',
    creditsUsed: 0,
    errorMessage: jobs.error_message,
    createdAt: new Date(jobs.created_at),
    completedAt: jobs.completed_at ? new Date(jobs.completed_at) : null,
    updatedAt: new Date(jobs.created_at)
  }
  
  // Check if job is stalled (no updates in last 5 minutes for processing status)
  const isStalled = job.status === 'processing' && 
    new Date(job.updatedAt).getTime() < Date.now() - (5 * 60 * 1000)
  
  return (
    <>
      <nav className="border-b">
        <div className="flex h-12 items-center px-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="h-8">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Copy Job Details</h1>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Always use real-time from Supabase */}
        <div className="space-y-4">
          <JobDetailsRealtime jobId={jobs.id} />
          <JobProgressRealtime jobId={jobs.id} initialStatus={job.status} />
        </div>
      </main>
    </>
  )
}