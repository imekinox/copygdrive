import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
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
    
    const body = await request.json()
    const { jobId } = body
    
    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      )
    }
    
    // First check if job exists and belongs to user
    const { data: job, error: jobError } = await supabaseAdmin
      .from('copy_jobs')
      .select('*')
      .eq('id', jobId)
      .eq('user_id', session.user.id)
      .single()
    
    if (jobError || !job) {
      console.error('Job not found or does not belong to user:', jobError)
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      )
    }
    
    // Check if job is in draft status
    if (job.status !== 'draft') {
      console.error(`Job ${jobId} is not in draft status. Current status: ${job.status}`)
      return NextResponse.json(
        { error: `Job is not in draft status (current: ${job.status})` },
        { status: 400 }
      )
    }
    
    // Check user credits (based on number of items)
    const itemsToProcess = (job.discovered_items || 0) + (job.discovered_folders || 0)
    const { data: user } = await supabaseAdmin
      .from('profiles')
      .select('credits')
      .eq('id', session.user.id)
      .single()
    
    const hasEnoughCredits = user && user.credits >= itemsToProcess
    
    if (!hasEnoughCredits && itemsToProcess > 0) {
      console.log(`Warning: User may not have enough credits. Has ${user?.credits}, needs ${itemsToProcess} items`)
    }
    
    // Activate the job by changing status to queued
    const { error: updateError } = await supabaseAdmin
      .from('copy_jobs')
      .update({
        status: 'queued',
        credits_reserved: Math.min(itemsToProcess, user?.credits || 0) // Reserve credits based on items
      })
      .eq('id', jobId)
    
    if (updateError) {
      throw updateError
    }
    
    // Check if job is already in queue
    const { data: existingQueueItem } = await supabaseAdmin
      .from('job_queue')
      .select('id')
      .eq('job_id', jobId)
      .single()
    
    if (!existingQueueItem) {
      // Add job to the processing queue
      const { error: queueError } = await supabaseAdmin
        .from('job_queue')
        .insert({
          id: crypto.randomUUID(),
          job_id: jobId,
          status: 'pending',
          created_at: new Date().toISOString()
        })
      
      if (queueError) {
        console.error('Error adding job to queue:', queueError)
        throw queueError
      }
    } else {
      // Reset existing queue item to pending for reprocessing
      const { error: updateError } = await supabaseAdmin
        .from('job_queue')
        .update({
          status: 'pending',
          worker_id: null,
          started_at: null,
          completed_at: null,
          attempt_count: 0,
          last_error: null
        })
        .eq('job_id', jobId)
      
      if (updateError) {
        console.error('Error updating queue item:', updateError)
        throw updateError
      }
      console.log(`Reset existing queue item for job ${jobId}`)
    }
    
    console.log(`✅ Job ${jobId} activated and queued for processing`)
    
    return NextResponse.json({ 
      success: true,
      jobId 
    })
  } catch (error) {
    console.error('Error activating job:', error)
    return NextResponse.json(
      { error: "Failed to activate job" },
      { status: 500 }
    )
  }
}