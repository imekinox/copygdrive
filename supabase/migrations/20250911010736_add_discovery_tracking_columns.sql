-- Add columns for tracking scan progress in real-time
ALTER TABLE public.copy_jobs 
ADD COLUMN IF NOT EXISTS discovered_items INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS discovered_folders INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS discovered_bytes BIGINT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_scan_path TEXT,
ADD COLUMN IF NOT EXISTS scan_completed_at TIMESTAMPTZ;

-- Add comments
COMMENT ON COLUMN public.copy_jobs.discovered_items IS 'Number of files discovered during scanning';
COMMENT ON COLUMN public.copy_jobs.discovered_folders IS 'Number of folders discovered during scanning';
COMMENT ON COLUMN public.copy_jobs.discovered_bytes IS 'Total bytes of files discovered during scanning';
COMMENT ON COLUMN public.copy_jobs.last_scan_path IS 'Last path scanned for progress tracking';
COMMENT ON COLUMN public.copy_jobs.scan_completed_at IS 'Timestamp when scanning was completed';