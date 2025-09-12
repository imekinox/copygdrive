-- Temporarily disable RLS on copy_jobs to fix client access
ALTER TABLE copy_jobs DISABLE ROW LEVEL SECURITY;

-- Also disable on copy_items if it exists
ALTER TABLE copy_items DISABLE ROW LEVEL SECURITY;
