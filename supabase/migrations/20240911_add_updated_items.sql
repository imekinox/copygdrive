-- Add updated_items column to copy_jobs table
ALTER TABLE copy_jobs ADD COLUMN IF NOT EXISTS updated_items INTEGER DEFAULT 0;

-- Add comment for clarity
COMMENT ON COLUMN copy_jobs.updated_items IS 'Number of items that exist but need updating because source is newer';