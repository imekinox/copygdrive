import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { scanFolder, copyStoredItemsConcurrent } from '@/lib/google-drive-scanner'
import { Database } from '@/lib/supabase-types'

export class JobQueueProcessor {
  private supabaseAdmin!: SupabaseClient<Database>
  private workerId: string
  private isRunning: boolean = false
  private heartbeatInterval?: NodeJS.Timeout
  private currentQueueId?: string

  constructor(workerId?: string) {
    this.workerId = workerId || `worker-${process.pid}-${Date.now()}`
    this.initSupabase()
  }

  private initSupabase() {
    // Initialize Supabase with service role key for backend operations
    this.supabaseAdmin = createClient<Database>(
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

  /**
   * Start processing jobs from the queue
   */
  async start() {
    if (this.isRunning) {
      console.log('🔄 Processor already running')
      return
    }

    this.isRunning = true
    console.log(`🚀 Starting job processor: ${this.workerId}`)

    // Start recovery process for stale jobs
    this.startStaleJobRecovery()

    // Main processing loop
    while (this.isRunning) {
      try {
        await this.processNextJob()
        // Small delay between job checks
        await this.sleep(1000)
      } catch (error) {
        console.error('❌ Error in processing loop:', error)
        await this.sleep(5000) // Longer delay on error
      }
    }
  }

  /**
   * Stop the processor
   */
  stop() {
    console.log(`🛑 Stopping job processor: ${this.workerId}`)
    this.isRunning = false
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
    }
  }

  /**
   * Process the next available job from the queue
   */
  private async processNextJob() {
    // Claim a job from the queue
    const { data: queueData, error: claimError } = await this.supabaseAdmin
      .rpc('claim_next_job', { p_worker_id: this.workerId })

    if (claimError) {
      console.error('❌ Error claiming job:', claimError)
      return
    }

    if (!queueData) {
      // No jobs available
      return
    }

    this.currentQueueId = queueData
    console.log(`📋 Claimed job from queue: ${queueData}`)

    // Get the full job details
    const { data: queueJob, error: fetchError } = await this.supabaseAdmin
      .from('job_queue')
      .select('*, copy_jobs(*)')
      .eq('id', queueData)
      .single()

    if (fetchError || !queueJob?.copy_jobs) {
      console.error('❌ Error fetching job details:', fetchError)
      await this.failJob(queueData, 'Failed to fetch job details')
      return
    }

    const job = queueJob.copy_jobs

    // Start heartbeat
    this.startHeartbeat(queueData)

    try {
      // Get user details from the job
      const { data: userAccounts, error: userError } = await this.supabaseAdmin
        .from('accounts')
        .select('*')
        .eq('user_id', job.user_id)
        .eq('provider', 'google')
        .single()
      
      if (userError || !userAccounts) {
        throw new Error('User OAuth account not found')
      }

      if (!userAccounts?.refresh_token) {
        throw new Error('No refresh token found')
      }

      // Initialize Google OAuth client
      console.log('🔐 Setting up OAuth client...')
      console.log('Client ID:', process.env.GOOGLE_CLIENT_ID)
      console.log('Has Client Secret:', !!process.env.GOOGLE_CLIENT_SECRET)
      console.log('Has Refresh Token:', !!userAccounts.refresh_token)
      console.log('Has Access Token:', !!userAccounts.access_token)
      console.log('Token expires at:', userAccounts.expires_at, 'Current time:', Math.floor(Date.now() / 1000))
      
      const oauth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
      )

      oauth2Client.setCredentials({
        refresh_token: userAccounts.refresh_token,
        access_token: userAccounts.access_token || undefined,
        token_type: userAccounts.token_type || undefined,
        expiry_date: userAccounts.expires_at ? userAccounts.expires_at * 1000 : undefined
      })

      // Always refresh token to ensure it's valid
      console.log('🔄 Refreshing access token to ensure it\'s valid...')
      try {
        const { credentials } = await oauth2Client.refreshAccessToken()
        console.log('New token expires at:', new Date(credentials.expiry_date!).toISOString())
        oauth2Client.setCredentials(credentials)
        
        // Update the stored tokens
        if (credentials.access_token) {
          const { error: updateError } = await this.supabaseAdmin
            .from('accounts')
            .update({
              access_token: credentials.access_token,
              expires_at: credentials.expiry_date ? Math.floor(credentials.expiry_date / 1000) : null
            })
            .eq('provider', 'google')
            .eq('provider_account_id', userAccounts.provider_account_id)
          
          if (updateError) {
            console.error('Failed to update tokens in database:', updateError)
          } else {
            console.log('✅ Token refreshed and saved')
          }
        }
      } catch (refreshError: any) {
        console.error('❌ Failed to refresh token:', refreshError.message)
        if (refreshError.response?.data) {
          console.error('Error details:', refreshError.response.data)
        }
        throw new Error('Failed to refresh Google OAuth token')
      }

      const drive = google.drive({ version: 'v3', auth: oauth2Client })

      // Check if items already exist from a previous scan (from estimation)
      const { data: existingItems, error: itemsError } = await this.supabaseAdmin
        .from('copy_items')
        .select('id')
        .eq('job_id', job.id)
        .limit(1)
      
      let scanProgress
      
      if (existingItems && existingItems.length > 0) {
        // Items already exist from estimation phase, skip scanning
        console.log(`✅ Found existing scan results for job ${job.id}, using cached data`)
        
        // Only update to processing if not a draft job
        if (job.status !== 'draft') {
          await this.supabaseAdmin
            .from('copy_jobs')
            .update({
              status: 'processing',
              started_at: new Date().toISOString()
            })
            .eq('id', job.id)
        }
        
        // Use the counts already stored in the job from estimation
        // These were saved during the estimation scan
        scanProgress = {
          discoveredItems: job.discovered_items || 0,
          discoveredFolders: job.discovered_folders || 0,
          discoveredBytes: job.discovered_bytes || 0,
          skippedItems: 0
        }
        
        // Count skipped items from copy_items table
        const { count: skippedCount } = await this.supabaseAdmin
          .from('copy_items')
          .select('*', { count: 'exact', head: true })
          .eq('job_id', job.id)
          .eq('status', 'skipped')
        
        scanProgress.skippedItems = skippedCount || 0
        
        console.log(`📊 Using cached scan: ${scanProgress.discoveredItems} files, ${scanProgress.discoveredFolders} folders, ${scanProgress.skippedItems} already exist`)
      } else {
        // No existing items, run the scan
        console.log(`🔍 Starting scan: ${job.source_folder_name}`)
        
        // Update status to scanning with started_at (but keep draft as draft)
        await this.supabaseAdmin
          .from('copy_jobs')
          .update({ 
            status: job.status === 'draft' ? 'draft' : 'scanning',
            started_at: new Date().toISOString()
          })
          .eq('id', job.id)
        
        // Use concurrent scanning for better performance
        const concurrency = 10 // Test with 10 concurrent scans
        
        console.log(`🚀 Using concurrent scanning with ${concurrency} parallel subfolder scans`)
        scanProgress = await scanFolder(
          drive,
          job.source_folder_id,
          job.dest_folder_id,
          job.id,
          job.source_folder_name,
          async (progress) => {
            // Update job with discovered counts
            await this.supabaseAdmin
                .from('copy_jobs')
                .update({
                  discovered_items: progress.discoveredItems,
                  discovered_folders: progress.discoveredFolders,
                  discovered_bytes: progress.discoveredBytes,
                  skipped_items: progress.skippedItems,
                  last_scan_path: progress.lastPath
                })
                .eq('id', job.id)
              
              // Update heartbeat
              await this.supabaseAdmin.rpc('update_job_heartbeat', {
                p_queue_id: queueData,
                p_worker_id: this.workerId,
                p_progress_data: {
                  phase: 'scanning',
                  ...progress
                }
              })
              
              console.log(`📊 Scan progress: ${progress.discoveredItems} files, ${progress.discoveredFolders} folders, ${progress.skippedItems} already exist`)
            },
            concurrency
          )
      }
      
      console.log(`✅ Scan complete: ${scanProgress.discoveredItems} files, ${scanProgress.discoveredFolders} folders, ${scanProgress.skippedItems} already exist`)
      
      // Check if this is a draft job (estimation only)
      if (job.status === 'draft') {
        // For draft jobs, we only scan, not copy
        console.log(`📊 Draft job - estimation complete, skipping copy phase`)
        
        // Update scan completion for draft job
        await this.supabaseAdmin
          .from('copy_jobs')
          .update({ 
            scan_completed_at: new Date().toISOString(),
            total_items: scanProgress.discoveredItems + scanProgress.discoveredFolders,
            total_bytes: String(scanProgress.discoveredBytes),
            discovered_items: scanProgress.discoveredItems,
            discovered_folders: scanProgress.discoveredFolders,
            discovered_bytes: scanProgress.discoveredBytes,
            skipped_items: scanProgress.skippedItems
          })
          .eq('id', job.id)
        
        // Mark the queue job as completed
        await this.supabaseAdmin.rpc('complete_job', {
          p_queue_id: queueData,
          p_worker_id: this.workerId
        })
        return // Exit early for draft jobs
      }
      
      // Only update scan completion if we actually ran a scan (not using cached data)
      if (!existingItems || existingItems.length === 0) {
        // Update scan completion and transition to processing
        await this.supabaseAdmin
          .from('copy_jobs')
          .update({ 
            scan_completed_at: new Date().toISOString(),
            status: 'processing',
            total_items: scanProgress.discoveredItems + scanProgress.discoveredFolders,
            total_bytes: String(scanProgress.discoveredBytes),
            discovered_items: scanProgress.discoveredItems,
            discovered_folders: scanProgress.discoveredFolders,
            discovered_bytes: scanProgress.discoveredBytes,
            skipped_items: scanProgress.skippedItems
          })
          .eq('id', job.id)
      }
      
      // Phase 2: Copy from stored items (only for non-draft jobs)
      console.log(`📋 Starting copy: ${job.source_folder_name} -> ${job.dest_folder_name}`)
      
      // Check if destination folder already exists with the same name
      const existingFolders = await drive.files.list({
        q: `name='${job.source_folder_name.replace(/'/g, "\\'")}'` +
           ` and '${job.dest_folder_id}' in parents` +
           ` and mimeType='application/vnd.google-apps.folder'` +
           ` and trashed=false`,
        fields: 'files(id, name)',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      })
      
      let destFolderId: string
      
      if (existingFolders.data.files && existingFolders.data.files.length > 0) {
        // Use existing folder
        destFolderId = existingFolders.data.files[0].id!
        console.log(`✅ Using existing folder: ${job.source_folder_name} (${destFolderId})`)
      } else {
        // Create new destination folder
        const destFolder = await drive.files.create({
          requestBody: {
            name: job.source_folder_name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [job.dest_folder_id]
          },
          fields: 'id',
          supportsAllDrives: true
        })
        
        if (!destFolder.data.id) {
          throw new Error('Failed to create destination folder')
        }
        destFolderId = destFolder.data.id
        console.log(`📁 Created new folder: ${job.source_folder_name} (${destFolderId})`)
      }
      
      // Use concurrent copying with 10 parallel operations
      const copyConcurrency = 10 // Can be adjusted for performance
      console.log(`📄 Starting concurrent copy with ${copyConcurrency} parallel file operations`)
      
      const copyResult = await copyStoredItemsConcurrent(
        drive,
        job.id, // Supabase job ID
        destFolderId,
        async (completed, total) => {
          // Update job progress
          await this.supabaseAdmin
            .from('copy_jobs')
            .update({
              completed_items: completed,
              copied_bytes: String(scanProgress.discoveredBytes * (completed / total))
            })
            .eq('id', job.id)
          
          // Update heartbeat
          await this.supabaseAdmin.rpc('update_job_heartbeat', {
            p_queue_id: queueData,
            p_worker_id: this.workerId,
            p_progress_data: {
              phase: 'copying',
              completed,
              total
            }
          })
          
          // Additional progress tracking could be added here if needed
        },
        copyConcurrency // Pass the concurrency parameter
      )
      
      console.log(`✅ Copy complete: ${copyResult.completed}/${copyResult.total} items`)

      // Mark job as completed
      await this.supabaseAdmin
        .from('copy_jobs')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          copied_bytes: String(scanProgress.discoveredBytes)
        })
        .eq('id', job.id)

