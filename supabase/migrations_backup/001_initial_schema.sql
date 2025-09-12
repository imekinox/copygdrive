-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (managed by Supabase Auth, but we extend it)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    image TEXT,
    credits INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Copy Jobs table
CREATE TABLE IF NOT EXISTS public.copy_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    source_folder_id TEXT NOT NULL,
    source_folder_name TEXT NOT NULL,
    dest_folder_id TEXT NOT NULL,
    dest_folder_name TEXT NOT NULL,
    status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'scanning', 'copying', 'completed', 'failed', 'cancelled')),
    total_items INTEGER,
    completed_items INTEGER DEFAULT 0,
    failed_items INTEGER DEFAULT 0,
    total_bytes TEXT DEFAULT '0',
    copied_bytes TEXT DEFAULT '0',
    credits_used INTEGER DEFAULT 0,
    credits_reserved INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Copy Items table
CREATE TABLE IF NOT EXISTS public.copy_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES public.copy_jobs(id) ON DELETE CASCADE,
    source_id TEXT NOT NULL,
    source_name TEXT NOT NULL,
    source_path TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size TEXT,
    new_id TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'copying', 'completed', 'failed', 'skipped')),
    error TEXT,
    retry_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Credit Purchases table
CREATE TABLE IF NOT EXISTS public.credit_purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    credits INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'usd',
    stripe_payment_intent_id TEXT,
    stripe_session_id TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- OAuth Accounts table (for storing Google tokens)
CREATE TABLE IF NOT EXISTS public.oauth_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    provider_account_id TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider, provider_account_id)
);

-- Indexes for performance
CREATE INDEX idx_copy_jobs_user_status ON public.copy_jobs(user_id, status);
CREATE INDEX idx_copy_jobs_status ON public.copy_jobs(status);
CREATE INDEX idx_copy_items_job_status ON public.copy_items(job_id, status);
CREATE INDEX idx_copy_items_job ON public.copy_items(job_id);
CREATE INDEX idx_credit_purchases_user ON public.credit_purchases(user_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oauth_accounts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Copy Jobs: Users can only see and manage their own jobs
CREATE POLICY "Users can view own jobs" ON public.copy_jobs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own jobs" ON public.copy_jobs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own jobs" ON public.copy_jobs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own jobs" ON public.copy_jobs
    FOR DELETE USING (auth.uid() = user_id);

-- Copy Items: Users can only see items from their own jobs
CREATE POLICY "Users can view own job items" ON public.copy_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.copy_jobs
            WHERE copy_jobs.id = copy_items.job_id
            AND copy_jobs.user_id = auth.uid()
        )
    );

-- Credit Purchases: Users can only see their own purchases
CREATE POLICY "Users can view own purchases" ON public.credit_purchases
    FOR SELECT USING (auth.uid() = user_id);

-- OAuth Accounts: Users can only see and manage their own accounts
CREATE POLICY "Users can view own oauth accounts" ON public.oauth_accounts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own oauth accounts" ON public.oauth_accounts
    FOR ALL USING (auth.uid() = user_id);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_copy_jobs_updated_at BEFORE UPDATE ON public.copy_jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_copy_items_updated_at BEFORE UPDATE ON public.copy_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_oauth_accounts_updated_at BEFORE UPDATE ON public.oauth_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, image)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on auth.users insert
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable real-time for copy_jobs table
ALTER PUBLICATION supabase_realtime ADD TABLE public.copy_jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.copy_items;