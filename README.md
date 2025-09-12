# Google Drive Copier

A web application that enables users to copy folders from Google Drive (including "Shared with me" folders) to their own Drive or Shared Drives, with real-time progress tracking and credit-based billing.

## 🎯 Project Objectives

### Primary Goals
- **Enable bulk folder copying** from shared Google Drive folders to user's own Drive
- **Handle large-scale transfers** (100GB+) reliably with automatic retry mechanisms
- **Provide real-time progress tracking** for transparency during long-running operations
- **Implement usage-based billing** through a credit system (1 credit = 1 GB)
- **Optimize performance** by detecting existing files and avoiding redundant transfers

### Key Problems Solved
1. Google Drive's native interface doesn't allow easy copying of large shared folder structures
2. Manual copying is time-consuming and error-prone for large datasets
3. No visibility into copy progress for bulk operations
4. Difficulty in resuming interrupted transfers
5. Unnecessary re-copying of files that already exist in destination

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Authentication**: Auth.js v5 (NextAuth) with Google OAuth
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **Background Jobs**: Custom job queue system with worker processes
- **APIs**: Google Drive API v3
- **Deployment**: Vercel/Cloudflare compatible

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                   │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Dashboard  │  │ Job Monitor  │  │  Folder Picker   │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer (Next.js)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │   Auth API   │  │  Drive API   │  │   Jobs API     │   │
│  └──────────────┘  └──────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│   Supabase Database      │   │   Google Drive API       │
│  ┌──────────────────┐    │   │                          │
│  │   copy_jobs      │    │   │  - List folders/files    │
│  │   copy_items     │    │   │  - Copy operations       │
│  │   job_queue      │    │   │  - Permission checks     │
│  │   profiles       │    │   │                          │
│  └──────────────────┘    │   └──────────────────────────┘
│                          │
│  Real-time subscriptions │
└──────────────────────────┘
                ▲
                │
┌──────────────────────────┐
│   Background Worker       │
│                          │
│  - Polls job_queue       │
│  - Processes copy jobs   │
│  - Handles retries       │
│  - Updates progress      │
└──────────────────────────┘
```

## 📁 Project Structure

```
gdrive-copier/
├── app/                        # Next.js App Router
│   ├── api/                   # API endpoints
│   │   ├── auth/             # Authentication endpoints
│   │   ├── drive/            # Google Drive operations
│   │   │   ├── folders/      # Folder listing & stats
│   │   │   └── quota/        # Storage quota info
│   │   └── jobs/             # Job management
│   │       ├── estimate/     # Pre-scan & estimation
│   │       ├── activate/     # Convert draft to active job
│   │       ├── [id]/         # Job-specific operations
│   │       │   ├── tree/     # File tree structure
│   │       │   └── cancel/   # Cancel/delete jobs
│   │       └── create-with-scan/
│   ├── dashboard/            # Main user dashboard
│   └── jobs/                 # Job monitoring pages
│       └── [id]/            # Individual job details
│
├── components/               # React components
│   ├── FolderPicker.tsx     # Google Drive folder selector
│   ├── FileTreeView.tsx     # Real-time file tree display
│   ├── JobsList.tsx         # Active jobs list
│   └── ScanningProgress.tsx # Progress indicators
│
├── lib/                      # Core libraries
│   ├── google-drive.ts      # Drive API client
│   ├── google-drive-scanner.ts # Folder scanning logic
│   ├── queue/               # Job queue system
│   │   └── processor.ts     # Background worker
│   └── supabase.ts          # Database client
│
├── supabase/                # Database migrations
│   └── migrations/          # SQL schema definitions
│
└── workers/                 # Background processes
    └── local.ts            # Local development worker
```

## 🔄 Data Flow

### 1. **Estimation Phase** (Draft Status)
```
User selects folders → API scans source folder → 
Stores file structure in copy_items → Creates job with status='draft' →
Returns size estimation to user
```

### 2. **Activation Phase**
```
User confirms copy → Job status changes to 'queued' → 
Entry added to job_queue → Credits reserved
```

### 3. **Processing Phase**
```
Worker claims job from queue → Reads cached scan results →
Creates folder structure in destination → Copies files in batches →
Updates progress in real-time → Marks items as completed/failed
```

### 4. **Completion Phase**
```
All items processed → Job marked complete → 
Credits deducted based on actual transfer → User notified
```

## 🗄️ Database Schema

### Core Tables

- **copy_jobs**: Main job records with source/destination info
- **copy_items**: Individual files/folders to be copied
- **job_queue**: Processing queue for background workers
- **profiles**: User profiles with credit balances

### Job Status Flow
```
draft → queued → scanning → processing → completed
         ↓         ↓           ↓
      cancelled  failed     failed
```

## 🚀 Key Features

### Smart Sync Detection
- Scans destination folder before copying
- Skips files that already exist (same name, size, modified date)
- Shows exact count of files to be copied vs skipped

### Progressive Scanning
- Scans and stores folder structure during estimation
- Reuses scan results when job starts (no double scanning)
- Updates UI in real-time as scanning progresses

### Robust Error Handling
- Automatic retry with exponential backoff
- Partial progress saved (can resume failed jobs)
- Detailed error logging for debugging

### Real-time Updates
- Supabase real-time subscriptions for live progress
- File tree updates as items are copied
- Progress bars and statistics update instantly

## 🔐 Security

- **OAuth 2.0** authentication with Google
- **Encrypted tokens** stored in database
- **User isolation** - users can only see their own jobs
- **Permission validation** before any Drive operations
- **Rate limiting** to prevent API abuse

## 🎯 Performance Optimizations

1. **Batch Operations**: Processes files in batches to reduce API calls
2. **Parallel Processing**: Multiple workers can process different jobs
3. **Caching**: Scan results cached to avoid redundant API calls
4. **Streaming**: Large files streamed to avoid memory issues
5. **Incremental Updates**: Only changed files updated in destination

## 📊 Monitoring & Observability

- Job status tracking with detailed progress metrics
- Error logging with context for debugging
- Worker heartbeat monitoring for health checks
- API rate limit tracking to avoid quota issues

## 🔧 Configuration

### Environment Variables
```env
# Authentication
AUTH_SECRET=            # Auth.js secret
AUTH_GOOGLE_ID=         # Google OAuth client ID
AUTH_GOOGLE_SECRET=     # Google OAuth client secret

# Database
DATABASE_URL=           # PostgreSQL connection string
SUPABASE_URL=          # Supabase project URL
SUPABASE_ANON_KEY=     # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY= # Service role for admin operations

# Application
NEXT_PUBLIC_APP_URL=   # Application URL
```

## 🚦 Getting Started

1. **Install dependencies**
   ```bash
   yarn install
   ```

2. **Set up database**
   ```bash
   # Run migrations in Supabase SQL editor
   ```

3. **Configure Google OAuth**
   - Enable Google Drive API in Google Cloud Console
   - Set up OAuth 2.0 credentials
   - Add authorized redirect URIs

4. **Start development server**
   ```bash
   yarn dev
   ```

5. **Start background worker**
   ```bash
   yarn worker
   ```

## 📈 Future Enhancements

- **Stripe Integration**: Automated credit purchases
- **Team Accounts**: Shared credit pools for organizations
- **Selective Copying**: Choose specific file types or folders
- **Scheduling**: Set up recurring copy jobs
- **Bandwidth Control**: Limit transfer speeds
- **Compression**: Zip folders before transfer
- **WebSocket Updates**: Replace polling with WebSocket connections

## 📝 License

Private project - All rights reserved

## 🤝 Contributing

Internal project - Please contact the team for contribution guidelines