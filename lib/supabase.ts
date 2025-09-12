import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type Database = {
  public: {
    Tables: {
      copy_jobs: {
        Row: {
          id: string
          user_id: string
          source_folder_id: string
          source_folder_name: string
          dest_folder_id: string
          dest_folder_name: string
          status: string
          total_items: number | null
          completed_items: number
          failed_items: number
          total_bytes: string | null
          copied_bytes: string
          credits_used: number
          credits_reserved: number
          error_message: string | null
          started_at: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['copy_jobs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['copy_jobs']['Insert']>
      }
      copy_items: {
        Row: {
          id: string
          job_id: string
          source_id: string
          source_name: string
          source_path: string
          mime_type: string
          size: string | null
          new_id: string | null
          status: string
          error: string | null
          retry_count: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['copy_items']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['copy_items']['Insert']>
      }
    }
  }
}