import NextAuth from "next-auth"
import { SupabaseAdapter } from "@/lib/auth-adapter"
import { createClient } from '@supabase/supabase-js'
import authConfig from "@/auth.config"

// Create Supabase admin client for auth callbacks
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter(),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async session({ token, session }) {
      if (token?.sub && session?.user) {
        session.user.id = token.sub
      }
      
      if (session?.user && token?.sub) {
        // Fetch user credits from Supabase
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('credits')
          .eq('id', token.sub)
          .single()
        
        if (profile) {
          session.user.credits = profile.credits || 100
        }
      }
      
      return session
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Store the access token and refresh token
        await supabaseAdmin
          .from('accounts')
          .update({
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
          })
          .eq('provider', account.provider)
          .eq('provider_account_id', account.providerAccountId)
      }
      
      return token
    },
  },
  events: {
    async createUser({ user }) {
      // Give new users 100 GB free credits
      console.log(`New user created: ${user.email} with 100 GB free credits`)
      
      // Update credits in Supabase
      await supabaseAdmin
        .from('profiles')
        .update({ credits: 100 })
        .eq('id', user.id)
    }
  }
})