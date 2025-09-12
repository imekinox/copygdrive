-- Add column to store Prisma job ID for reference
ALTER TABLE copy_jobs ADD COLUMN prisma_job_id TEXT;