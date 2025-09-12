// Test script to simulate real-time updates in Supabase
// Run this to see real-time updates in action

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://vmjwbcdvcqmufjmonjji.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtandiY2R2Y3FtdWZqbW9uamppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjAyNjIsImV4cCI6MjA3MjgzNjI2Mn0.je7INufQp9M7Ac6LEXJJmYzPnFMGiZkHdgLjL3_v0pE'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testRealtime() {
  console.log('🚀 Testing Supabase real-time updates...\n')

  // First, create a test user profile if it doesn't exist
  // Generate a proper UUID (v4)
  const testUserId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  
  console.log('1. Creating test user profile...')
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: testUserId,
      email: 'test@example.com',
      name: 'Test User',
      credits: 100
    })
  
  if (profileError) {
    console.error('Error creating profile:', profileError)
    return
  }

  // Create a test job
  console.log('2. Creating test copy job...')
  const { data: job, error: jobError } = await supabase
    .from('copy_jobs')
    .insert({
      user_id: testUserId,
      source_folder_id: 'source-123',
      source_folder_name: 'Test Source Folder',
      dest_folder_id: 'dest-456',
      dest_folder_name: 'Test Destination Folder',
      status: 'scanning',
      total_items: 100,
      completed_items: 0,
      failed_items: 0
    })
    .select()
    .single()

  if (jobError) {
    console.error('Error creating job:', jobError)
    return
  }

  console.log('✅ Created job:', job.id)
  console.log('\n📺 Open http://localhost:3001/jobs/' + job.id + ' to see real-time updates\n')

  // Simulate progress updates
  console.log('3. Starting progress simulation...\n')
  
  for (let i = 1; i <= 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds
    
    const completed = i * 10
    const status = i === 10 ? 'completed' : 'copying'
    
    console.log(`📊 Updating progress: ${completed}/100 items (${completed}%)`)
    
    await supabase
      .from('copy_jobs')
      .update({
        status: status,
        completed_items: completed,
        copied_bytes: (completed * 1024 * 1024).toString() // Simulate MB copied
      })
      .eq('id', job.id)

    // Also create some copy items
    if (i % 2 === 0) {
      await supabase
        .from('copy_items')
        .insert({
          job_id: job.id,
          source_id: `file-${i}`,
          source_name: `File ${i}.pdf`,
          source_path: `/folder/File ${i}.pdf`,
          mime_type: 'application/pdf',
          status: 'completed',
          size: '1048576' // 1MB
        })
      console.log(`  ➕ Added File ${i}.pdf`)
    }
  }

  console.log('\n✅ Test completed! Check the browser to see the real-time updates.')
  console.log('Job URL: http://localhost:3001/jobs/' + job.id)
}

testRealtime().catch(console.error)