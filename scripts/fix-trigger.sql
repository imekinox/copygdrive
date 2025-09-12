-- Check if the trigger exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'trigger_auto_queue_job'
    ) THEN
        RAISE NOTICE 'Trigger does not exist, creating it now...';
        
        -- Create the trigger function if it doesn't exist
        CREATE OR REPLACE FUNCTION auto_queue_job()
        RETURNS TRIGGER AS $func$
        BEGIN
          -- Handle both 'pending' and 'queued' statuses
          IF NEW.status IN ('pending', 'queued') THEN
            INSERT INTO job_queue (job_id, status)
            VALUES (NEW.id, 'pending')
            ON CONFLICT (job_id) DO NOTHING;
          END IF;
          RETURN NEW;
        END;
        $func$ LANGUAGE plpgsql;
        
        -- Create the trigger
        CREATE TRIGGER trigger_auto_queue_job
        AFTER INSERT ON copy_jobs
        FOR EACH ROW
        EXECUTE FUNCTION auto_queue_job();
        
        RAISE NOTICE 'Trigger created successfully!';
    ELSE
        RAISE NOTICE 'Trigger already exists. Updating the function to handle both statuses...';
        
        -- Update the function to handle both 'pending' and 'queued' statuses
        CREATE OR REPLACE FUNCTION auto_queue_job()
        RETURNS TRIGGER AS $func$
        BEGIN
          -- Handle both 'pending' and 'queued' statuses
          IF NEW.status IN ('pending', 'queued') THEN
            INSERT INTO job_queue (job_id, status)
            VALUES (NEW.id, 'pending')
            ON CONFLICT (job_id) DO NOTHING;
          END IF;
          RETURN NEW;
        END;
        $func$ LANGUAGE plpgsql;
        
        RAISE NOTICE 'Function updated to handle both pending and queued statuses!';
    END IF;
END
$$;

-- Now manually add any existing queued jobs that aren't in the queue
INSERT INTO job_queue (job_id, status)
SELECT id, 'pending'
FROM copy_jobs
WHERE status IN ('pending', 'queued')
AND id NOT IN (SELECT job_id FROM job_queue)
ON CONFLICT DO NOTHING;

-- Show the results
SELECT 
    'Trigger Status' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_auto_queue_job')
        THEN 'EXISTS'
        ELSE 'MISSING'
    END as status
UNION ALL
SELECT 
    'Jobs in copy_jobs',
    COUNT(*)::text
FROM copy_jobs
WHERE status IN ('pending', 'queued')
UNION ALL
SELECT 
    'Jobs in job_queue',
    COUNT(*)::text
FROM job_queue
WHERE status IN ('pending', 'retrying');