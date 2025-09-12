-- Job Queue System for Long-Running Tasks
-- This schema enables resilient, distributed job processing

-- Enum for queue status
CREATE TYPE queue_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'retrying');

-- Job queue table for managing background tasks
CREATE TABLE job_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES copy_jobs(id) ON DELETE CASCADE,
  status queue_status DEFAULT 'pending' NOT NULL,
  worker_id TEXT, -- Identifier of the worker processing this job
  
  -- Retry management
  attempt_count INTEGER DEFAULT 0 NOT NULL,
  max_attempts INTEGER DEFAULT 3 NOT NULL,
  last_error TEXT,
  
  -- Timing
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  next_retry_at TIMESTAMPTZ,
  heartbeat_at TIMESTAMPTZ, -- Last time worker reported it's still working
  
  -- Progress tracking
  current_item_id UUID REFERENCES copy_items(id),
  progress_data JSONB DEFAULT '{}' NOT NULL, -- Flexible storage for progress state
  
  CONSTRAINT valid_status_dates CHECK (
    (status = 'pending' AND started_at IS NULL) OR
    (status IN ('processing', 'retrying') AND started_at IS NOT NULL) OR
    (status IN ('completed', 'failed') AND started_at IS NOT NULL)
  )
);

-- Index for finding jobs to process
CREATE INDEX idx_queue_pending ON job_queue(status, next_retry_at) 
  WHERE status IN ('pending', 'retrying');

-- Index for monitoring active jobs
CREATE INDEX idx_queue_active ON job_queue(worker_id, heartbeat_at) 
  WHERE status = 'processing';

-- Index for job relationship
CREATE INDEX idx_queue_job_id ON job_queue(job_id);

-- Function to claim a job for processing
CREATE OR REPLACE FUNCTION claim_next_job(p_worker_id TEXT)
RETURNS UUID AS $$
DECLARE
  v_queue_id UUID;
BEGIN
  -- Find and lock the next available job
  SELECT id INTO v_queue_id
  FROM job_queue
  WHERE status IN ('pending', 'retrying')
    AND (next_retry_at IS NULL OR next_retry_at <= NOW())
  ORDER BY created_at
  LIMIT 1
  FOR UPDATE SKIP LOCKED;
  
  IF v_queue_id IS NOT NULL THEN
    -- Claim the job
    UPDATE job_queue
    SET 
      status = 'processing',
      worker_id = p_worker_id,
      started_at = COALESCE(started_at, NOW()),
      heartbeat_at = NOW(),
      attempt_count = attempt_count + 1
    WHERE id = v_queue_id;
  END IF;
  
  RETURN v_queue_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update job heartbeat
