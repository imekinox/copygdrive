import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FolderSync } from "lucide-react"

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Effective Date:</strong> January 1, 2024<br />
            <strong>Last Updated:</strong> January 1, 2024
          </p>

          <p>
            Affix LLC ("we," "our," or "us"), operating DriveCloner at copygdrive.com, is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            <strong className="block mt-2 text-green-700">Important: We NEVER access or read the contents of your files - we only 
            process metadata (filenames and folder structure) necessary to perform the copy operation.</strong>
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> When you sign up via Google OAuth, we receive your name, email address, and Google account ID.</li>
            <li><strong>Payment Information:</strong> If you purchase credits, payment processing is handled by our third-party payment processors (Stripe). We do not store credit card details.</li>
            <li><strong>Support Communications:</strong> Information you provide when contacting our support team.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Information Collected Automatically</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google Drive Metadata ONLY:</strong> 
              <ul className="list-circle pl-6 mt-2">
                <li>Folder and file names</li>
                <li>File sizes for progress tracking</li>
                <li>Folder structure/hierarchy</li>
                <li>File/folder IDs for copy operations</li>
                <li className="text-green-700 font-semibold">We NEVER access, read, download, or store the actual contents of any file</li>
              </ul>
            </li>
            <li><strong>Usage Data:</strong> Copy job history (metadata only), transfer volumes, and feature usage</li>
            <li><strong>Device Information:</strong> Browser type, IP address, and general location (country/region)</li>
            <li><strong>Cookies:</strong> Session cookies for authentication and preferences only</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">1.3 Information We Do NOT Collect or Access</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>File Contents:</strong> We cannot and do not read, access, or store what's inside your files</li>
              <li><strong>Personal Documents:</strong> Your documents, spreadsheets, presentations remain completely private</li>
              <li><strong>Media Files:</strong> We don't access your photos, videos, or audio files</li>
              <li><strong>Sensitive Information:</strong> Any sensitive data within files is never accessed</li>
              <li><strong>Google Account Passwords:</strong> We use OAuth - passwords are never shared with us</li>
              <li><strong>File Download:</strong> Files are copied directly within Google's infrastructure - we don't download them</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain the DriveCloner service</li>
            <li>Process copy operations between Google Drive folders</li>
            <li>Track usage for billing and credit management</li>
            <li>Send service-related notifications</li>
            <li>Respond to support requests</li>
            <li>Improve our service and develop new features</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Sharing and Disclosure</h2>
          <p>We do not sell, trade, or rent your personal information. We may share information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>With Google:</strong> Via OAuth for authentication and Drive API access</li>
            <li><strong>With Service Providers:</strong> Trusted third parties who assist in operating our service (e.g., Cloudflare for hosting, Stripe for payments)</li>
            <li><strong>For Legal Requirements:</strong> When required by law or to protect rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security & Privacy by Design</h2>
          <p>We implement privacy-first architecture and security measures:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Zero File Access Architecture:</strong> Our system is designed to never access file contents</li>
            <li><strong>Direct Google Transfer:</strong> Files copy directly between Google Drive locations without passing through our servers</li>
            <li><strong>Encryption:</strong> All data in transit uses HTTPS/TLS 1.3</li>
            <li><strong>OAuth Token Security:</strong> Tokens are encrypted and isolated per user</li>
            <li><strong>Minimal Data Collection:</strong> We only collect metadata essential for the copy operation</li>
            <li><strong>Regular Security Audits:</strong> Continuous monitoring and improvement</li>
            <li><strong>Access Controls:</strong> Strict need-to-know basis for any data access</li>
            <li><strong>Secure Infrastructure:</strong> Enterprise-grade security via Cloudflare</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Data:</strong> Retained while your account is active + 30 days</li>
            <li><strong>Copy Job Metadata:</strong> Filenames and folder structure retained for 90 days (no file contents ever stored)</li>
            <li><strong>OAuth Tokens:</strong> Automatically refreshed, immediately deleted upon account deletion or revocation</li>
            <li><strong>Server Logs:</strong> Basic operational logs retained for 30 days</li>
            <li><strong>File Contents:</strong> NEVER stored - we don't have access to file contents at any point</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights and Choices</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Access:</strong> Request a copy of your personal information</li>
            <li><strong>Correction:</strong> Update or correct your information</li>
            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
            <li><strong>Portability:</strong> Receive your data in a structured format</li>
            <li><strong>Revoke Consent:</strong> Disconnect Google Drive access at any time</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in the United States. We ensure appropriate safeguards 
            are in place for international transfers in compliance with applicable laws.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
          <p>
            DriveCloner is not intended for use by anyone under 18 years old. We do not knowingly collect information 
            from children under 18. If we become aware of collection from a minor, we will delete the account and associated data immediately.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. California Privacy Rights (CCPA)</h2>
          <p>
            California residents have additional rights under the CCPA:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Right to Know:</strong> Request what personal information we collect (reminder: only metadata, never file contents)</li>
            <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
            <li><strong>Right to Opt-Out:</strong> We don't sell personal information, but you can opt-out of any data sharing</li>
            <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, contact privacy@copygdrive.com.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting 
            the new policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Information</h2>
          <div className="bg-gray-100 p-6 rounded-lg mt-6">
            <p className="font-semibold">Affix LLC</p>
            <p>30 N Gould St Ste R</p>
            <p>Sheridan, WY 82801</p>
            <p>United States</p>
            <p className="mt-4">
              <strong>Email:</strong> privacy@copygdrive.com<br />
              <strong>Website:</strong> https://copygdrive.com
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Legal Basis for Processing (GDPR)</h2>
          <p>For users in the European Economic Area, we process personal data based on:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Contract:</strong> To provide the DriveCloner service (processing only filename metadata)</li>
            <li><strong>Consent:</strong> For marketing communications (always optional)</li>
            <li><strong>Legitimate Interests:</strong> For service improvement and security (never involving file contents)</li>
            <li><strong>Legal Obligations:</strong> To comply with applicable laws</li>
          </ul>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm">
              <strong>GDPR Compliance:</strong> We are fully GDPR compliant. EU users have complete control over their data, 
              can request deletion at any time, and benefit from our privacy-by-design architecture that ensures file contents 
              are never accessed.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500">
            This privacy policy is effective as of January 1, 2024 and will remain in effect except with respect to 
            any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
          </p>
        </div>
      </div>
    </div>
  )
}