"use client"

interface HeaderProps {
  onWaitlistClick: () => void
  onNavigate: (section: string) => void
}

export default function Header({ onWaitlistClick, onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-PS4vPKIEDNGx8DaZnerSDvbFjF5DZH.png"
              alt="Costly Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-yellow-400">Costly</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate("home")} className="text-white hover:text-yellow-400 transition-colors">
              Home
            </button>
            <button onClick={() => onNavigate("about")} className="text-white hover:text-yellow-400 transition-colors">
              About
            </button>
            <button
              onClick={() => onNavigate("roadmap")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Roadmap
            </button>
          </nav>

          <button
            onClick={onWaitlistClick}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-300 transition-colors"
          >
            Waitlist Sign Up
          </button>
        </div>
      </div>
    </header>
  )
}
