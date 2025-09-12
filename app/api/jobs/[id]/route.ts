import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

export async function DELETE(
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
    
    // Only allow deleting completed, failed, cancelled, or draft jobs
    const deletableStatuses = ['completed', 'failed', 'cancelled', 'draft']
    if (!deletableStatuses.includes(job.status)) {
      return NextResponse.json(
        { error: `Cannot delete job with status: ${job.status}` },
        { status: 400 }
      )
    }
    
    // Delete related copy_items first (cascade delete)
    const { error: itemsError } = await supabaseAdmin
      .from('copy_items')
      .delete()
      .eq('job_id', jobId)
    
    if (itemsError) {
      console.error('Error deleting copy items:', itemsError)
    }
    
    // Delete the job
    const { error: deleteError } = await supabaseAdmin
      .from('copy_jobs')
      .delete()
      .eq('id', jobId)
    
    if (deleteError) {
      throw deleteError
    }
    
    console.log(`✅ Job ${jobId} deleted by user`)
    
    return NextResponse.json({ 
      success: true,
      message: "Job deleted successfully"
    })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    )
  }
}