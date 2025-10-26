import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coming Soon | Costly",
  description: "This service is coming soon. Stay tuned for updates!",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/icon.png"
            alt="Costly Logo"
            className="w-16 h-16 mx-auto"
          />
        </div>

        {/* Coming Soon Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            This service is temporarily unavailable. We're working hard to bring you something amazing.
          </p>
          <p className="text-white/50 text-sm">
            Please check back later for updates.
          </p>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 backdrop-blur-md shadow-lg liquid-glass-button text-white shimmer shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)]"
          >
            ← Back to Home
          </a>
        </div>

        {/* Status Code */}
        <div className="mt-12 text-white/30 text-xs">
          Service Unavailable (503)
        </div>
      </div>
    </div>
  )
}
