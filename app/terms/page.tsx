import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FolderSync } from "lucide-react"

export default function TermsOfService() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Effective Date:</strong> January 1, 2024<br />
            <strong>Last Updated:</strong> January 1, 2024
          </p>

          <p>
            These Terms of Service ("Terms") govern your use of DriveCloner, a service provided by Affix LLC 
            ("Company," "we," "us," or "our") through the website copygdrive.com. By accessing or using our 
            service, you agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using DriveCloner, you accept and agree to be bound by these Terms and our Privacy Policy. 
            If you do not agree to these Terms, you must not use our service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p>
            DriveCloner provides a web-based tool that enables users to copy folders between Google Drive accounts, 
            including folders from "Shared with Me" to personal or organizational drives. The service operates within 
            Google's API limitations and quotas.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Registration</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must authenticate using a valid Google account</li>
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for maintaining account security</li>
            <li>You must be at least 18 years old to use this service</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Account Responsibilities</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are responsible for all activities under your account</li>
            <li>You must notify us immediately of any unauthorized use</li>
            <li>We are not liable for any loss from unauthorized account use</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Acceptable Use Policy</h2>
          <p>You agree NOT to use DriveCloner to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate any laws or regulations</li>
            <li>Copy copyrighted content without authorization</li>
            <li>Distribute malware, viruses, or harmful code</li>
            <li>Attempt to circumvent Google Drive quotas or limitations</li>
            <li>Access or copy files you don't have permission to access</li>
            <li>Engage in any activity that disrupts or interferes with the service</li>
            <li>Resell, redistribute, or sublicense the service</li>
            <li>Use the service for illegal or unauthorized purposes</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Service Limitations</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Google API Limitations</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maximum 750GB transfer per 24 hours per Google account</li>
            <li>Rate limits on API requests as imposed by Google</li>
            <li>Service availability subject to Google Drive API availability</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Service Availability</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>We strive for 99.9% uptime but do not guarantee uninterrupted service</li>
            <li>We may perform maintenance with or without notice</li>
            <li>Service may be temporarily unavailable due to technical issues</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Pricing and Payment</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Credits System</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Services are provided on a credit-based system</li>
            <li>1 credit = 1 GB of data transfer</li>
            <li>Credits are deducted after successful transfer completion</li>
            <li>Free tier includes 10GB of transfer credits</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Payments</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>All payments are processed through Stripe</li>
            <li>Prices are in USD unless otherwise specified</li>
            <li>Credits are non-refundable except as required by law</li>
            <li>We reserve the right to change prices with 30 days notice</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Our Property</h3>
          <p>
            All rights, title, and interest in DriveCloner, including all software, text, images, and trademarks, 
            are owned by Affix LLC. You may not copy, modify, or reverse engineer any part of our service.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">7.2 Your Content</h3>
          <p>
            You retain all rights to your Google Drive content. We do not claim ownership of any files you copy 
            using our service. You grant us only the minimal permissions necessary to provide the service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Privacy and Data Protection</h2>
          <p>
            Your use of DriveCloner is also governed by our Privacy Policy. We do not access or store the contents 
            of your files. We only process metadata necessary to perform copy operations.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Disclaimers and Limitations of Liability</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">9.1 Service Provided "As Is"</h3>
          <p>
            DRIVECLONER IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR 
            IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
            AND NON-INFRINGEMENT.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">9.2 Limitation of Liability</h3>
          <p>
            IN NO EVENT SHALL AFFIX LLC BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE 
            DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, 
            RESULTING FROM YOUR USE OF THE SERVICE.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">9.3 Maximum Liability</h3>
          <p>
            OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE 
            EVENT GIVING RISE TO LIABILITY.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Affix LLC, its officers, directors, employees, and agents, 
            from any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from 
            your use of the service or violation of these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Termination</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">11.1 By You</h3>
          <p>You may terminate your account at any time by contacting support or using account settings.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">11.2 By Us</h3>
          <p>
            We may suspend or terminate your account immediately for violations of these Terms or for any other 
            reason at our sole discretion.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">11.3 Effect of Termination</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your right to use the service ceases immediately</li>
            <li>Unused credits are non-refundable</li>
            <li>We may delete your account data after 30 days</li>
            <li>Provisions that should survive termination will remain in effect</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Dispute Resolution</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">12.1 Governing Law</h3>
          <p>
            These Terms shall be governed by the laws of the State of Wyoming, United States, without regard to 
            its conflict of law provisions.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">12.2 Arbitration</h3>
          <p>
            Any dispute arising from these Terms shall be resolved through binding arbitration in accordance with 
            the rules of the American Arbitration Association. The arbitration shall take place in Wyoming.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of material changes via 
            email or through the service. Your continued use after such modifications constitutes acceptance of the 
            updated Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">14. General Provisions</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">14.1 Entire Agreement</h3>
          <p>These Terms constitute the entire agreement between you and Affix LLC regarding DriveCloner.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">14.2 Severability</h3>
          <p>
            If any provision of these Terms is found to be unenforceable, the remaining provisions will continue 
            in full force and effect.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">14.3 Waiver</h3>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">14.4 Assignment</h3>
          <p>
            You may not assign or transfer these Terms. We may assign our rights to any of our affiliates or successors.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">15. Contact Information</h2>
          <div className="bg-gray-100 p-6 rounded-lg mt-6">
            <p className="font-semibold">Affix LLC</p>
            <p>30 N Gould St Ste R</p>
            <p>Sheridan, WY 82801</p>
            <p>United States</p>
            <p className="mt-4">
              <strong>Email:</strong> legal@copygdrive.com<br />
              <strong>Website:</strong> https://copygdrive.com
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500">
            By using DriveCloner, you acknowledge that you have read, understood, and agree to be bound by these 
            Terms of Service.
          </p>
        </div>
      </div>
    </div>
  )
}