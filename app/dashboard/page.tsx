import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { signOut } from "@/auth"
import JobsList from "@/components/JobsList"
import RateLimitStatus from "@/components/RateLimitStatus"
import GoogleDriveQuota from "@/components/GoogleDriveQuota"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }
  
  // Get user's copy jobs
  const jobs = await prisma.copyJob.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10
  })
  
  // Get stats
  const stats = await prisma.copyJob.aggregate({
    where: { userId: session.user.id },
    _count: true,
    _sum: {
      creditsUsed: true
    }
  })
  
  const activeJobs = await prisma.copyJob.count({
    where: {
      userId: session.user.id,
      status: { in: ["queued", "scanning", "copying"] }
    }
  })
  
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
              <div className="text-2xl font-bold">{session.user.credits} GB</div>
              <p className="text-xs text-muted-foreground mt-1">
                Transfer quota remaining
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
              <div className="text-2xl font-bold">{activeJobs}</div>
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
                {stats._sum.creditsUsed || 0} GB
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {stats._count} jobs
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <GoogleDriveQuota />
          <RateLimitStatus />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Copy Jobs</h2>
          <Link href="/jobs/new">
            <Button>Start New Copy</Button>
          </Link>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <JobsList jobs={jobs} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}