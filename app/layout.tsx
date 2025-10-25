import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import PhoneZoomContainer from "./PhoneZoomContainer.tsx" // ← Add this
import "./globals.css"

export const metadata: Metadata = {
  title: "Costly - Focus That Counts | Behavioral Accountability App for iPhone & Mac",
  description: "Costly is a behavioral accountability app for iPhone and Mac that connects your focus to real, measurable stakes. Set your own rules, stake deposits, and build consistency through clear, immediate accountability. Native app blocking via FamilyControls.",
  keywords: [
    "costly app",
    "focus that counts",
    "behavioral accountability",
    "iPhone focus app",
    "Mac productivity app",
    "FamilyControls app blocking",
    "Stripe payment integration",
    "Convex cloud sync",
    "Clerk authentication",
    "focus session timer",
    "penalty system",
    "streak tracking",
    "accountability app",
    "focus stakes",
    "deposit system",
    "tamper-proof enforcement",
    "liquid glass design",
    "dark mode app",
    "minimalist productivity",
    "self-accountability",
    "focus rewards",
    "penalty escalation",
    "balance withdrawal",
    "subscription app",
    "premium focus tools",
    "secure focus app",
    "encrypted transactions",
    "biometric authentication",
    "double-entry ledger",
    "PCI DSS compliance"
  ],
  authors: [{ name: "Costly Team" }],
  creator: "Costly",
  publisher: "Costly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://costly-dev.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Costly - Focus That Counts",
    description: "Behavioral accountability app for iPhone and Mac that connects your focus to real, measurable stakes. Native app blocking, penalty system, and streak tracking.",
    url: "https://costly-dev.github.io",
    siteName: "Costly",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Costly App - Focus That Counts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Costly - Focus That Counts",
    description: "Behavioral accountability app for iPhone and Mac. Connect your focus to real stakes with native app blocking and penalty system.",
    images: ["/icon.png"],
    creator: "@costlyapp",
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
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/icon.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Londrina+Shadow&family=Patrick+Hand+SC&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Costly",
              "description": "Behavioral accountability app for iPhone and Mac that connects your focus to real, measurable stakes. Native app blocking via FamilyControls with penalty system and streak tracking.",
              "url": "https://costly-dev.github.io",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "iOS, macOS",
              "offers": {
                "@type": "Offer",
                "price": "2.99",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "RecurringPaymentsPriceSpecification",
                  "billingDuration": "P1M",
                  "billingIncrement": 1
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              },
              "author": {
                "@type": "Organization",
                "name": "Costly Team"
              },
              "keywords": "behavioral accountability, focus app, iPhone productivity, Mac productivity, FamilyControls, app blocking, penalty system, streak tracking, liquid glass design, subscription app",
              "screenshot": "/icon.png"
            })
          }}
        />
      </head>
      <body className={GeistSans.className}>

          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        
        <Analytics />
      </body>
    </html>
  )
}
