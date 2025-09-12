const { createClient } = require('@supabase/supabase-js')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') })

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

async function setupAuthTables() {
  console.log('Setting up authentication tables...')
  
  // Check if tables exist by trying to query them
  const tables = ['profiles', 'accounts', 'sessions', 'verification_tokens']
  
  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1)
    
    if (error) {
      console.log(`Table ${table} does not exist or has an error:`, error.message)
    } else {
      console.log(`✓ Table ${table} exists`)
    }
  }
  
  console.log('\nPlease run the migration SQL directly in Supabase SQL Editor:')
  console.log('File: supabase/migrations/006_auth_tables_fixed.sql')
  console.log('\nOr use the Supabase CLI: supabase db push')
}

setupAuthTables().catch(console.error)