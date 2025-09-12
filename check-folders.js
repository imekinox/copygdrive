require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
  // Get the most recent job
  const { data: jobs } = await supabase
    .from('copy_jobs')
    .select('id, source_folder_name')
    .order('created_at', { ascending: false })
    .limit(1);
  
  if (!jobs || jobs.length === 0) {
    console.log('No jobs found');
    return;
  }
  
  const jobId = jobs[0].id;
  console.log(`\nChecking job: ${jobId} (${jobs[0].source_folder_name})\n`);
  
  // Get folders
  const { data: folders } = await supabase
    .from('copy_items')
    .select('source_path, source_name, status, new_id')
    .eq('job_id', jobId)
    .eq('mime_type', 'application/vnd.google-apps.folder')
    .order('source_path');
  
  console.log('FOLDERS:');
  console.log('Status   | Path                                               | new_id');
  console.log('-'.repeat(80));
  folders?.forEach(item => {
    console.log(`${item.status.padEnd(8)} | ${item.source_path.padEnd(50)} | ${item.new_id || 'null'}`);
  });
  
  // Get some files to see their paths
  const { data: files } = await supabase
    .from('copy_items')
    .select('source_path, source_name, status')
    .eq('job_id', jobId)
    .neq('mime_type', 'application/vnd.google-apps.folder')
    .limit(10);
  
  console.log('\nSAMPLE FILES:');
  console.log('Status   | Path');
  console.log('-'.repeat(80));
  files?.forEach(item => {
    console.log(`${item.status.padEnd(8)} | ${item.source_path}`);
  });
  
  process.exit(0);
})();