import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FolderSync, Shield, Lock, Key, Server, Eye, AlertTriangle, CheckCircle } from "lucide-react"

export default function SecurityPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Security at DriveCloner</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            At DriveCloner, security is our top priority. We implement industry-standard security measures to protect 
            your data and ensure the safe operation of our service. This page outlines our comprehensive security practices.
          </p>

          {/* Security Overview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Security First Approach</h2>
                <p className="text-gray-700">
                  DriveCloner is designed with security at its core. We never store your files, passwords, or sensitive 
                  data. All operations are performed directly through secure Google APIs.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Authentication & Authorization</h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <Key className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h3 className="font-semibold">OAuth 2.0 Authentication</h3>
                <p>We use Google's OAuth 2.0 for authentication. You sign in directly with Google - we never see or store your Google password.</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h3 className="font-semibold">Minimal Permissions</h3>
                <p>We request only the minimum Google Drive permissions necessary to perform copy operations. We cannot delete or modify your original files.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h3 className="font-semibold">Token Security</h3>
                <p>OAuth tokens are encrypted using AES-256 encryption before storage and are automatically refreshed to maintain security.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Data Protection</h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-green-900 mb-3">What We DON'T Access or Store:</h3>
            <ul className="list-disc pl-6 space-y-2 text-green-800">
              <li>Content of your files</li>
              <li>Your Google account password</li>
              <li>Personal documents or sensitive data</li>
              <li>Files on our servers (all operations are direct Google-to-Google)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <Server className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h3 className="font-semibold">No File Storage</h3>
                <p>Files are never stored on our servers. All copy operations happen directly between Google Drive locations using Google's APIs.</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Eye className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <h3 className="font-semibold">Metadata Only</h3>
                <p>We only process file and folder metadata (names, sizes, structure) necessary to perform copy operations. We cannot read file contents.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Infrastructure Security</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Encryption in Transit</h3>
              <p className="text-gray-600">All data transmitted between your browser and our servers uses TLS 1.3 encryption.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Encryption at Rest</h3>
              <p className="text-gray-600">All stored data, including encrypted OAuth tokens, uses AES-256 encryption.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Secure Hosting</h3>
              <p className="text-gray-600">Hosted on Cloudflare's secure infrastructure with DDoS protection and global CDN.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Regular Updates</h3>
              <p className="text-gray-600">All dependencies and security patches are regularly updated and monitored.</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Access Controls</h2>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Role-Based Access:</strong> Internal access follows principle of least privilege</li>
            <li><strong>Audit Logging:</strong> All administrative actions are logged and monitored</li>
            <li><strong>Multi-Factor Authentication:</strong> Required for all administrative access</li>
            <li><strong>Session Management:</strong> Automatic session timeout and secure session handling</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Compliance & Standards</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-semibold mb-2">GDPR Compliant</h3>
              <p className="text-sm text-gray-600">Full compliance with European data protection regulations</p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-semibold mb-2">CCPA Compliant</h3>
              <p className="text-sm text-gray-600">Respects California Consumer Privacy Act requirements</p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-semibold mb-2">SOC 2 Type II (Planned)</h3>
              <p className="text-sm text-gray-600">Working towards SOC 2 certification for enterprise customers</p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-semibold mb-2">Google API Compliance</h3>
              <p className="text-sm text-gray-600">Fully compliant with Google API Services User Data Policy</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Security Monitoring</h2>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>24/7 Monitoring:</strong> Continuous monitoring for security threats and anomalies</li>
            <li><strong>Intrusion Detection:</strong> Advanced threat detection systems in place</li>
            <li><strong>Regular Security Audits:</strong> Quarterly security assessments and penetration testing</li>
            <li><strong>Incident Response Plan:</strong> Documented procedures for security incident handling</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. User Security Best Practices</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-3">Protect Your Account</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use a strong, unique password for your Google account</li>
                  <li>Enable two-factor authentication on your Google account</li>
                  <li>Regularly review connected apps in your Google account settings</li>
                  <li>Revoke DriveCloner access if you no longer use the service</li>
                  <li>Be cautious of phishing attempts - we'll never ask for your password</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Vulnerability Disclosure</h2>
          
          <p>
            We take security vulnerabilities seriously. If you discover a security issue, please report it to our 
            security team immediately.
          </p>
          
          <div className="bg-gray-100 rounded-lg p-6 mt-4">
            <h3 className="font-semibold mb-2">Responsible Disclosure Program</h3>
            <p className="mb-3">Email: security@copygdrive.com</p>
            <p className="text-sm text-gray-600">
              Please provide detailed information about the vulnerability, steps to reproduce, and potential impact. 
              We commit to acknowledging receipt within 24 hours and providing regular updates on our investigation.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Data Breach Response</h2>
          
          <p>In the unlikely event of a data breach:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Affected users will be notified within 72 hours</li>
            <li>We will provide clear information about what data was affected</li>
            <li>We will offer guidance on protective measures to take</li>
            <li>Regulatory authorities will be notified as required by law</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Third-Party Security</h2>
          
          <p>We carefully vet all third-party services for security:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google APIs:</strong> Official Google APIs with OAuth 2.0</li>
            <li><strong>Cloudflare:</strong> Enterprise-grade hosting and security</li>
            <li><strong>Stripe:</strong> PCI-compliant payment processing</li>
            <li><strong>Auth.js:</strong> Secure authentication framework</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Our Security Team</h2>
          
          <div className="bg-gray-100 p-6 rounded-lg mt-6">
            <p className="font-semibold">Security Team - Affix LLC</p>
            <p>30 N Gould St Ste R</p>
            <p>Sheridan, WY 82801</p>
            <p>United States</p>
            <p className="mt-4">
              <strong>Security Issues:</strong> security@copygdrive.com<br />
              <strong>General Inquiries:</strong> support@copygdrive.com<br />
              <strong>Website:</strong> https://copygdrive.com
            </p>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Last Security Review:</strong> January 1, 2024<br />
              <strong>Next Scheduled Review:</strong> April 1, 2024
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500">
            This security information is provided for transparency. For detailed technical specifications or 
            enterprise security requirements, please contact our security team.
          </p>
        </div>
      </div>
    </div>
  )
}