      // Mark queue entry as completed in Supabase
      await this.supabaseAdmin.rpc('complete_job', {
        p_queue_id: queueData,
        p_worker_id: this.workerId
      })

      console.log(`✅ Job completed: ${job.id}`)

    } catch (error) {
      console.error(`❌ Job failed: ${job.id}`, error)
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      // Update job status to failed
      await this.supabaseAdmin
        .from('copy_jobs')
        .update({
          status: 'failed',
          error_message: errorMessage,
          completed_at: new Date().toISOString()
        })
        .eq('id', job.id)

      // Mark queue entry as failed (with retry)
      await this.failJob(queueData, errorMessage)
    } finally {
      this.stopHeartbeat()
      this.currentQueueId = undefined
    }
  }

  /**
   * Start sending heartbeats for the current job
   */
  private startHeartbeat(queueId: string) {
    this.stopHeartbeat() // Clear any existing heartbeat
    
    this.heartbeatInterval = setInterval(async () => {
      try {
        const success = await this.supabaseAdmin.rpc('update_job_heartbeat', {
          p_queue_id: queueId,
          p_worker_id: this.workerId
        })
        
        if (!success) {
          console.warn('⚠️ Heartbeat failed - job may have been reassigned')
          this.stopHeartbeat()
        }
      } catch (error) {
        console.error('❌ Error sending heartbeat:', error)
      }
    }, 30000) // Send heartbeat every 30 seconds
  }

  /**
   * Stop sending heartbeats
   */
  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = undefined
    }
  }

  /**
   * Mark a job as failed in the queue
   */
  private async failJob(queueId: string, error: string, retry: boolean = true) {
    await this.supabaseAdmin.rpc('fail_job', {
      p_queue_id: queueId,
      p_worker_id: this.workerId,
      p_error: error,
      p_retry: retry
    })
  }

  /**
   * Start periodic recovery of stale jobs
   */
  private startStaleJobRecovery() {
    // Run recovery every 2 minutes
    setInterval(async () => {
      try {
        const { data: recovered } = await this.supabaseAdmin
          .rpc('recover_stale_jobs', { p_stale_minutes: 5 })
        
        if (recovered && recovered > 0) {
          console.log(`🔧 Recovered ${recovered} stale jobs`)
        }
      } catch (error) {
        console.error('❌ Error recovering stale jobs:', error)
      }
    }, 120000) // 2 minutes
  }

  /**
   * Helper function to sleep
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}