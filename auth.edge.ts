import NextAuth from "next-auth"
import authConfig from "@/auth.config"

// Edge-compatible auth without Prisma
export const { auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
})