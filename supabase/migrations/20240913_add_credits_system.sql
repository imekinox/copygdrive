-- Add credits column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS credits INTEGER DEFAULT 100;

-- Add comment for clarity
COMMENT ON COLUMN profiles.credits IS 'Number of credits available for the user. Each credit allows processing 100 files.';

-- Update existing profiles to have 100 credits
UPDATE profiles SET credits = 100 WHERE credits IS NULL;

-- Add credits_used column to copy_jobs to track credit consumption
ALTER TABLE copy_jobs ADD COLUMN IF NOT EXISTS credits_used INTEGER DEFAULT 0;

-- Add comment for clarity
COMMENT ON COLUMN copy_jobs.credits_used IS 'Number of credits consumed by this job';

-- Create a function to calculate required credits
CREATE OR REPLACE FUNCTION calculate_required_credits(item_count INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- 1 credit per 100 items (or fraction thereof)
  RETURN CEIL(item_count::FLOAT / 100);
END;
$$ LANGUAGE plpgsql;

-- Create a function to deduct credits from a user
CREATE OR REPLACE FUNCTION deduct_user_credits(user_id UUID, credits_to_deduct INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get current credits
  SELECT credits INTO current_credits
  FROM profiles
  WHERE id = user_id;
  
  -- Check if user has enough credits
  IF current_credits IS NULL OR current_credits < credits_to_deduct THEN
    RETURN FALSE;
  END IF;
  
  -- Deduct credits
  UPDATE profiles
  SET credits = credits - credits_to_deduct
  WHERE id = user_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;