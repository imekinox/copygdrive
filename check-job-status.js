require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
  const { data, error } = await supabase
    .from('copy_jobs')
    .select('*')
    .eq('id', 'fa84b9f3-4a01-4ace-a075-c22b1fad4371')
    .single();
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log('Job Details:');
  console.log('  ID:', data.id);
  console.log('  Status:', data.status);
  console.log('  Total Items:', data.total_items);
  console.log('  Completed Items:', data.completed_items);
  console.log('  Created At:', data.created_at);
  console.log('  Started At:', data.started_at);
  
  process.exit(0);
})();