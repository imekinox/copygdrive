-- Test data for real-time demo
-- Run this in Supabase SQL Editor to create test data

-- Create a test user in auth.users first
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'test@example.com',
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create profile (will be created automatically by trigger)

-- Create a test job
INSERT INTO public.copy_jobs (
  user_id,
  source_folder_id,
  source_folder_name,
  dest_folder_id,
  dest_folder_name,
  status,
  total_items,
  completed_items,
  failed_items,
  total_bytes,
  copied_bytes
) VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'source-folder-123',
  'My Important Files',
  'dest-folder-456',
  'Backup Folder',
  'scanning',
  150,
  0,
  0,
  '157286400', -- 150MB
  '0'
) RETURNING id;

-- Save the job ID from above, then you can run updates to see real-time:
-- UPDATE public.copy_jobs 
-- SET completed_items = 50, 
--     copied_bytes = '52428800',
--     status = 'copying'
-- WHERE id = 'YOUR_JOB_ID';

-- To see the job in the UI, visit:
-- http://localhost:3001/jobs/YOUR_JOB_ID