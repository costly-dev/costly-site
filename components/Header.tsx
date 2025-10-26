"use client"

import { useEffect, useState } from "react"

interface HeaderProps {
  onWaitlistClick: () => void
  onNavigate: (section: string) => void
  activeSection: string
  isLoaded?: boolean
}

export default function Header({ onWaitlistClick, onNavigate, activeSection, isLoaded = false }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [iconPositions, setIconPositions] = useState<Record<string, number>>({})

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    const calculateIconPositions = () => {
      const positions: Record<string, number> = {}
      const sections = ['home', 'about', 'roadmap', 'contact']
      
      // Find the nav element
      const nav = document.querySelector('nav') as HTMLElement
      if (!nav) {
        return
      }
      
      const navRect = nav.getBoundingClientRect()
      const navCenter = navRect.left + navRect.width / 2
      
      sections.forEach((section) => {
        const button = document.querySelector(`[data-section="${section}"]`) as HTMLElement
        if (button) {
          const buttonRect = button.getBoundingClientRect()
          const buttonCenter = buttonRect.left + buttonRect.width / 2
          const position = buttonCenter - navCenter
          positions[section] = position
        }
      })
      
      // Only update positions if we found all sections
      if (Object.keys(positions).length === 4) {
        setIconPositions(positions)
      }
    }

    window.addEventListener("scroll", handleScroll)
    
    // Calculate positions after component mounts and on resize
    setTimeout(calculateIconPositions, 100)
    setTimeout(calculateIconPositions, 500)
    setTimeout(calculateIconPositions, 1000)
    
    window.addEventListener("resize", calculateIconPositions)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", calculateIconPositions)
    }
  }, [])

  const getBackgroundPosition = (section: string) => {
    // Use the actual calculated positions of the icons
    const position = iconPositions[section]
    
    // Fallback to reasonable values if positions aren't calculated yet
    if (position === undefined) {
      const fallbacks: Record<string, number> = {
        'home': -78,
        'about': -26,
        'roadmap': 26,
        'contact': 78
      }
      return fallbacks[section] || 0
    }
    
    return position
  }

  return(
    <header
      className={`fixed top-5 left-2 sm:left-4 right-2 sm:right-4 z-50 liquid-glass liquid-glass-interactive fixed rounded-xl sm:rounded-2xl transition-all duration-300 ${
        isSticky ? "shadow-lg" : ""
      } ${
        isLoaded 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-2 opacity-0'
      }`}
    >
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/icon.png"
              alt="Costly Logo"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="hidden sm:inline text-lg sm:text-xl font-bold text-silver-300">Costly</span>
          </div>

          {/* Unified navigation with icons - absolutely centered */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-3 lg:gap-5 xl:gap-6">
            {/* Swiping background */}
            <div 
              className="absolute bg-white/20 rounded-lg transition-transform duration-500 ease-out pointer-events-none"
              style={{
                width: '40px',
                height: '40px',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translateX(${getBackgroundPosition(activeSection)}px)`
              }}
            />
            <button
              onClick={() => onNavigate("home")}
              className={`p-2 rounded-lg transition-all duration-300 ease-out transform relative z-10 ${activeSection === "home" ? "text-white scale-105" : "text-white/70 hover:text-white hover:scale-105"}`}
              title="Home"
              data-section="home"
            >
              <svg className="w-5 h-5 transition-all duration-300 ease-out" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </button>
            <button
              onClick={() => onNavigate("about")}
              className={`p-2 rounded-lg transition-all duration-300 ease-out transform relative z-10 ${activeSection === "about" ? "text-white scale-105" : "text-white/70 hover:text-white hover:scale-105"}`}
              title="About"
              data-section="about"
            >
              <svg className="w-5 h-5 transition-all duration-300 ease-out" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </button>
            <button
              onClick={() => onNavigate("roadmap")}
              className={`p-2 rounded-lg transition-all duration-300 ease-out transform relative z-10 ${activeSection === "roadmap" ? "text-white scale-105" : "text-white/70 hover:text-white hover:scale-105"}`}
              title="Roadmap"
              data-section="roadmap"
            >
              <svg className="w-5 h-5 transition-all duration-300 ease-out" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className={`p-2 rounded-lg transition-all duration-300 ease-out transform relative z-10 ${activeSection === "contact" ? "text-white scale-105" : "text-white/70 hover:text-white hover:scale-105"}`}
              title="Contact"
              data-section="contact"
            >
              <svg className="w-5 h-5 transition-all duration-300 ease-out" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </button>
          </nav>

          {/* Waitlist button */}
          <button
            onClick={onWaitlistClick}
            className="liquid-glass-button text-white px-4 sm:px-6 py-2 rounded-full font-medium text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Waitlist Sign Up</span>
            <span className="sm:hidden">Join</span>
          </button>
        </div>
      </div>
    </header>
  )
}
