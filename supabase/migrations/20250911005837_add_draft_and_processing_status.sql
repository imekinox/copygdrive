-- Add 'draft' and 'processing' status to copy_jobs status enum
-- First, drop the existing constraint
ALTER TABLE public.copy_jobs 
DROP CONSTRAINT IF EXISTS copy_jobs_status_check;

-- Add the new constraint with 'draft' and 'processing' included
ALTER TABLE public.copy_jobs 
ADD CONSTRAINT copy_jobs_status_check 
CHECK (status IN ('draft', 'scanning', 'queued', 'processing', 'completed', 'failed', 'cancelled'));

-- Add comment explaining the statuses
COMMENT ON COLUMN public.copy_jobs.status IS 'Job status: draft (estimation phase), scanning (discovering files), queued (ready to process), processing (copying files), completed, failed, or cancelled';