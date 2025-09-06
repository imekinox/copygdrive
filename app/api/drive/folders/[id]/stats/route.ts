import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { getFolderStatsQuick } from "@/lib/google-drive"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const params = await context.params
    const { searchParams } = new URL(request.url)
    const quick = searchParams.get('quick') !== 'false'
    
    // Use quick stats by default to avoid timeouts
    const stats = await getFolderStatsQuick(session.user.id, params.id)
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching folder stats:', error)
    return NextResponse.json(
      { error: "Failed to fetch folder stats" },
      { status: 500 }
    )
  }
}