-- Check if the trigger exists and is enabled
SELECT 
    t.tgname as trigger_name,
    t.tgenabled as enabled,
    p.proname as function_name
FROM 
    pg_trigger t
    JOIN pg_proc p ON t.tgfoid = p.oid
WHERE 
    t.tgname = 'trigger_auto_queue_job';

-- Also check the function
SELECT 
    proname as function_name,
    prosrc as function_source
FROM 
    pg_proc
WHERE 
    proname = 'auto_queue_job';