-- Create copy_items table for tracking individual files/folders
CREATE TABLE IF NOT EXISTS copy_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES copy_jobs(id) ON DELETE CASCADE,
  
  source_id TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_path TEXT NOT NULL, -- Full path for display
  mime_type TEXT NOT NULL,
  size BIGINT,
  
  new_id TEXT, -- ID in destination after copy
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'copying', 'completed', 'failed', 'skipped')),
  error TEXT,
  
  retry_count INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_copy_items_job_id ON copy_items(job_id);
CREATE INDEX idx_copy_items_source_id ON copy_items(source_id);
CREATE INDEX idx_copy_items_status ON copy_items(status);

-- Add RLS policies
ALTER TABLE copy_items ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own copy items
CREATE POLICY "Users can view their own copy items"
  ON copy_items FOR SELECT
  USING (
    job_id IN (
      SELECT id FROM copy_jobs WHERE user_id = auth.uid()
    )
  );

-- Allow service role full access
CREATE POLICY "Service role has full access to copy items"
  ON copy_items FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_copy_items_updated_at 
  BEFORE UPDATE ON copy_items 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();