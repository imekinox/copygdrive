import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase admin client
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
    const { data: job, error: jobError } = await supabaseAdmin
      .from('copy_jobs')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .eq('status', 'queued')
      .single()
    
    if (!job || jobError) {
      return NextResponse.json({ error: "Job not found or already processing" }, { status: 404 })
    }
    
    // Update job status to pending and set queued timestamp
    const { error: updateError } = await supabaseAdmin
      .from('copy_jobs')
      .update({
        status: 'pending',
        queued_at: new Date().toISOString()
      })
      .eq('id', params.id)
    
    if (updateError) {
      console.error('Error updating job status:', updateError)
      throw updateError
    }
    
    // The Supabase trigger will automatically add it to job_queue table
    // Workers will pick it up from there
    
    return NextResponse.json({ 
      success: true, 
      message: "Job queued for processing",
      jobId: params.id,
      note: "Job will be processed by the next available worker"
    })
  } catch (error) {
    console.error('Error queuing job:', error)
    return NextResponse.json(
      { error: "Failed to queue job" },
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