import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkAccounts() {
  // Check all tables
  console.log('Checking users table...')
  const { data: users, error: usersErr } = await supabase
    .from('users')
    .select('*')
  console.log('Users:', users, 'Error:', usersErr)
  
  console.log('\nChecking accounts table...')
  const { data: accounts, error: accountsErr } = await supabase
    .from('accounts')
    .select('*')
  console.log('Accounts:', accounts, 'Error:', accountsErr)
  
  console.log('\nChecking sessions table...')
  const { data: sessions, error: sessionsErr } = await supabase
    .from('sessions')
    .select('*')
  console.log('Sessions:', sessions, 'Error:', sessionsErr)
  
  // Also check copy_jobs to see if the user is there
  console.log('\nChecking copy_jobs for user_id...')
  const { data: jobs, error: jobsErr } = await supabase
    .from('copy_jobs')
    .select('id, user_id, source_folder_name, status')
    .limit(5)
  console.log('Jobs:', jobs, 'Error:', jobsErr)
  
  // Check job_queue table
  console.log('\nChecking job_queue...')
  const { data: queue, error: queueErr } = await supabase
    .from('job_queue')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  console.log('Queue:', queue, 'Error:', queueErr)
}

checkAccounts()