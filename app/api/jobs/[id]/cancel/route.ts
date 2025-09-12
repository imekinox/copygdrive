import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
    
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const params = await context.params
    const jobId = params.id
    
    // Verify job belongs to user
    const { data: job, error: jobError } = await supabaseAdmin
      .from('copy_jobs')
      .select('user_id, status')
      .eq('id', jobId)
      .single()
    
    if (jobError || !job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      )
    }
    
    if (job.user_id !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }
    
    // Only allow cancelling jobs that are not completed or already cancelled
    const cancellableStatuses = ['draft', 'queued', 'scanning', 'processing', 'failed']
    if (!cancellableStatuses.includes(job.status)) {
      return NextResponse.json(
        { error: `Cannot cancel job with status: ${job.status}` },
        { status: 400 }
      )
    }
    
    // Update job status to cancelled
    const { error: updateError } = await supabaseAdmin
      .from('copy_jobs')
      .update({
        status: 'cancelled',
        error_message: 'Cancelled by user',
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId)
    
    if (updateError) {
      throw updateError
    }
    
    console.log(`✅ Job ${jobId} cancelled by user`)
    
    return NextResponse.json({ 
      success: true,
      message: "Job cancelled successfully"
    })
  } catch (error) {
    console.error('Error cancelling job:', error)
    return NextResponse.json(
      { error: "Failed to cancel job" },
      { status: 500 }
    )
  }
}