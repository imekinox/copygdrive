import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { listFolders } from "@/lib/google-drive"

export async function GET(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const sharedWithMe = searchParams.get('sharedWithMe') === 'true'
    const sharedDrives = searchParams.get('sharedDrives') === 'true'
    const parentId = searchParams.get('parentId')
    
    const folders = await listFolders(session.user.id, {
      sharedWithMe,
      sharedDrives,
      ...(parentId && { parentId })
    })
    
    return NextResponse.json(folders)
  } catch (error) {
    console.error('Error fetching folders:', error)
    return NextResponse.json(
      { error: "Failed to fetch folders" },
      { status: 500 }
    )
  }
}