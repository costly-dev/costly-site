"use client"

import { useState, useEffect, useRef } from "react"

interface AboutProps {
  onNavigate?: (section: string) => void
}

export default function About({ onNavigate }: AboutProps) {
  const [activeCard, setActiveCard] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [hasAutoCentered, setHasAutoCentered] = useState(false)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const cards = [
    {
      title: "A system that makes distraction expensive and progress rewarding",
      content: (
        <div>
          <p className="text-white/90 leading-relaxed mb-6 text-lg sm:text-xl">
            When you start a focus session, you stake a small deposit from your Costly balance. As long as you stay off your blocked apps and remain active within your timer, your deposit remains untouched and continues to grow in value inside your account.
          </p>
          <p className="text-white/90 leading-relaxed text-lg sm:text-xl">
            If you break focus by opening a distraction, pausing your session, or tampering with settings, Costly instantly issues a small penalty charge via Stripe. These penalties accumulate into your in-app balance, which you can only withdraw once you've achieved specific personal goals, such as a set number of clean hours or streak days.
          </p>
        </div>
      ),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: "Built with real technology, not loopholes",
      content: (
        <p className="text-white/90 leading-relaxed text-lg sm:text-xl">
          Costly uses a secure, cloud-synced architecture powered by Convex, Clerk, Stripe, and Plaid. App blocking is handled natively through Apple's FamilyControls and ManagedSettings frameworks, meaning blocked apps are truly restricted during active sessions.
        </p>
      ),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: "Minimalist by design",
      content: (
        <p className="text-white/90 leading-relaxed text-lg sm:text-xl">
          The app's interface follows a Liquid Glass design language: a dark, reflective silver aesthetic inspired by composure and clarity. Every element is built for quiet immersion: rounded cards, subtle blurs, ambient reflections, and smooth transitions that make the UI feel alive but not distracting.
        </p>
      ),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
      )
    }
  ]

  // Auto-center when landing on About section and handle scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const section = sectionRef.current
      
      if (section) {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight
        const viewportHeight = window.innerHeight
        const scrollPosition = currentScrollY + viewportHeight / 2
        
        // Check if we're in the About section
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          // Auto-center on first visit
          if (!hasAutoCentered) {
            setHasAutoCentered(true)
            const targetScrollPosition = sectionTop + (sectionBottom - sectionTop) / 2 - viewportHeight / 2
            
            window.scrollTo({
              top: Math.max(0, targetScrollPosition),
              behavior: "smooth"
            })
          }
          
          // Detect user scrolling and pause auto-scroll
          const scrollDelta = Math.abs(currentScrollY - lastScrollY.current)
          if (scrollDelta > 5) { // Threshold to detect intentional scrolling
            setIsUserScrolling(true)
            
            // Clear existing timeout
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current)
            }
            
            // Resume auto-scroll after user stops scrolling
            scrollTimeoutRef.current = setTimeout(() => {
              setIsUserScrolling(false)
            }, 1000) // Resume after 1 second of no scrolling
          }
        }
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasAutoCentered])

  // Auto-rotation effect with continuous downward scrolling
  useEffect(() => {
    if (!isPaused && !isScrolling && !isUserScrolling) {
      intervalRef.current = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % cards.length)
      }, 4000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, isScrolling, isUserScrolling, cards.length])

  // Simple scroll to active card
  useEffect(() => {
    if (scrollContainerRef.current) {
      setIsScrolling(true)
      const container = scrollContainerRef.current
      const cardHeight = container.scrollHeight / cards.length
      
      // Calculate target scroll position
      let targetScroll = activeCard * cardHeight
      
      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })
      
      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 800)
    }
  }, [activeCard, cards.length])

  // Check if About section is in view
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight && rect.bottom > 0
        
        if (!isInView && isPaused) {
          setIsPaused(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isPaused])

  return (
    <section ref={sectionRef} id="about" className="pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <header className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Discover how Costly transforms your focus into measurable progress through behavioral accountability
          </p>
        </header>
        
        {/* Card selector */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveCard(index)
                setIsPaused(true)
              }}
              className={`liquid-glass-button px-4 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                activeCard === index 
                  ? "bg-white/20 text-white" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              {card.icon}
              <span className="text-sm sm:text-base">
                {index === 0 ? "System" : index === 1 ? "Technology" : "Design"}
              </span>
            </button>
          ))}
        </div>

        {/* Roulette-style scrolling container */}
        <div className="relative h-[700px] sm:h-[600px] lg:h-[500px] overflow-hidden">
          {/* Fade gradients */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling content */}
          <div 
            ref={scrollContainerRef}
            className="h-full overflow-y-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="space-y-0">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="h-[700px] sm:h-[600px] lg:h-[500px] flex items-center justify-center p-4 sm:p-6 lg:p-8"
                >
                  <div className="w-full max-w-4xl">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-relaxed mb-8 text-center">
                      {card.title}
                    </h3>
                    <div className="text-center">
                      {card.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
