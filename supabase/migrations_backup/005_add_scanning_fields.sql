-- Add scanning status and discovered counts to copy_jobs
ALTER TABLE copy_jobs 
  ALTER COLUMN status TYPE TEXT,
  ADD CONSTRAINT copy_jobs_status_check_new CHECK (status IN ('queued', 'scanning', 'processing', 'completed', 'failed'));

-- Drop old constraint if exists
ALTER TABLE copy_jobs DROP CONSTRAINT IF EXISTS copy_jobs_status_check;

-- Add discovered counts
ALTER TABLE copy_jobs 
  ADD COLUMN IF NOT EXISTS discovered_items INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS discovered_folders INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS discovered_bytes BIGINT DEFAULT 0;

-- Add scanning progress tracking
ALTER TABLE copy_jobs
  ADD COLUMN IF NOT EXISTS scan_completed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_scan_path TEXT;