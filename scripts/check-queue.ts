#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkQueue() {
  try {
    // Check job_queue table
    const { data: queueJobs, error: queueError } = await supabaseAdmin
      .from('job_queue')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    
    if (queueError) {
      console.error('Error fetching queue:', queueError)
    } else {
      console.log('\n📋 Job Queue Status:')
      console.log('===================')
      if (queueJobs && queueJobs.length > 0) {
        queueJobs.forEach(job => {
          console.log(`\nQueue ID: ${job.id}`)
          console.log(`Status: ${job.status}`)
          console.log(`Worker ID: ${job.worker_id || 'None'}`)
          console.log(`Attempts: ${job.attempt_count}/${job.max_attempts}`)
          console.log(`Created: ${job.created_at}`)
          console.log(`Started: ${job.started_at || 'Not started'}`)
          console.log(`Heartbeat: ${job.heartbeat_at || 'No heartbeat'}`)
          if (job.last_error) {
            console.log(`Last Error: ${job.last_error}`)
          }
        })
      } else {
        console.log('No jobs in queue')
      }
    }
    
    // Check copy_jobs table
    const { data: copyJobs, error: copyError } = await supabaseAdmin
      .from('copy_jobs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    
    if (copyError) {
      console.error('Error fetching copy jobs:', copyError)
    } else {
      console.log('\n\n📂 Copy Jobs:')
      console.log('=============')
      if (copyJobs && copyJobs.length > 0) {
        copyJobs.forEach(job => {
          console.log(`\nJob ID: ${job.id}`)
          console.log(`Status: ${job.status}`)
          console.log(`Source: ${job.source_folder_name}`)
          console.log(`Dest: ${job.dest_folder_name}`)
          console.log(`Created: ${job.created_at}`)
        })
      } else {
        console.log('No copy jobs')
      }
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Error checking queue:', error)
    process.exit(1)
  }
}

checkQueue()