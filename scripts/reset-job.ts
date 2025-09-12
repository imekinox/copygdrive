import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function resetJob() {
  // Reset the job to pending
  const { error } = await supabase
    .from('job_queue')
    .update({
      status: 'pending',
      worker_id: null,
      attempt_count: 0,
      last_error: null,
      started_at: null,
      next_retry_at: null,
      heartbeat_at: null
    })
    .eq('job_id', '4e8f26e9-eff4-4d30-a7c8-9be4cc9c47e4')
  
  if (error) {
    console.error('Error resetting job:', error)
  } else {
    console.log('Job reset to pending')
  }
}

resetJob()