"use client"

import { useEffect, useState } from "react"

interface HeaderProps {
  onWaitlistClick: () => void
  onNavigate: (section: string) => void
  activeSection: string
}

export default function Header({ onWaitlistClick, onNavigate, activeSection }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return(
    <header
      className={`fixed top-2.5 left-4 right-4 z-50 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl transition-all duration-300 ${isSticky ? "" : ""}`}
    >
      <div className="px-6 py-4"> {/* REMOVED max-w-7xl mx-auto */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-PS4vPKIEDNGx8DaZnerSDvbFjF5DZH.png"
              alt="Costly Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-yellow-400">Costly</span>
          </div>

          {/* Center navigation with absolute positioning */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => onNavigate("home")}
              className={`text-white hover:text-yellow-400 transition-colors ${activeSection === "home" ? "border-b-2 border-yellow-400" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate("about")}
              className={`text-white hover:text-yellow-400 transition-colors ${activeSection === "about" ? "border-b-2 border-yellow-400" : ""}`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate("roadmap")}
              className={`text-white hover:text-yellow-400 transition-colors ${activeSection === "roadmap" ? "border-b-2 border-yellow-400" : ""}`}
            >
              Roadmap
            </button>
          </nav>

          <button
            onClick={onWaitlistClick}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-300 transition-colors backdrop-blur-md"
          >
            Waitlist Sign Up
          </button>
        </div>
      </div>
    </header>
  )
}
