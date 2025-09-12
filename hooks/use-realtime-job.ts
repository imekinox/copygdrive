import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type CopyJob = Database['public']['Tables']['copy_jobs']['Row']

export function useRealtimeJob(jobId: string | null) {
  const [job, setJob] = useState<CopyJob | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!jobId) {
      setLoading(false)
      return
    }

    // Initial fetch
    const fetchJob = async () => {
      try {
        const { data, error } = await supabase
          .from('copy_jobs')
          .select('*')
          .eq('id', jobId)
          .single()

        if (error) throw error
        setJob(data)
      } catch (err) {
        console.error('Error fetching job:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch job')
      } finally {
        setLoading(false)
      }
    }

    fetchJob()

    // Set up real-time subscription
    const subscription = supabase
      .channel(`job-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'copy_jobs',
          filter: `id=eq.${jobId}`
        },
        (payload) => {
          console.log('Job updated:', payload)
          setJob(payload.new as CopyJob)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [jobId])

  return { job, loading, error }
}

export function useRealtimeJobs(userId: string | null) {
  const [jobs, setJobs] = useState<CopyJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    // Initial fetch
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('copy_jobs')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) throw error
        setJobs(data || [])
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()

    // Set up real-time subscription for all user's jobs
    const subscription = supabase
      .channel(`user-jobs-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'copy_jobs',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('Jobs changed:', payload)
          
          if (payload.eventType === 'INSERT') {
            setJobs(prev => [payload.new as CopyJob, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setJobs(prev => prev.map(job => 
              job.id === payload.new.id ? payload.new as CopyJob : job
            ))
          } else if (payload.eventType === 'DELETE') {
            setJobs(prev => prev.filter(job => job.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId])

  return { jobs, loading, error }
}