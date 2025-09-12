import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FolderSync, Shield, FileText, Users, Globe, Database, Lock, AlertCircle } from "lucide-react"

export default function GDPRCompliancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <FolderSync className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">DriveCloner</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">GDPR Compliance</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Affix LLC, operating DriveCloner at copygdrive.com, is committed to complying with the General Data 
            Protection Regulation (GDPR) for all European Union residents. <strong>We prioritize your privacy by design - 
            we NEVER access your file contents, only metadata necessary for the copy operation (filenames and folder structure).</strong> 
            This page outlines our GDPR compliance measures and your rights as a data subject.
          </p>

          {/* GDPR Overview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Our GDPR Commitment</h2>
                <p className="text-gray-700">
                  We process personal data lawfully, fairly, and transparently. We collect only what's necessary 
                  (filename metadata only - never file contents), keep it accurate, store it securely, and respect 
                  your rights to access, correct, and delete your data. Your files remain private - we cannot and 
                  do not read them.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Data Controller Information</h2>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <p className="font-semibold">Affix LLC</p>
            <p>30 N Gould St Ste R</p>
            <p>Sheridan, WY 82801</p>
            <p>United States</p>
            <p className="mt-4">
              <strong>Data Protection Contact:</strong> privacy@copygdrive.com<br />
              <strong>EU Representative:</strong> To be appointed as required
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Legal Basis for Processing</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Contract Performance (Article 6(1)(b))</h3>
              <p className="text-gray-600">Processing necessary to provide the DriveCloner service you requested, including:</p>
              <ul className="list-disc pl-6 mt-2 text-sm">
                <li>Account creation and management</li>
                <li>Google Drive folder copying operations</li>
                <li>Service delivery and support</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Consent (Article 6(1)(a))</h3>
              <p className="text-gray-600">Processing based on your explicit consent for:</p>
              <ul className="list-disc pl-6 mt-2 text-sm">
                <li>Marketing communications</li>
                <li>Non-essential cookies</li>
                <li>Newsletter subscriptions</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Legitimate Interests (Article 6(1)(f))</h3>
              <p className="text-gray-600">Processing for our legitimate interests including:</p>
              <ul className="list-disc pl-6 mt-2 text-sm">
                <li>Service improvement and development</li>
                <li>Fraud prevention and security</li>
                <li>Internal analytics and reporting</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Legal Obligations (Article 6(1)(c))</h3>
              <p className="text-gray-600">Processing required by law for:</p>
              <ul className="list-disc pl-6 mt-2 text-sm">
                <li>Tax and accounting requirements</li>
                <li>Regulatory compliance</li>
                <li>Legal proceedings</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Your Rights Under GDPR</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <FileText className="w-5 h-5 text-green-600 mb-2" />
              <h3 className="font-semibold mb-2">Right to Access (Article 15)</h3>
              <p className="text-sm text-gray-600">Request a copy of your personal data and information about how we process it</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <FileText className="w-5 h-5 text-green-600 mb-2" />
              <h3 className="font-semibold mb-2">Right to Rectification (Article 16)</h3>
              <p className="text-sm text-gray-600">Request correction of inaccurate or incomplete personal data</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <FileText className="w-5 h-5 text-green-600 mb-2" />
              <h3 className="font-semibold mb-2">Right to Erasure (Article 17)</h3>
              <p className="text-sm text-gray-600">Request deletion of your personal data ("right to be forgotten")</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <FileText className="w-5 h-5 text-green-600 mb-2" />
              <h3 className="font-semibold mb-2">Right to Restrict (Article 18)</h3>
              <p className="text-sm text-gray-600">Request restriction of processing in certain circumstances</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <FileText className="w-5 h-5 text-green-600 mb-2" />
              <h3 className="font-semibold mb-2">Right to Portability (Article 20)</h3>
              <p className="text-sm text-gray-600">Receive your data in a structured, machine-readable format</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <FileText className="w-5 h-5 text-green-600 mb-2" />
              <h3 className="font-semibold mb-2">Right to Object (Article 21)</h3>
              <p className="text-sm text-gray-600">Object to processing based on legitimate interests or direct marketing</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Personal Data Categories</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> Name, Google account ID</li>
            <li><strong>Contact Data:</strong> Email address</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
            <li><strong>Usage Data:</strong> Service usage patterns, feature interactions</li>
            <li><strong>File Metadata Only:</strong> Filenames, folder names, file sizes, folder structure (NOT file contents)</li>
            <li><strong>Transaction Data:</strong> Payment history, credit purchases</li>
            <li><strong>Marketing Data:</strong> Communication preferences</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">What We Do NOT Access</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>File Contents:</strong> We NEVER access, read, or store the contents of your files</li>
              <li><strong>Personal Documents:</strong> Your documents, photos, videos remain completely private</li>
              <li><strong>Sensitive Data:</strong> We cannot see what's inside your files</li>
              <li><strong>Google Account Password:</strong> We use OAuth - we never see or store your password</li>
            </ul>
          </div>
          <p>We do NOT collect any special categories of personal data (racial or ethnic origin, political opinions, 
          religious beliefs, genetic data, biometric data, health data, or data about sexual orientation).</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h2>
          
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Retention Periods</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Data:</strong> Duration of account + 30 days</li>
              <li><strong>Transaction Records:</strong> 7 years (legal requirement)</li>
              <li><strong>Copy Job Metadata:</strong> 90 days (filenames only, no content)</li>
              <li><strong>Server Logs:</strong> 30 days</li>
              <li><strong>Marketing Data:</strong> Until consent withdrawn</li>
              <li><strong>OAuth Tokens:</strong> Automatically refreshed, deleted on account deletion</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              We determine retention periods based on legal requirements, contract obligations, and legitimate business needs.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. International Data Transfers</h2>
          
          <div className="border-l-4 border-blue-500 pl-6 mb-6">
            <h3 className="font-semibold mb-2">Transfer Safeguards</h3>
            <p>When we transfer data outside the EEA, we ensure appropriate safeguards:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Adequacy decisions where applicable</li>
              <li>Your explicit consent for specific transfers</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Protection Measures</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h4 className="font-semibold">Encryption</h4>
                <p className="text-sm text-gray-600">TLS 1.3 in transit, AES-256 at rest</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h4 className="font-semibold">Access Controls</h4>
                <p className="text-sm text-gray-600">Role-based access, MFA required</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Database className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h4 className="font-semibold">Data Minimization</h4>
                <p className="text-sm text-gray-600">Metadata only, never file contents</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Users className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h4 className="font-semibold">Staff Training</h4>
                <p className="text-sm text-gray-600">Regular privacy training</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Third-Party Data Processors</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Processor</th>
                  <th className="border px-4 py-2 text-left">Purpose</th>
                  <th className="border px-4 py-2 text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Google</td>
                  <td className="border px-4 py-2">OAuth, Drive API (metadata only)</td>
                  <td className="border px-4 py-2">US/EU</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Cloudflare</td>
                  <td className="border px-4 py-2">Hosting, CDN</td>
                  <td className="border px-4 py-2">Global</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Stripe</td>
                  <td className="border px-4 py-2">Payment Processing</td>
                  <td className="border px-4 py-2">US/EU</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            All processors are contractually bound to protect your data and process it only per our instructions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Cookie Policy</h2>
          
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for service operation (authentication, security)</li>
              <li><strong>Functional Cookies:</strong> Remember preferences and settings</li>
              <li><strong>Analytics Cookies:</strong> Understand service usage (with consent)</li>
            </ul>
            <p className="mt-4">
              You can manage cookie preferences through your browser settings. Disabling essential cookies may 
              affect service functionality.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Data Breach Procedures</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Breach Response Protocol</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Assess the breach scope and risk within 24 hours</li>
                  <li>Notify supervisory authorities within 72 hours if required</li>
                  <li>Notify affected individuals without undue delay for high-risk breaches</li>
                  <li>Document all breaches and responses</li>
                  <li>Implement measures to prevent recurrence</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Children's Privacy</h2>
          <p>
            Our service is not directed to individuals under 16 years of age. We do not knowingly collect personal 
            data from children. If we become aware that we have collected data from a child under 16, we will 
            delete it immediately.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Exercising Your Rights</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">How to Submit a Request</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email privacy@copygdrive.com with your request</li>
              <li>Include "GDPR Request" in the subject line</li>
              <li>Provide your account email and specific request</li>
              <li>We'll verify your identity for security</li>
              <li>We'll respond within 30 days (may extend to 60 days for complex requests)</li>
            </ol>
            <p className="mt-4 text-sm">
              <strong>No Fee:</strong> Exercising your rights is free unless requests are manifestly unfounded or excessive.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Automated Decision-Making</h2>
          <p>
            We do not use automated decision-making or profiling that produces legal or similarly significant effects. 
            Any automated processes we use (such as fraud detection) include human review for significant decisions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">14. Privacy by Design</h2>
          <p>
            We implement privacy by design principles in all our operations:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Data minimization - collect only what's necessary</li>
            <li>Purpose limitation - use data only for stated purposes</li>
            <li>Privacy as the default setting</li>
            <li>End-to-end security measures</li>
            <li>Transparency in all data processing</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">15. Supervisory Authority</h2>
          
          <div className="bg-gray-100 rounded-lg p-6">
            <Globe className="w-6 h-6 text-gray-600 mb-2" />
            <h3 className="font-semibold mb-2">Right to Lodge a Complaint</h3>
            <p>
              If you're unsatisfied with how we handle your data, you have the right to lodge a complaint with your 
              local supervisory authority. For a list of supervisory authorities, visit:
            </p>
            <p className="mt-2">
              <a href="https://edpb.europa.eu/about-edpb/board/members_en" className="text-blue-600 hover:underline">
                European Data Protection Board Members
              </a>
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">16. Updates to GDPR Compliance</h2>
          <p>
            We regularly review and update our GDPR compliance measures. Material changes will be communicated 
            through service notifications or email. This page was last updated on January 1, 2024.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">17. Contact Information</h2>
          
          <div className="bg-gray-100 p-6 rounded-lg mt-6">
            <p className="font-semibold">Data Protection Inquiries</p>
            <p>Affix LLC</p>
            <p>30 N Gould St Ste R</p>
            <p>Sheridan, WY 82801</p>
            <p>United States</p>
            <p className="mt-4">
              <strong>Email:</strong> privacy@copygdrive.com<br />
              <strong>Subject Line:</strong> GDPR Request<br />
              <strong>Response Time:</strong> Within 30 days
            </p>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Your Privacy Matters:</strong> We are committed to protecting your personal data and respecting 
              your rights under GDPR. If you have any questions or concerns about our data practices, please don't 
              hesitate to contact us.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500">
            This GDPR compliance statement is provided for transparency and to ensure you understand your rights 
            regarding personal data processing by DriveCloner.
          </p>
        </div>
      </div>
    </div>
  )
}