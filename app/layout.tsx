import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import PhoneZoomContainer from "./PhoneZoomContainer.tsx" // ← Add this
import "./globals.css"

export const metadata: Metadata = {
  title: "Costly - Financial Deterrent for Distractions",
  description: "Build tolerance to your impulses, urges and distractions with financial consequences.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-PS4vPKIEDNGx8DaZnerSDvbFjF5DZH.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Londrina+Shadow&family=Patrick+Hand+SC&display=swap"
          rel="stylesheet"
        />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>

          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        
        <Analytics />
      </body>
    </html>
  )
}
