# Test Draft Status Implementation

## 1. First, run the migration

Visit: http://localhost:3000/api/admin/migrate-draft-status

Copy the SQL and run it in your Supabase SQL editor at:
https://supabase.com/dashboard/project/vmjwbcdvcqmufjmonjji/sql

## 2. Test the workflow

1. **Estimate a folder**: 
   - Select source and destination folders
   - Click "Estimate Size"
   - This should create a job with `status = 'draft'`

2. **Check database**:
   ```sql
   SELECT id, status, started_at, discovered_items, discovered_folders 
   FROM copy_jobs 
   WHERE status = 'draft'
   ORDER BY created_at DESC
   LIMIT 1;
   ```

3. **Activate the job**:
   - Click "Start Copy" 
   - This should change status from 'draft' to 'queued'
   - Job should then be processed without rescanning

## 3. Benefits

- ✅ No double scanning (estimation results are reused)
- ✅ Clear separation between estimation and actual job
- ✅ Draft jobs can be deleted/cancelled without affecting credits
- ✅ Better user experience - instant job start after estimation