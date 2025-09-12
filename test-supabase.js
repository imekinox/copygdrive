const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function testInsert() {
  const { data, error } = await supabaseAdmin
    .from('copy_jobs')
    .insert({
      id: crypto.randomUUID(),
      user_id: 'test-user-id',
      source_folder_id: 'test-source',
      source_folder_name: 'Test Source',
      dest_folder_id: 'test-dest',
      dest_folder_name: 'Test Dest',
      status: 'queued',
      credits_reserved: 0,
      created_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success:', data);
  }
}

testInsert();