import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

async function handleDelete(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const params = await context.params
    
    // Check if job belongs to user
    const { data: job, error: jobError } = await supabaseAdmin
      .from('copy_jobs')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .single()
    
    if (!job || jobError) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }
    
    // Delete the job and all related items (cascade delete)
    const { error: deleteError } = await supabaseAdmin
      .from('copy_jobs')
      .delete()
      .eq('id', params.id)
    
    if (deleteError) {
      throw deleteError
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    )
  }
}

// Support both DELETE and POST methods for compatibility
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  return handleDelete(request, context)
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  return handleDelete(request, context)
}