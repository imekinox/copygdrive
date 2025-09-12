import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function resetFailedJobs() {
  console.log('\n🔄 Resetting failed jobs...\n')
  
  // Use RPC to recover failed jobs (similar to stale job recovery)
  const { data, error } = await supabase
    .rpc('recover_stale_jobs', { p_stale_minutes: 0 })
  
  if (error) {
    console.error('❌ Error with recover_stale_jobs:', error)
    
    // Try direct update if RPC fails
    console.log('Trying direct deletion and re-insertion...')
    
    // First get the failed jobs
    const { data: failedJobs, error: fetchError } = await supabase
      .from('job_queue')
      .select('*')
      .eq('status', 'failed')
    
    if (fetchError || !failedJobs || failedJobs.length === 0) {
      console.log('No failed jobs to reset')
      return
    }
    
    // Delete the failed jobs
    const { error: deleteError } = await supabase
      .from('job_queue')
      .delete()
      .eq('status', 'failed')
    
    if (deleteError) {
      console.error('❌ Error deleting failed jobs:', deleteError)
      return
    }
    
    // Re-insert as pending
    const newJobs = failedJobs.map(job => ({
      job_id: job.job_id,
      status: 'pending',
      attempt_count: 0,
      max_attempts: 3
    }))
    
    const { data: inserted, error: insertError } = await supabase
      .from('job_queue')
      .insert(newJobs)
      .select()
    
    if (insertError) {
      console.error('❌ Error re-inserting jobs:', insertError)
      return
    }
    
    console.log(`✅ Reset ${inserted?.length || 0} failed jobs back to pending`)
    return
  }
  
  console.log(`✅ Recovered ${data || 0} jobs`)
}

resetFailedJobs().then(() => process.exit(0))