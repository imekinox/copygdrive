import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

// Function to create client-side Supabase client (uses anon key)
function createSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Function to create server-side Supabase client (uses service role key)
function createSupabaseAdmin() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Export singleton instances with lazy initialization
export const supabase = typeof window !== 'undefined' ? createSupabaseClient() : null as any
export const supabaseAdmin = typeof window === 'undefined' && process.env.SUPABASE_SERVICE_ROLE_KEY ? createSupabaseAdmin() : null as any

// Types for our tables
export interface CopyJob {
  id: string
  user_id: string
  source_folder_id: string
  source_folder_name: string
  dest_folder_id: string
  dest_folder_name: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
  total_items?: number
  completed_items?: number
  total_bytes?: string
  copied_bytes?: string
  error_message?: string
  created_at: string
  started_at?: string
  completed_at?: string
}

export interface JobQueue {
  id: string
  job_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'retrying'
  worker_id?: string
  attempt_count: number
  max_attempts: number
  last_error?: string
  created_at: string
  started_at?: string
  completed_at?: string
  heartbeat_at?: string
  next_retry_at?: string
  progress_data?: any
}

export interface CopyItem {
  id: string
  job_id: string
  source_id: string
  source_name: string
  source_path: string
  mime_type: string
  size?: string
  new_id?: string
  status: 'pending' | 'copying' | 'completed' | 'failed' | 'skipped'
  error?: string
  created_at: string
  updated_at: string
}