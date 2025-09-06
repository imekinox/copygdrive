import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DriveCloner - Copy Google Drive Folders Including Shared with Me",
  description: "The only tool that lets you copy entire folder structures from Google Drive shared folders to your own Drive. Perfect for migrating data from contractors, backing up shared folders, and consolidating team files. Copy up to 750GB per day.",
  keywords: "google drive copy folder, copy shared with me folder, google drive folder migration, copy google drive shared folder, google drive backup shared folders, migrate google drive data, copy folders between google drives, google drive bulk copy, transfer shared google drive folders, google drive folder cloner",
  authors: [{ name: "DriveCloner" }],
  openGraph: {
    title: "DriveCloner - Copy Any Google Drive Folder Including Shared Folders",
    description: "Finally copy entire folder structures from Google Drive shared folders. Perfect for enterprises migrating contractor data, educational institutions archiving course materials, and teams consolidating files.",
    url: "https://drivecloner.com",
    siteName: "DriveCloner",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DriveCloner - Google Drive Folder Copying Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DriveCloner - Copy Google Drive Folders & Shared Folders",
    description: "The missing tool for Google Drive folder operations. Copy shared folders, preserve structure, handle thousands of files.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://drivecloner.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3b82f6" />
        
        {/* Additional SEO meta tags */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        
        {/* Schema.org markup for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "DriveCloner",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Web",
              "description": "Copy entire folder structures from Google Drive shared folders to your own Drive or organization's Shared Drives",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127"
              },
              "featureList": [
                "Copy Shared with Me folders",
                "Preserve folder structure",
                "Handle large volumes (750GB/day)",
                "Smart rate limiting",
                "Real-time progress tracking",
                "Secure OAuth integration"
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}