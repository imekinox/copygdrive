-- First create the auth user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'worker@system.local',
  crypt('system-worker-password', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "System Worker"}',
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Then create the profile
INSERT INTO profiles (id, email, name, credits, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'worker@system.local',
  'System Worker',
  1000,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  credits = EXCLUDED.credits;