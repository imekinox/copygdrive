# Deployment Guide

## Architecture
- **App**: Next.js in Docker container
- **Database**: Supabase (PostgreSQL with real-time)
- **Auth**: Google OAuth via Auth.js
- **Storage**: Google Drive API

## Prerequisites

1. **Supabase Setup** ✅
   - Project: vmjwbcdvcqmufjmonjji
   - Database password: EC7VWt6X5QZ7LIYA
   - Run migration: Copy contents of `supabase/migrations/001_initial_schema.sql` to Supabase SQL Editor

2. **Google OAuth Setup**
   - Already configured in `.env.local`

3. **Environment Variables**
   - All configured in `.env.local`

## Local Development

```bash
# 1. Install dependencies
yarn install

# 2. Run development server
yarn dev

# Visit http://localhost:3000
```

## Docker Deployment

### Option 1: Docker Compose (Recommended)

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# Stop
docker-compose down
```

### Option 2: Docker Direct

```bash
# Build image
docker build -t gdrive-copier .

# Run container
docker run -p 3000:3000 \
  --env-file .env.local \
  gdrive-copier
```

## Production Deployment Options

### 1. VPS (DigitalOcean, Linode, etc.)

```bash
# SSH into server
ssh user@your-server

# Clone repo
git clone https://github.com/yourusername/gdrive-copier.git
cd gdrive-copier

# Copy .env.local file
nano .env.local # paste your env vars

# Run with Docker Compose
docker-compose up -d
```

### 2. Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/PROJECT-ID/gdrive-copier

# Deploy to Cloud Run
gcloud run deploy gdrive-copier \
  --image gcr.io/PROJECT-ID/gdrive-copier \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars-from-file=.env.yaml
```

### 3. Railway/Render

1. Connect GitHub repo
2. Add environment variables from `.env.local`
3. Deploy

## Supabase Migration

Run this SQL in Supabase Dashboard → SQL Editor:

```sql
-- See supabase/migrations/001_initial_schema.sql
```

## Testing Real-time

1. Open two browser windows
2. Start a copy job in one window
3. Watch it update in real-time in both windows

## Monitoring

- **Supabase Dashboard**: Monitor database, real-time connections
- **Google Cloud Console**: Monitor API usage
- **Docker logs**: `docker-compose logs -f`

## Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000
# Kill it
kill -9 <PID>
```

### Database connection issues
- Check Supabase service is running
- Verify SUPABASE_URL and ANON_KEY

### Google OAuth issues
- Ensure redirect URLs are configured in Google Console
- Update AUTH_URL in production

## Security Notes

1. **Never commit `.env.local`** to git
2. **Use service role key** only on server-side
3. **Enable RLS** on all Supabase tables (already done)
4. **Rotate AUTH_SECRET** in production

## Performance Tips

1. Docker image is optimized (~150MB)
2. Supabase real-time reduces polling overhead
3. Next.js standalone output minimizes bundle size
4. Consider CDN for static assets in production

## Next Steps

1. Set up SSL certificates (Let's Encrypt)
2. Configure Nginx reverse proxy
3. Set up monitoring (Uptime Robot, etc.)
4. Configure backups
5. Set up CI/CD pipeline