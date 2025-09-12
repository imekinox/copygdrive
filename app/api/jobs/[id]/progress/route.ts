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

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const params = await context.params
    const { data: job, error: jobError } = await supabaseAdmin
      .from('copy_jobs')
      .select(`
        status,
        completed_items,
        total_items,
        failed_items,
        copied_bytes,
        total_bytes,
        credits_used
      `)
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .single()
    
    if (!job || jobError) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }
    
    // Get all items but group by source_id to remove duplicates
    const { data: items, error: itemsError } = await supabaseAdmin
      .from('copy_items')
      .select(`
        id,
        source_id,
        source_name,
        source_path,
        mime_type,
        status,
        error,
        updated_at
      `)
      .eq('job_id', params.id)
      .order('updated_at', { ascending: false })
    
    if (itemsError) {
      console.error('Error fetching items:', itemsError)
      return NextResponse.json({
        ...job,
        items: []
      })
    }
    
    // Remove duplicates based on source_id using a Map for efficiency
    const uniqueMap = new Map<string, typeof items[0]>()
    for (const item of items || []) {
      if (!uniqueMap.has(item.source_id)) {
        uniqueMap.set(item.source_id, item)
      }
    }
    
    // Convert back to array and take first 10
    const uniqueItems = Array.from(uniqueMap.values()).slice(0, 10)
    
    return NextResponse.json({
      ...job,
      items: uniqueItems
    })
  } catch (error) {
    console.error('Error fetching job progress:', error)
    return NextResponse.json(
      { error: "Failed to fetch job progress" },
      { status: 500 }
    )
  }
}