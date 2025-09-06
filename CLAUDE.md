# Google Drive Web Copier - Project Context

## Overview
We're building a web application that allows users to copy folders from Google Drive (including "Shared with me" folders) to their own Drive or Shared Drives. This is a modernized version of the Python script `@clone_sequential_safe.py`.

## Core Features
1. **OAuth Authentication**: Users sign in with Google account
2. **Folder Selection**: Pick source (including shared) and destination folders
3. **Queue System**: Copy jobs are queued and processed asynchronously
4. **Progress Tracking**: Real-time progress updates (polling every 2-3 seconds)
5. **Credits System**: Users pay per GB transferred (future feature)

## Tech Stack
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Auth**: Auth.js v5 (NextAuth beta) with Google OAuth
- **Database**: Cloudflare D1 (SQLite at edge) with Prisma ORM
- **Queue**: Cloudflare Queues for job processing
- **UI**: shadcn/ui components
- **APIs**: Google Drive API v3 via @googleapis/drive

## Project Structure
```
gdrive-copier/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Auth.js endpoints
│   │   ├── jobs/         # Copy job management
│   │   └── drive/        # Drive API operations
│   ├── dashboard/        # Main dashboard
│   ├── jobs/            # Job monitoring
│   └── (auth)/          # Auth pages
├── components/           # React components
├── lib/                 # Utilities & services
├── prisma/              # Database schema
└── workers/             # Cloudflare Workers
```

## Key Files Reference
- **../PLAN.md**: Detailed implementation plan with phases
- **../stack_ref_docs.md**: Technical documentation for all libraries
- **../clone_sequential_safe.py**: Original Python implementation

## Current Implementation Status
Track progress in the todo list. We're building in phases:
1. ✅ Project setup with Next.js 15
2. ⏳ Installing dependencies and configuring auth
3. 🔜 Database schema and UI components
4. 🔜 Google Drive integration
5. 🔜 Queue system and job processing

## Development Commands
```bash
# Development
yarn dev

# Database
yarn prisma generate
yarn prisma db push
yarn prisma studio

# Build
yarn build

# Deploy to Cloudflare
wrangler deploy
```

## Environment Setup Required
1. Google Cloud Project with Drive API enabled
2. OAuth 2.0 credentials (Client ID & Secret)
3. Cloudflare account (for D1 and Queues)
4. Environment variables (see .env.example)

## Key Implementation Decisions
- **No Firebase**: Using Auth.js instead (simpler, integrated)
- **Polling over WebSockets**: D1 doesn't support subscriptions
- **Credits System**: 1 credit = 1 GB, deducted after successful copy
- **Error Handling**: Automatic retries with exponential backoff
- **File Streaming**: For files over 10MB to avoid memory issues

## API Rate Limits to Consider
- Google Drive: 20,000 requests per 100 seconds
- Per-user: 1,000 requests per 100 seconds
- Implement batching and throttling

## Testing Approach
- Local development with SQLite
- Miniflare for Workers emulation
- Test Google account with limited data
- Unit tests for critical paths

## Security Considerations
- Never store raw tokens (encrypted in DB)
- Validate user owns destination folder
- Rate limit API endpoints
- Sanitize file names and paths
- CORS configuration for production

## Performance Goals
- Job creation: < 2 seconds
- Folder listing: < 3 seconds
- Progress updates: Every 2-3 seconds
- Support copying 100GB+ folders

## Future Enhancements (Post-MVP)
- Stripe payment integration
- Bandwidth optimization
- Selective file copying
- Scheduling capabilities
- Team/organization accounts

## Important Notes
- Always use yarn (not npm) for consistency
- Follow Next.js 15 App Router patterns
- Keep components server-side when possible
- Use the MCP Ref tool for latest documentation
- Update todos frequently to track progress

## When Working on This Project
1. Check PLAN.md for current phase
2. Reference stack_ref_docs.md for technical details
3. Update todos as you complete tasks
4. Test locally before deploying
5. Ensure all environment variables are set