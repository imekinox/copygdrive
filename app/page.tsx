import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, CloudOff, FolderSync, Users, Shield, Zap, Clock, RefreshCw } from "lucide-react"

export default async function HomePage() {
  const session = await auth()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FolderSync className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">DriveCloner</h1>
            </div>
            <div className="flex items-center gap-4">
              {session?.user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Link href="/jobs/new">
                    <Button>Start Copying</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/login">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Copy Any Google Drive Folder
              <br />
              <span className="text-blue-600">Including "Shared with Me"</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The only tool that lets you copy entire folder structures from shared Google Drive folders 
              to your own Drive or organization's Shared Drives. Perfect for data migration, backup, 
              and consolidation.
            </p>
            <div className="flex gap-4 justify-center mb-8">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Start Copying Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              No credit card required • Copy up to 750GB per day • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Google Drive's Hidden Limitation
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Google Drive doesn't let you copy entire folders from "Shared with Me" to your Drive. 
              This becomes a nightmare when you need to:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CloudOff className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Migrate External Data</h3>
              <p className="text-gray-600">
                When contractors or partners share folders with thousands of files, 
                you can't simply copy them to your company drive.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Consolidate Team Files</h3>
              <p className="text-gray-600">
                Files created by team members with personal accounts can't be easily 
                moved to your organization's shared drives.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Backup Shared Content</h3>
              <p className="text-gray-600">
                You can't backup shared folders before the owner removes access or 
                deletes them permanently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Complete Solution for Google Drive Folder Copying
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Copy "Shared with Me" Folders</h4>
                    <p className="text-gray-600">Finally copy entire folder structures that others have shared with you</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Preserve Folder Structure</h4>
                    <p className="text-gray-600">Maintains exact folder hierarchy and file organization</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Handle Large Volumes</h4>
                    <p className="text-gray-600">Copy thousands of files and hundreds of GBs reliably</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Smart Rate Limiting</h4>
                    <p className="text-gray-600">Respects Google's API limits with automatic retries and backoff</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="text-sm text-gray-500 mb-2">Source: Shared with Me</div>
                <div className="font-mono text-sm">
                  📁 Client Project Files<br />
                  ├── 📁 Design Assets (2.3 GB)<br />
                  ├── 📁 Documents (845 MB)<br />
                  └── 📁 Videos (18.7 GB)
                </div>
              </div>
              <div className="text-center text-2xl mb-4">⬇️</div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 mb-2">Destination: My Drive</div>
                <div className="font-mono text-sm">
                  📁 Company Archive<br />
                  └── 📁 Client Project Files ✅<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;├── 📁 Design Assets ✅<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;├── 📁 Documents ✅<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;└── 📁 Videos ✅
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Sync Feature - NEW! */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              NEW FEATURE
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Smart Sync: Like rsync for Google Drive
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't waste time re-copying files that already exist. Our intelligent sync engine 
              scans your destination folder and only copies what's missing or updated.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Resume Interrupted Transfers</h3>
                    <p className="text-gray-600">
                      Job failed? Internet disconnected? No problem. Pick up exactly where you left off 
                      without re-copying everything.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <RefreshCw className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Incremental Syncs</h3>
                    <p className="text-gray-600">
                      Already copied some files manually? We detect existing files and only 
                      sync what's new or changed, saving time and bandwidth.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">10x Faster for Updates</h3>
                    <p className="text-gray-600">
                      Need to keep folders in sync? Re-run the job anytime to copy only new 
                      files added since the last sync. Perfect for regular backups.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm">
              <div className="mb-4">
                <span className="text-gray-500"># First run - copies everything</span><br />
                $ gdrive-sync source/ dest/<br />
                <span className="text-yellow-400">Scanning destination...</span><br />
                <span className="text-blue-400">Found 0 existing files</span><br />
                <span className="text-green-400">Copying 1,247 files (45.3 GB)...</span><br />
                [████████████████████████] 100%<br />
                <span className="text-green-400">✓ Completed: 1,247 files copied</span>
              </div>
              
              <div className="mb-4">
                <span className="text-gray-500"># Run again - only copies new files</span><br />
                $ gdrive-sync source/ dest/<br />
                <span className="text-yellow-400">Scanning destination...</span><br />
                <span className="text-blue-400">Found 1,247 existing files</span><br />
                <span className="text-green-400">Copying 23 new files (1.2 GB)...</span><br />
                [████████████████████████] 100%<br />
                <span className="text-green-400">✓ Completed: 23 files copied</span><br />
                <span className="text-gray-400">✓ Skipped: 1,247 existing files</span>
              </div>
              
              <div>
                <span className="text-gray-500"># Interrupted? Resume anytime</span><br />
                $ gdrive-sync --resume<br />
                <span className="text-yellow-400">Resuming previous job...</span><br />
                <span className="text-blue-400">Found 892 existing files</span><br />
                <span className="text-green-400">Copying 355 remaining files...</span><br />
                [████████████████████████] 100%<br />
                <span className="text-green-400">✓ Job resumed and completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Professional Teams
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to manage large-scale Google Drive migrations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Queue System</h3>
              <p className="text-gray-600 text-sm">
                Process multiple copy jobs asynchronously with real-time progress tracking
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure OAuth</h3>
              <p className="text-gray-600 text-sm">
                Direct Google OAuth integration - we never store your files or passwords
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">750GB Daily Limit</h3>
              <p className="text-gray-600 text-sm">
                Copy up to 750GB per day per account, respecting Google's quotas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perfect For These Scenarios
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3">🏢 Enterprise Data Migration</h3>
              <p className="text-gray-600 mb-4">
                Moving from personal Google accounts to Google Workspace? Copy all shared folders 
                from contractors, freelancers, and external partners into your company's shared drives.
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">Common scenario:</span> "We have 500GB of project files 
                shared by 20+ external contractors that need to be centralized"
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3">🎓 Educational Institutions</h3>
              <p className="text-gray-600 mb-4">
                Archive course materials shared by professors or backup student project folders 
                before the semester ends and access is revoked.
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">Common scenario:</span> "Professors share folders with 
                thousands of files that we need to archive for compliance"
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3">📸 Creative Agencies</h3>
              <p className="text-gray-600 mb-4">
                Consolidate client assets shared via Google Drive into your agency's organized 
                folder structure for long-term storage and team access.
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">Common scenario:</span> "Clients share massive video 
                and design folders that we need in our project management system"
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3">⚖️ Legal & Compliance</h3>
              <p className="text-gray-600 mb-4">
                Create backups of shared folders for legal discovery, compliance audits, or 
                before key employees leave the organization.
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">Common scenario:</span> "We need to backup all shared 
                folders before a contractor's access expires for compliance reasons"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Copying Your Google Drive Folders Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams who've successfully migrated their Google Drive data
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <p className="text-sm text-blue-100 mt-4">
            Free tier includes 10GB of transfers • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FolderSync className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-white font-semibold">DriveCloner</span>
              </div>
              <p className="text-gray-400 text-sm">
                The missing tool for Google Drive folder operations
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
                <li><Link href="/gdpr" className="hover:text-white">GDPR</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 DriveCloner. All rights reserved. Not affiliated with Google.
          </div>
        </div>
      </footer>
    </div>
  )
}