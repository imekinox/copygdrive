-- Manually insert the job into the queue
INSERT INTO job_queue (job_id, status)
VALUES ('c8677b66-1b5b-49fc-ba76-2d6408806536'::uuid, 'pending')
ON CONFLICT DO NOTHING;