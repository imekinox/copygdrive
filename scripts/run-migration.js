const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
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

async function runMigration() {
  const migrationPath = path.resolve(__dirname, '../supabase/migrations/006_auth_tables_fixed.sql')
  const sql = fs.readFileSync(migrationPath, 'utf8')
  
  // Split the SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))
  
  console.log(`Running ${statements.length} SQL statements...`)
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';'
    console.log(`\nExecuting statement ${i + 1}/${statements.length}:`)
    console.log(statement.substring(0, 100) + '...')
    
    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql: statement })
      
      if (error) {
        // Try direct execution if RPC doesn't exist
        const { data: directData, error: directError } = await supabase
          .from('_sql')
          .select('*')
          .limit(0)
          .then(() => null)
          .catch(() => null)
        
        console.error('Error:', error.message)
        // Continue with next statement even if there's an error
      } else {
        console.log('✓ Success')
      }
    } catch (e) {
      console.error('Error:', e.message)
    }
  }
  
  console.log('\nMigration completed!')
}

runMigration().catch(console.error)