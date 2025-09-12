import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function forceResetJobs() {
  console.log('\n🔄 Force resetting failed jobs...\n')
  
  // First get the failed jobs
  const { data: failedJobs, error: fetchError } = await supabase
    .from('job_queue')
    .select('*')
    .eq('status', 'failed')
  
  if (fetchError) {
    console.error('❌ Error fetching failed jobs:', fetchError)
    return
  }
  
  if (!failedJobs || failedJobs.length === 0) {
    console.log('No failed jobs to reset')
    return
  }
  
  console.log(`Found ${failedJobs.length} failed jobs to reset`)
  
  // Delete the failed jobs
  const { error: deleteError } = await supabase
    .from('job_queue')
    .delete()
    .eq('status', 'failed')
  
  if (deleteError) {
    console.error('❌ Error deleting failed jobs:', deleteError)
    return
  }
  
  console.log('✅ Deleted failed jobs')
  
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
  
  console.log(`✅ Re-inserted ${inserted?.length || 0} jobs as pending`)
  
  if (inserted && inserted.length > 0) {
    inserted.forEach(job => {
      console.log(`  - Job ${job.id}: Status = ${job.status}`)
    })
  }
}

forceResetJobs().then(() => process.exit(0))