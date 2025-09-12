-- Create a test profile for the worker system
-- This profile will be used for jobs queued from the script

INSERT INTO profiles (id, email, name, credits, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'worker@system.local',
  'System Worker',
  1000,
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;