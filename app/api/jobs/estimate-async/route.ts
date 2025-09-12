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
    const { 
      sourceFolderId, 
      sourceFolderName, 
      destFolderId, 
      destFolderName
    } = body
    
    if (!sourceFolderId || !destFolderId) {
      return NextResponse.json(
        { error: "Source and destination folders are required" },
        { status: 400 }
      )
    }
    
    // Check if an estimation job already exists for these folders
    const { data: existingJob } = await supabaseAdmin
      .from('copy_jobs')
      .select('id, status')
      .eq('user_id', session.user.id)
      .eq('source_folder_id', sourceFolderId)
      .eq('dest_folder_id', destFolderId)
      .eq('status', 'draft')
      .single()
    
    let jobId: string
    
    if (existingJob) {
      // Use existing draft job
      jobId = existingJob.id
      console.log(`Using existing draft job ${jobId}`)
      
      // Clear old items
      await supabaseAdmin
        .from('copy_items')
        .delete()
        .eq('job_id', jobId)
        
      // Reset counts
      await supabaseAdmin
        .from('copy_jobs')
        .update({
          discovered_items: 0,
          discovered_folders: 0,
          discovered_bytes: 0,
          total_items: 0,
          total_bytes: '0',
          scan_completed_at: null
        })
        .eq('id', jobId)
    } else {
      // Create new estimation job
      jobId = crypto.randomUUID()
      const { error: jobError } = await supabaseAdmin
        .from('copy_jobs')
        .insert({
          id: jobId,
          user_id: session.user.id,
          source_folder_id: sourceFolderId,
          source_folder_name: sourceFolderName,
          dest_folder_id: destFolderId,
          dest_folder_name: destFolderName,
          status: 'draft',
          created_at: new Date().toISOString(),
          discovered_items: 0,
          discovered_folders: 0,
          discovered_bytes: 0
        })
      
      if (jobError) throw jobError
      console.log(`Created draft job ${jobId}`)
    }
    
    // Check if job is already in queue
    const { data: existingQueueItem } = await supabaseAdmin
      .from('job_queue')
      .select('id')
      .eq('job_id', jobId)
      .single()
    
    if (!existingQueueItem) {
      // Add to job queue for background scanning
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
      // Reset existing queue item to pending
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
    
    console.log(`✅ Job ${jobId} queued for estimation scanning`)
    
    // Return immediately with job ID so UI can track progress
    return NextResponse.json({
      jobId,
      status: 'scanning',
      message: 'Estimation started in background'
    })
  } catch (error) {
    console.error('Error during estimation:', error)
    return NextResponse.json(
      { error: "Failed to start estimation" },
      { status: 500 }
    )
  }
}