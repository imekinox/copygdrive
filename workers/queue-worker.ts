#!/usr/bin/env node

/**
 * Standalone worker for processing copy jobs from the queue
 * Can be run as a separate process or container
 * 
 * Usage:
 *   yarn worker         # Run a single worker
 *   yarn worker:multi   # Run multiple workers
 */

import dotenv from 'dotenv'
import path from 'path'
import { JobQueueProcessor } from '../lib/queue/processor'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'NEXTAUTH_URL',
  'DATABASE_URL'
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`)
    process.exit(1)
  }
}

// Create worker instance
const workerId = process.env.WORKER_ID || `worker-${process.pid}`
const processor = new JobQueueProcessor(workerId)

// Handle graceful shutdown
let isShuttingDown = false

const shutdown = async (signal: string) => {
  if (isShuttingDown) return
  
  isShuttingDown = true
  console.log(`\n📦 Received ${signal}, shutting down gracefully...`)
  
  processor.stop()
  
  // Give some time for cleanup
  setTimeout(() => {
    console.log('👋 Worker shut down complete')
    process.exit(0)
  }, 5000)
}

// Register shutdown handlers
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGHUP', () => shutdown('SIGHUP'))

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error)
  shutdown('uncaughtException')
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled rejection at:', promise, 'reason:', reason)
  shutdown('unhandledRejection')
})

// Start the processor
console.log(`
╔══════════════════════════════════════════╗
║     Google Drive Copy Queue Worker       ║
╠══════════════════════════════════════════╣
║  Worker ID: ${workerId.padEnd(29)} ║
║  PID: ${String(process.pid).padEnd(35)} ║
║  Node: ${process.version.padEnd(34)} ║
╚══════════════════════════════════════════╝
`)

processor.start().catch((error) => {
  console.error('❌ Failed to start processor:', error)
  process.exit(1)
})