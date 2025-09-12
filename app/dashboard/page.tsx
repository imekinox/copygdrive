import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from '@supabase/supabase-js'
import { signOut } from "@/auth"
import JobsList from "@/components/JobsList"
import GoogleDriveQuota from "@/components/GoogleDriveQuota"

// Create Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }
  
  // Get user's copy jobs from Supabase
  const { data: jobs } = await supabase
    .from('copy_jobs')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(10)
  
  // Get stats from Supabase
  const { data: allJobs } = await supabase
    .from('copy_jobs')
    .select('total_bytes, completed_items, status')
    .eq('user_id', session.user.id)
  
  // Calculate total transferred bytes (only completed jobs)
  const completedJobs = allJobs?.filter(job => job.status === 'completed') || []
  const totalBytesTransferred = completedJobs.reduce((sum, job) => {
    const bytes = parseInt(job.total_bytes || '0')
    return sum + bytes
  }, 0)
  const totalGBTransferred = (totalBytesTransferred / (1024 * 1024 * 1024)).toFixed(2)
  const totalItemsTransferred = completedJobs.reduce((sum, job) => sum + (job.completed_items || 0), 0)
  
  // Get active jobs count and user profile for credits
  const { count: activeJobs } = await supabase
    .from('copy_jobs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .in('status', ['queued', 'scanning', 'copying', 'processing'])
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', session.user.id)
    .single()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Google Drive Copier</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {session.user.email}
              </span>
              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/login" })
                }}
              >
                <Button type="submit" variant="outline" size="sm">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Credits Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.credits || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Items remaining
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeJobs || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently processing
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Transferred
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalGBTransferred} GB
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalItemsTransferred} items completed
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <GoogleDriveQuota />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Copy Jobs</h2>
          <Link href="/jobs/new">
            <Button>Start New Copy</Button>
          </Link>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <JobsList jobs={(jobs || []).map(job => ({
              id: job.id,
              sourceFolderName: job.source_folder_name,
              destFolderName: job.dest_folder_name,
              status: job.status,
              totalItems: job.total_items,
              completedItems: job.completed_items || 0,
              createdAt: job.created_at
            }))} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}