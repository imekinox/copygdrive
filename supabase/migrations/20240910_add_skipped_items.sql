-- Add skipped_items column to copy_jobs table
ALTER TABLE copy_jobs ADD COLUMN IF NOT EXISTS skipped_items INTEGER DEFAULT 0;

-- Add comment for clarity
COMMENT ON COLUMN copy_jobs.skipped_items IS 'Number of items that already exist in destination and will be skipped';