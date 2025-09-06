import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "@/auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async session({ token, session }) {
      if (token?.sub && session?.user) {
        session.user.id = token.sub
      }
      
      if (session?.user && token?.sub) {
        // Fetch user credits
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { credits: true }
        })
        
        if (dbUser) {
          session.user.credits = dbUser.credits
        }
      }
      
      return session
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Store the access token and refresh token
        await prisma.account.update({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            }
          },
          data: {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
          }
        })
      }
      
      return token
    },
  },
  events: {
    async createUser({ user }) {
      // Give new users 100 GB free credits
      console.log(`New user created: ${user.email} with 100 GB free credits`)
    }
  }
})