import { auth } from "@/auth.edge"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                     req.nextUrl.pathname.startsWith("/register")
  const isPublicPage = req.nextUrl.pathname === "/" || 
                       req.nextUrl.pathname.startsWith("/api/auth") ||
                       req.nextUrl.pathname === "/privacy" ||
                       req.nextUrl.pathname === "/terms" ||
                       req.nextUrl.pathname === "/security" ||
                       req.nextUrl.pathname === "/gdpr"
  
  if (!isLoggedIn && !isAuthPage && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}