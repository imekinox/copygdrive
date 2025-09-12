import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    // Instead of running the migration directly, return the SQL
    // You'll need to run this in Supabase SQL editor
    const migrationSQL = `
-- Add 'draft' status to copy_jobs status enum
-- First, drop the existing constraint
ALTER TABLE copy_jobs 
DROP CONSTRAINT IF EXISTS copy_jobs_status_check;

-- Add the new constraint with 'draft' included
ALTER TABLE copy_jobs 
ADD CONSTRAINT copy_jobs_status_check 
CHECK (status IN ('draft', 'scanning', 'queued', 'processing', 'completed', 'failed', 'cancelled'));

-- Add comment explaining the statuses
COMMENT ON COLUMN copy_jobs.status IS 'Job status: draft (estimation phase), scanning (discovering files), queued (ready to process), processing (copying files), completed, failed, or cancelled';
`
    
    return NextResponse.json({ 
      message: "Run this SQL in Supabase SQL editor:",
      sql: migrationSQL
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed" },
      { status: 500 }
    )
  }
}