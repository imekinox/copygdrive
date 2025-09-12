-- Manually recover stale jobs that are stuck in processing
-- This will reset them to 'retrying' status so they can be picked up again

UPDATE job_queue
SET 
  status = 'retrying',
  worker_id = NULL,
  next_retry_at = NOW(),
  last_error = 'Worker heartbeat timeout - manually recovered'
WHERE status = 'processing'
  AND (heartbeat_at < NOW() - INTERVAL '1 minute' OR worker_id = 'worker-83631');

-- Show the results
SELECT 
  id,
  status,
  worker_id,
  attempt_count,
  last_error
FROM job_queue
ORDER BY created_at DESC;