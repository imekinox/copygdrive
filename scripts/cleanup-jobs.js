import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

async function cleanupJobs() {
  console.log('🧹 Cleaning up job data...')
  
  try {
    // Delete all copy items first (due to foreign key constraint)
    const { error: itemsError, count: itemsCount } = await supabase
      .from('copy_items')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all (using impossible ID)
    
    if (itemsError) {
      console.error('Error deleting copy_items:', itemsError)
    } else {
      console.log(`✅ Deleted ${itemsCount || 'all'} copy_items`)
    }
    
    // Delete all job queue entries
    const { error: queueError, count: queueCount } = await supabase
      .from('job_queue')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (queueError) {
      console.error('Error deleting job_queue:', queueError)
    } else {
      console.log(`✅ Deleted ${queueCount || 'all'} job_queue entries`)
    }
    
    // Delete all copy jobs
    const { error: jobsError, count: jobsCount } = await supabase
      .from('copy_jobs')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (jobsError) {
      console.error('Error deleting copy_jobs:', jobsError)
    } else {
      console.log(`✅ Deleted ${jobsCount || 'all'} copy_jobs`)
    }
    
    console.log('🎉 Cleanup complete!')
    
  } catch (error) {
    console.error('Cleanup failed:', error)
  }
  
  process.exit(0)
}

cleanupJobs()