CREATE OR REPLACE FUNCTION update_job_heartbeat(
  p_queue_id UUID,
  p_worker_id TEXT,
  p_progress_data JSONB DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_updated BOOLEAN;
BEGIN
  UPDATE job_queue
  SET 
    heartbeat_at = NOW(),
    progress_data = COALESCE(p_progress_data, progress_data)
  WHERE id = p_queue_id 
    AND worker_id = p_worker_id 
    AND status = 'processing';
  
  v_updated := FOUND;
  RETURN v_updated;
END;
$$ LANGUAGE plpgsql;

-- Function to mark job as completed
CREATE OR REPLACE FUNCTION complete_job(
  p_queue_id UUID,
  p_worker_id TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_updated BOOLEAN;
BEGIN
  UPDATE job_queue
  SET 
    status = 'completed',
    completed_at = NOW(),
    heartbeat_at = NOW()
  WHERE id = p_queue_id 
    AND worker_id = p_worker_id 
    AND status = 'processing';
  
  v_updated := FOUND;
  RETURN v_updated;
END;
$$ LANGUAGE plpgsql;

-- Function to handle job failure
CREATE OR REPLACE FUNCTION fail_job(
  p_queue_id UUID,
  p_worker_id TEXT,
  p_error TEXT,
  p_retry BOOLEAN DEFAULT TRUE
)
RETURNS BOOLEAN AS $$
DECLARE
  v_updated BOOLEAN;
  v_attempt_count INTEGER;
  v_max_attempts INTEGER;
BEGIN
  -- Get current attempt count
  SELECT attempt_count, max_attempts 
  INTO v_attempt_count, v_max_attempts
  FROM job_queue
  WHERE id = p_queue_id;
  
  IF p_retry AND v_attempt_count < v_max_attempts THEN
    -- Schedule retry with exponential backoff
    UPDATE job_queue
    SET 
      status = 'retrying',
      last_error = p_error,
      next_retry_at = NOW() + INTERVAL '1 minute' * POWER(2, v_attempt_count),
      heartbeat_at = NOW(),
      worker_id = NULL -- Release the job
    WHERE id = p_queue_id 
      AND worker_id = p_worker_id 
      AND status = 'processing';
  ELSE
    -- Mark as permanently failed
    UPDATE job_queue
    SET 
      status = 'failed',
      last_error = p_error,
      completed_at = NOW(),
      heartbeat_at = NOW()
    WHERE id = p_queue_id 
      AND worker_id = p_worker_id 
      AND status = 'processing';
  END IF;
  
  v_updated := FOUND;
  RETURN v_updated;
END;
$$ LANGUAGE plpgsql;

-- Function to recover stale jobs (workers that died)
CREATE OR REPLACE FUNCTION recover_stale_jobs(p_stale_minutes INTEGER DEFAULT 5)
RETURNS INTEGER AS $$
DECLARE
  v_recovered INTEGER;
BEGIN
  UPDATE job_queue
  SET 
    status = 'retrying',
    worker_id = NULL,
    next_retry_at = NOW(),
    last_error = 'Worker heartbeat timeout'
  WHERE status = 'processing'
    AND heartbeat_at < NOW() - INTERVAL '1 minute' * p_stale_minutes;
  
  GET DIAGNOSTICS v_recovered = ROW_COUNT;
  RETURN v_recovered;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically queue jobs when created
CREATE OR REPLACE FUNCTION auto_queue_job()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'pending' THEN
    INSERT INTO job_queue (job_id, status)
    VALUES (NEW.id, 'pending');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_queue_job
AFTER INSERT ON copy_jobs
FOR EACH ROW
EXECUTE FUNCTION auto_queue_job();

-- Enable real-time for queue updates
ALTER PUBLICATION supabase_realtime ADD TABLE job_queue;

-- RLS policies for job_queue
ALTER TABLE job_queue ENABLE ROW LEVEL SECURITY;

-- Users can view their own queued jobs
CREATE POLICY "Users can view own job queue entries" ON job_queue
  FOR SELECT USING (
    job_id IN (
      SELECT id FROM copy_jobs WHERE user_id = auth.uid()
    )
  );

-- Grant necessary permissions
GRANT SELECT ON job_queue TO authenticated;
GRANT EXECUTE ON FUNCTION claim_next_job TO service_role;
GRANT EXECUTE ON FUNCTION update_job_heartbeat TO service_role;
GRANT EXECUTE ON FUNCTION complete_job TO service_role;
GRANT EXECUTE ON FUNCTION fail_job TO service_role;
GRANT EXECUTE ON FUNCTION recover_stale_jobs TO service_role;

-- Create a view for monitoring job queue status
CREATE OR REPLACE VIEW job_queue_status AS
SELECT 
  jq.*,
  cj.user_id,
  cj.source_folder_name as source_name,
  cj.dest_folder_name as destination_name,
  cj.total_items,
  cj.completed_items,
  CASE 
    WHEN jq.status = 'processing' AND jq.heartbeat_at > NOW() - INTERVAL '5 minutes' THEN 'healthy'
    WHEN jq.status = 'processing' THEN 'stale'
    ELSE 'inactive'
  END as health_status
FROM job_queue jq
JOIN copy_jobs cj ON jq.job_id = cj.id;

GRANT SELECT ON job_queue_status TO authenticated;