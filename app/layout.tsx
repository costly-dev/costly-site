import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Costly - Bet Against Addiction | Behavioral Accountability App for iPhone & Mac",
    template: "%s | Costly - Bet Against Addiction"
  },
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
    "PCI DSS compliance",
    "productivity app",
    "focus timer",
    "accountability software",
    "iOS app",
    "macOS app",
    "digital wellness",
    "focus management",
    "habit tracking",
    "self-discipline app",
    "tally",
    "tally.",
    "tally instagram",
    "Ycombinator",
    "YC",
    "startups",
    "start ups",
    "block",
    "bet on yourself",
    "gooning",
    "points",
    "betting",
    "penalty",
    "looksmaxxing",
    "looksmaxing",
    "locked in",
    "locked",
    "screen time",
    "investments",
    "stocks",
    "trading",
    "self improvement",
    "money",
    "saas",
    "discipline",
    "right",
    "stop distractions",
    "gambling",
    "winning",
    "live",
    "alive",
    "maxxing",
    "grind",
    "skills",
    "grow"
  ],
  authors: [{ name: "Costly Team", url: "https://www.costly.live" }],
  creator: "Costly",
  publisher: "Costly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.costly.live"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Costly - Bet Against Addiction | Behavioral Accountability App",
    description: "Behavioral accountability app for iPhone and Mac that connects your focus to real, measurable stakes. Native app blocking, penalty system, and streak tracking.",
    url: "https://www.costly.live",
    siteName: "Costly",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Costly App - Bet Against Addiction - Behavioral Accountability App for iPhone and Mac",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Costly - Bet Against Addiction",
    description: "Behavioral accountability app for iPhone and Mac. Connect your focus to real stakes with native app blocking and penalty system.",
    images: ["/icon.png"],
    creator: "@costlyapp",
    site: "@costlyapp",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  classification: "Productivity Application",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Costly",
    "mobile-web-app-capable": "yes",
    "theme-color": "#000000",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/icon.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Load only core UI font eagerly; defer decorative fonts to after load */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Non-critical decorative fonts can be loaded late if needed */}
        <link
          id="font-londrina"
          href="https://fonts.googleapis.com/css2?family=Londrina+Shadow&display=swap"
          rel="stylesheet"
          media="print"
        />
        <Script id="enable-londrina-after-load" strategy="afterInteractive">
{`(function(){
  var l = document.getElementById('font-londrina');
  if(l){ l.media = 'all'; }
})();`}
        </Script>
        {/* Preload critical images (use compressed for faster LCP) */}
        <link rel="preload" as="image" href="/GraphicsNotif_upscaled_compressed.jpg" />
        <link rel="preload" as="image" href="/icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Costly",
              "alternateName": "Bet Against Addiction",
              "description": "Behavioral accountability app for iPhone and Mac that connects your focus to real, measurable stakes. Native app blocking via FamilyControls with penalty system and streak tracking.",
              "url": "https://www.costly.live",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": ["iOS", "macOS"],
              "softwareVersion": "1.0.0",
              "datePublished": "2024-01-15",
              "dateModified": new Date().toISOString().split('T')[0],
              "offers": {
                "@type": "Offer",
                "price": "2.99",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "RecurringPaymentsPriceSpecification",
                  "billingDuration": "P1M",
                  "billingIncrement": 1
                },
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-15"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Organization",
                "name": "Costly Team",
                "url": "https://costly.live"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Costly",
                "url": "https://costly.live"
              },
              "keywords": "behavioral accountability, focus app, iPhone productivity, Mac productivity, FamilyControls, app blocking, penalty system, streak tracking, liquid glass design, subscription app, digital wellness, habit tracking, self-discipline",
              "screenshot": "/icon.png",
              "featureList": [
                "Native app blocking via FamilyControls",
                "Penalty system with real stakes",
                "Streak tracking and rewards",
                "Tamper-proof enforcement",
                "Secure payment integration",
                "Cross-device synchronization",
                "Liquid glass design",
                "Biometric authentication"
              ],
              "softwareRequirements": "iOS 15.0+ or macOS 12.0+",
              "memoryRequirements": "100 MB",
              "storageRequirements": "200 MB",
              "permissions": "FamilyControls, Biometric Authentication, Network Access"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Costly - Bet Against Addiction",
              "url": "https://www.costly.live",
              "description": "Official website for Costly, the behavioral accountability app that connects your focus to real, measurable stakes.",
              "publisher": {
                "@type": "Organization",
                "name": "Costly Team"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.costly.live",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Costly Team",
              "url": "https://www.costly.live",
              "logo": "https://www.costly.live/icon.png",
              "description": "The team behind Costly, a behavioral accountability app for iPhone and Mac.",
              "foundingDate": "2024",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://www.costly.live"
              }
            })
          }}
        />
      </head>
      <body className="bg-black">

          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
