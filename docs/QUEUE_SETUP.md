# Queue System Setup for Long-Running Jobs

## Overview

The application now uses a Supabase-based queue system that allows jobs to run for hours without interruption. Jobs are processed by separate worker processes that can survive server restarts and handle failures gracefully.

## Architecture

```
User Request → API → Job Queue (Supabase) → Worker Process → Google Drive API
                           ↓
                    Real-time Updates → UI
```

## Key Benefits

1. **Resilience**: Jobs survive server restarts and crashes
2. **Scalability**: Run multiple workers to process jobs in parallel
3. **Recovery**: Automatic retry with exponential backoff
4. **Monitoring**: Real-time progress updates via Supabase subscriptions
5. **Long-running**: Jobs can run for hours without timeout issues

## Setup Instructions

### 1. Apply Database Migrations

```bash
# Run the queue system migration in Supabase
# Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new
# Paste and run: supabase/migrations/002_job_queue_system.sql
```

### 2. Get Service Role Key

1. Go to your Supabase project settings
2. Navigate to Settings → API
3. Copy the `service_role` key (NOT the anon key)
4. Add to `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

⚠️ **IMPORTANT**: The service role key bypasses Row Level Security. Never expose it to the client or commit it to version control.

### 3. Install Dependencies

```bash
yarn install
```

### 4. Running the System

#### Development Mode

```bash
# Terminal 1: Run Next.js app
yarn dev

# Terminal 2: Run worker (with auto-restart on changes)
yarn worker:dev
```

#### Production Mode

```bash
# Start Next.js app
yarn build && yarn start

# Start worker(s) in separate process/container
yarn worker

# Or run multiple workers for parallel processing
yarn worker:multi
```

## Worker Management

### Single Worker
```bash
yarn worker
```

### Multiple Workers (for high load)
```bash
# Runs 3 workers in parallel
yarn worker:multi
```

### Custom Worker ID
```bash
WORKER_ID=worker-prod-1 yarn worker
```

## Docker Deployment

### Worker Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn prisma generate

CMD ["yarn", "worker"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    command: yarn start
    ports:
      - "3000:3000"
    env_file: .env.local

  worker1:
    build: .
    command: yarn worker
    env_file: .env.local
    environment:
      - WORKER_ID=worker-1

  worker2:
    build: .
    command: yarn worker
    env_file: .env.local
    environment:
      - WORKER_ID=worker-2
```

## Monitoring

### View Queue Status

```sql
-- Run in Supabase SQL Editor
SELECT * FROM job_queue_status 
ORDER BY created_at DESC;
```

### Check Stale Jobs

```sql
SELECT * FROM job_queue 
WHERE status = 'processing' 
  AND heartbeat_at < NOW() - INTERVAL '5 minutes';
```

### Manual Recovery

```sql
-- Recover stale jobs
SELECT recover_stale_jobs(5);
```

## How It Works

1. **Job Creation**: When a user creates a copy job, it's automatically added to the queue
2. **Worker Claims Job**: Workers poll for available jobs and claim them atomically
3. **Processing**: Worker processes the job, sending heartbeats every 30 seconds
4. **Progress Updates**: Real-time updates sent to UI via Supabase subscriptions
5. **Completion/Failure**: Job marked as complete or failed with retry logic

## Retry Logic

- Failed jobs retry up to 3 times
- Exponential backoff: 1 min, 2 min, 4 min
- Permanent failure after max attempts
- Manual retry possible via API

## Troubleshooting

### Worker Not Processing Jobs

1. Check service role key is set correctly
2. Verify database connection
3. Check worker logs for errors
4. Ensure migrations are applied

### Jobs Stuck in Processing

```bash
# Check worker logs
yarn worker

# Manually recover stale jobs
# Run in Supabase SQL editor:
SELECT recover_stale_jobs(5);
```

### Real-time Updates Not Working

1. Verify Supabase real-time is enabled for tables
2. Check client connection to Supabase
3. Ensure anon key is correct in frontend

## Environment Variables

Required for workers:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx  # For client
SUPABASE_SERVICE_ROLE_KEY=xxx      # For worker (secret!)

# Google OAuth
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# Database
DATABASE_URL=xxx

# Auth
NEXTAUTH_URL=http://localhost:3000
```

## Security Notes

1. **Service Role Key**: Never expose to client-side code
2. **Worker Authentication**: Workers use service role for full access
3. **User Isolation**: Jobs are isolated by user ID
4. **Rate Limiting**: Built-in Google Drive API rate limiting

## Performance Considerations

- Each worker can process one job at a time
- Scale horizontally by adding more workers
- Jobs with millions of files may take hours
- Network speed affects copy performance
- Google Drive API limits: 20,000 requests/100 seconds

## Future Improvements

- [ ] Priority queue for premium users
- [ ] Job scheduling (run at specific times)
- [ ] Bandwidth throttling options
- [ ] Webhooks for job completion
- [ ] Archive completed jobs after X days