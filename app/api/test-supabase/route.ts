import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test database connection
    const { data: jobs, error: jobsError } = await supabase
      .from('copy_jobs')
      .select('count')
      .single()

    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .single()

    return NextResponse.json({
      success: true,
      connection: 'Connected to Supabase!',
      tables: {
        copy_jobs: jobsError ? 'Error: ' + jobsError.message : 'Ready',
        profiles: profilesError ? 'Error: ' + profilesError.message : 'Ready'
      },
      database: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}