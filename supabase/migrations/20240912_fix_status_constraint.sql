-- Drop the existing check constraint
ALTER TABLE copy_items DROP CONSTRAINT IF EXISTS copy_items_status_check;

-- Add the new constraint that includes 'updated' status
ALTER TABLE copy_items ADD CONSTRAINT copy_items_status_check 
CHECK (status IN ('pending', 'copying', 'completed', 'failed', 'skipped', 'updated'));

-- Add comment for clarity
COMMENT ON COLUMN copy_items.status IS 'Status of the copy operation: pending, copying, completed, failed, skipped, or updated';