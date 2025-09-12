import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

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
    const { data: job, error: jobError } = await supabaseAdmin
      .from('copy_jobs')
      .select(`
        id,
        status,
        total_items,
        completed_items,
        failed_items,
        copied_bytes,
        total_bytes,
        credits_used,
        error_message,
        source_folder_name,
        dest_folder_name,
        dest_folder_id,
        created_at,
        completed_at,
        updated_at
      `)
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .single()
    
    if (!job || jobError) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }
    
    // Check if job is actually stalled (no updates in last 5 minutes for copying status)
    const isStalled = job.status === 'copying' && 
      new Date(job.updated_at).getTime() < Date.now() - (5 * 60 * 1000)
    
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