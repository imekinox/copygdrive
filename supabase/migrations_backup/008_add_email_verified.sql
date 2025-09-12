-- Add missing email_verified column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS email_verified timestamptz;