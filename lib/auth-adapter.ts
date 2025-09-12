import { Adapter, AdapterUser, AdapterAccount, AdapterSession } from "next-auth/adapters"
import { createClient } from '@supabase/supabase-js'

export function SupabaseAdapter(): Adapter {
  // Create admin client directly in the adapter
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
  return {
    async createUser(user: Omit<AdapterUser, "id">) {
      const insertData: any = {
        id: crypto.randomUUID(),
        email: user.email!,
        name: user.name,
        image: user.image,
      }
      
      // Only include email_verified if it exists in the table
      // This allows the adapter to work whether the column exists or not
      if (user.emailVerified !== undefined) {
        insertData.email_verified = user.emailVerified
      }
      
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .insert(insertData)
        .select()
        .single()

      if (error) {
        console.error('Error creating user:', error)
        throw error
      }
      return {
        id: data.id,
        email: data.email,
        emailVerified: data.email_verified || null,
        name: data.name,
        image: data.image,
      }
    },

    async getUser(id: string) {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select()
        .eq('id', id)
        .single()

      if (error || !data) return null
      
      return {
        id: data.id,
        email: data.email,
        emailVerified: data.email_verified || null,
        name: data.name,
        image: data.image,
      }
    },

    async getUserByEmail(email: string) {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select()
        .eq('email', email)
        .single()

      if (error || !data) return null
      
      return {
        id: data.id,
        email: data.email,
        emailVerified: data.email_verified || null,
        name: data.name,
        image: data.image,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const { data: account, error } = await supabaseAdmin
        .from('accounts')
        .select('user_id')
        .eq('provider', provider)
        .eq('provider_account_id', providerAccountId)
        .single()

      if (error || !account) return null

      const { data: user, error: userError } = await supabaseAdmin
        .from('profiles')
        .select()
        .eq('id', account.user_id)
        .single()

      if (userError || !user) return null

      return {
        id: user.id,
        email: user.email,
        emailVerified: user.email_verified,
        name: user.name,
        image: user.image,
      }
    },

    async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">) {
      const updateData: any = {}
      if (user.email !== undefined) updateData.email = user.email
      if (user.name !== undefined) updateData.name = user.name
      if (user.image !== undefined) updateData.image = user.image
      if (user.emailVerified !== undefined) updateData.email_verified = user.emailVerified
      
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      
      return {
        id: data.id,
        email: data.email,
        emailVerified: data.email_verified || null,
        name: data.name,
        image: data.image,
      }
    },

    async deleteUser(userId: string) {
      await supabaseAdmin
        .from('profiles')
        .delete()
        .eq('id', userId)
    },

    async linkAccount(account: AdapterAccount) {
      const { error } = await supabaseAdmin
        .from('accounts')
        .insert({
          id: crypto.randomUUID(),
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        })
      
      if (error) {
        console.error('Error linking account:', error)
        throw error
      }
    },

    async unlinkAccount({ providerAccountId, provider }) {
      await supabaseAdmin
        .from('accounts')
        .delete()
        .eq('provider', provider)
        .eq('provider_account_id', providerAccountId)
    },

    async createSession(session: {
      sessionToken: string
      userId: string
      expires: Date
    }) {
      const { error } = await supabaseAdmin
        .from('sessions')
        .insert({
          id: crypto.randomUUID(),
          session_token: session.sessionToken,
          user_id: session.userId,
          expires: session.expires.toISOString(),
        })
      
      if (error) {
        console.error('Error creating session:', error)
        throw error
      }
      
      return session
    },

    async getSessionAndUser(sessionToken: string) {
      const { data: session, error } = await supabaseAdmin
        .from('sessions')
        .select('*, profiles(*)')
        .eq('session_token', sessionToken)
        .single()

      if (error || !session || !session.profiles) return null

      return {
        session: {
          sessionToken: session.session_token,
          userId: session.user_id,
          expires: new Date(session.expires),
        },
        user: {
          id: session.profiles.id,
          email: session.profiles.email,
          emailVerified: session.profiles.email_verified || null,
          name: session.profiles.name,
          image: session.profiles.image,
        },
      }
    },

    async updateSession(session: {
      sessionToken: string
      userId?: string
      expires?: Date
    }) {
      const updates: any = {}
      if (session.userId) updates.user_id = session.userId
      if (session.expires) updates.expires = session.expires.toISOString()

      await supabaseAdmin
        .from('sessions')
        .update(updates)
        .eq('session_token', session.sessionToken)
      
      return session
    },

    async deleteSession(sessionToken: string) {
      await supabaseAdmin
        .from('sessions')
        .delete()
        .eq('session_token', sessionToken)
    },

    async createVerificationToken(verificationToken: {
      identifier: string
      token: string
      expires: Date
    }) {
      await supabaseAdmin
        .from('verification_tokens')
        .insert({
          identifier: verificationToken.identifier,
          token: verificationToken.token,
          expires: verificationToken.expires.toISOString(),
        })
      
      return verificationToken
    },

    async useVerificationToken({ identifier, token }) {
      const { data, error } = await supabaseAdmin
        .from('verification_tokens')
        .delete()
        .eq('identifier', identifier)
        .eq('token', token)
        .select()
        .single()

      if (error || !data) return null

      return {
        identifier: data.identifier,
        token: data.token,
        expires: new Date(data.expires),
      }
    },
  }
}