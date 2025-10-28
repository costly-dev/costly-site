"use client"

import { useState, useEffect, useRef } from "react"

interface AboutProps {}

export default function About({}: AboutProps) {
  const [activeCard, setActiveCard] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedHeader, setAnimatedHeader] = useState(false)
  const [headerFade, setHeaderFade] = useState(false)
  const [isPhilosophyComplete, setIsPhilosophyComplete] = useState(false)
  const [hasArrowFaded, setHasArrowFaded] = useState(false)
  const [isPhase2, setIsPhase2] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)

  const cards = [
    {
      title: "A system that makes distraction expensive and progress rewarding",
      content: (
        <div>
          <p className="text-white/90 leading-relaxed mb-6 text-base sm:text-lg md:text-xl">
            When you start a focus session, you stake a small deposit from your Costly balance. As long as you stay off your blocked apps and remain active within your timer, your deposit remains untouched and continues to grow in value inside your account.
          </p>
          <p className="text-white/90 leading-relaxed text-base sm:text-lg md:text-xl">
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
        <div>
          <p className="text-white/90 leading-relaxed mb-6 text-base sm:text-lg md:text-xl">
            Costly uses a secure, cloud-synced architecture powered by Convex for real-time data synchronization across all your devices. Cross-device syncing ensures your focus sessions, penalties, and progress are instantly updated whether you're on your phone, tablet, or computer.
          </p>
          <p className="text-white/90 leading-relaxed mb-6 text-base sm:text-lg md:text-xl">
            Financial transactions are handled through Stripe and Plaid integration, providing bank-level security for deposits and penalty charges. Alpaca Markets integration enables your deposits to grow through low-risk investments, turning your focus sessions into a genuine wealth-building mechanism.
          </p>
          <p className="text-white/90 leading-relaxed text-base sm:text-lg md:text-xl">
            App blocking is handled natively through Apple's FamilyControls and ManagedSettings frameworks, meaning blocked apps are truly restricted during active sessions—no workarounds, no exceptions.
          </p>
        </div>
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
        <div>
          <p className="text-white/90 leading-relaxed mb-6 text-base sm:text-lg md:text-xl">
            The app's interface follows a Liquid Glass design language: a monochrome interface with subtle colors and a dark, reflective silver aesthetic inspired by composure and clarity. Every element is built for quiet immersion: rounded cards, subtle blurs, ambient reflections, and smooth transitions that make the UI feel alive but not distracting.
          </p>
          <p className="text-white/90 leading-relaxed text-base sm:text-lg md:text-xl">
            The minimal design philosophy extends to every interaction—no unnecessary animations, no distracting colors, no visual noise. Just clean, purposeful interfaces that fade into the background while you focus on what matters most.
          </p>
        </div>
      ),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: "Coming soon: Multiplayer accountability",
      content: (
        <div>
          <p className="text-white/90 leading-relaxed mb-6 text-base sm:text-lg md:text-xl">
            The future of focus includes multiplayer accountability with friends and family. Share focus sessions, create group challenges, and build supportive communities around productivity. When you're struggling to stay focused, your accountability partners can provide gentle encouragement or even help cover penalty costs.
          </p>
          <p className="text-white/90 leading-relaxed mb-6 text-base sm:text-lg md:text-xl">
            Family members can create shared focus goals, track each other's progress, and celebrate milestones together. Friends can form focus groups for study sessions, work sprints, or creative projects. The social element transforms individual discipline into collective achievement.
          </p>
          <p className="text-white/90 leading-relaxed text-base sm:text-lg md:text-xl">
            Additional features in development include advanced analytics, custom penalty structures, integration with productivity tools, and AI-powered focus coaching based on your behavioral patterns.
          </p>
        </div>
      ),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
        </svg>
      )
    }
  ]

  // Check localStorage on component mount and listen for philosophy completion
  useEffect(() => {
    const cachedGenerated = localStorage.getItem('philosophy-generated')
    if (cachedGenerated === 'true') {
      setIsPhilosophyComplete(true)
      setIsPhase2(true) // If already generated, go straight to phase 2
    }
    
    // Listen for philosophy completion from parent
    const handlePhilosophyComplete = () => {
      setIsPhilosophyComplete(true)
      // Move to phase 2 if arrow has already faded
      if (hasArrowFaded) {
        setIsPhase2(true)
      }
    }
    
    // Listen for arrow fade from philosophy component
    const handleArrowFade = () => {
      setHasArrowFaded(true)
      // Move to phase 2 if philosophy is already complete
      if (isPhilosophyComplete) {
        setIsPhase2(true)
      }
    }
    
    // Listen for notification completion to trigger icons fade-in
    const handleNotificationComplete = () => {
      setIsPhase2(true) // Immediately show About icons when notification fades out
    }
    
    window.addEventListener('philosophy-complete', handlePhilosophyComplete)
    window.addEventListener('arrow-fade', handleArrowFade)
    window.addEventListener('philosophy-notification-complete', handleNotificationComplete)
    
    return () => {
      window.removeEventListener('philosophy-complete', handlePhilosophyComplete)
      window.removeEventListener('arrow-fade', handleArrowFade)
      window.removeEventListener('philosophy-notification-complete', handleNotificationComplete)
    }
  }, [isPhilosophyComplete])

  // No auto-centering or scroll lock - users can scroll freely

  // Handle user scrolling detection for auto-scroll pause
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
          // User can scroll freely - no centering cancellation needed
          
          // Check if header is getting covered during auto-scroll
          const aboutSection = document.getElementById('about')
          if (aboutSection) {
            const headerElement = aboutSection.querySelector('header')
            if (headerElement) {
              const headerRect = headerElement.getBoundingClientRect()
              const isHeaderCovered = headerRect.top < 80 // Fade when header is within 80px of top
              setHeaderFade(isHeaderCovered)
            }
          }
        }
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-rotation effect removed - users can manually navigate cards

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

  // Check if About section is in view and handle scroll-based card selection
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight && rect.bottom > 0
        
        // Handle fade in/out animations
        setIsVisible(isInView)
        
        // Track when user scrolls to About section - no longer needed
        
        // Handle header animation
        if (isInView) {
          // Animate header first
          setAnimatedHeader(true)
          
          // Check if header is getting covered by checking scroll position
          const headerElement = aboutSection.querySelector('header')
          if (headerElement) {
            const headerRect = headerElement.getBoundingClientRect()
            const isHeaderCovered = headerRect.top < 100 // Fade when header is within 100px of top
            setHeaderFade(isHeaderCovered)
          }
          
          // No auto-centering - users can scroll freely
        } else {
          // Reset header animation when leaving view
          setAnimatedHeader(false)
          // Don't reset hasAutoCentered - only reset on page load or explicit navigation
        }
        
      }

      // Auto-detect which card should be active based on scroll position
      if (scrollContainerRef.current && !isScrolling) {
        const container = scrollContainerRef.current
        const scrollTop = container.scrollTop
        const cardHeight = container.scrollHeight / cards.length
        const newActiveCard = Math.round(scrollTop / cardHeight)
        
        if (newActiveCard !== activeCard && newActiveCard >= 0 && newActiveCard < cards.length) {
          setActiveCard(newActiveCard)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolling, activeCard, cards.length])

  return (
    <>
      {/* Mobile-specific animations */}
      <style jsx>{`
        @keyframes mobileCardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes mobileIconPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        
        @keyframes mobileTitleGlow {
          0%, 100% { 
            opacity: 0.9;
          }
          50% { 
            opacity: 1;
          }
        }
        
        
        @keyframes mobileDotPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
      
      <section ref={sectionRef} id="about" className="pt-4 pb-20 sm:pt-8 sm:pb-24 lg:pt-12 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <header className={`text-center mb-6 transition-all duration-700 ${
          // Phase 1: Invisible but present until philosophy complete and arrow faded
          !isPhase2 
            ? 'opacity-0 translate-y-8 scale-95' 
            : // Phase 2: Fade in when scrolled to, fade out when header covered
            animatedHeader 
              ? 'translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
        } ${headerFade ? 'opacity-0 scale-95' : isPhase2 ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            How It Works
          </h3>
        </header>
        
        {/* Card selector - hidden on mobile */}
        <div className={`hidden sm:flex justify-center gap-4 sm:gap-6 mb-6 flex-wrap transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => {
                {
                  setActiveCard(index)
                }
              }}
              className={`liquid-glass-button px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                activeCard === index 
                  ? "bg-white/20 text-white scale-110" 
                  : "text-white/70 hover:text-white hover:scale-105"
              }`}
            >
              {card.icon}
              <span className="text-xs sm:text-sm">
                {index === 0 ? "System" : index === 1 ? "Technology" : index === 2 ? "Design" : "Future"}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile: Enhanced animated cards with cool effects */}
        <div className="sm:hidden space-y-16">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={{ 
                animationDelay: `${index * 500}ms`,
                animation: isVisible ? `mobileCardFloat ${5 + index * 0.5}s ease-in-out infinite` : 'none',
                willChange: isVisible ? 'transform' : 'auto'
              }}
            >
              <div className="w-full max-w-4xl mx-auto">
                {/* Animated icon container */}
                <div 
                  className="flex justify-center mb-6"
                  style={{
                    animation: isVisible ? `mobileIconPulse ${4 + index * 0.3}s ease-in-out infinite` : 'none',
                    willChange: isVisible ? 'transform' : 'auto'
                  }}
                >
                  <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="text-white/80 text-2xl">
                      {card.icon}
                    </div>
                  </div>
                </div>
                
                {/* Animated title with gradient text */}
                <h3 
                  className="text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed mb-8 text-center bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent"
                  style={{
                    animation: isVisible ? `mobileTitleGlow ${6 + index * 0.5}s ease-in-out infinite` : 'none',
                    willChange: isVisible ? 'opacity' : 'auto'
                  }}
                >
                  {card.title}
                </h3>
                
                {/* Animated content with staggered text reveal */}
                <div className="text-center">
                  <div className="space-y-4">
                    {Array.isArray(card.content.props.children) ? (
                      card.content.props.children.map((paragraph: React.ReactNode, pIndex: number) => (
                        <div 
                          key={pIndex}
                          className={`text-white/90 leading-relaxed text-base sm:text-lg md:text-xl transition-all duration-500 ${
                            isVisible 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 translate-x-8'
                          }`}
                          style={{ 
                            transitionDelay: `${(index * 300) + (pIndex * 200)}ms`
                          }}
                        >
                          {paragraph}
                        </div>
                      ))
                    ) : (
                      <div
                        className={`text-white/90 leading-relaxed text-base sm:text-lg md:text-xl transition-all duration-500 ${
                          isVisible 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 translate-x-8'
                        }`}
                        style={{ 
                          transitionDelay: `${index * 300}ms`
                        }}
                      >
                        {card.content}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Animated progress indicator */}
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    {cards.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          dotIndex === index 
                            ? 'bg-white/60 scale-125' 
                            : 'bg-white/20'
                        }`}
                        style={{
                          animation: isVisible && dotIndex === index 
                            ? `mobileDotPulse 2s ease-in-out infinite` 
                            : 'none',
                          willChange: isVisible && dotIndex === index ? 'transform' : 'auto'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Roulette-style scrolling container */}
        <div className={`hidden sm:block relative h-[700px] sm:h-[600px] lg:h-[500px] overflow-hidden transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {/* Fade gradients */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling content */}
          <div 
            ref={scrollContainerRef}
            className="h-full overflow-y-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={() => {
              if (scrollContainerRef.current && !isScrolling) {
                const container = scrollContainerRef.current
                const scrollTop = container.scrollTop
                const cardHeight = container.scrollHeight / cards.length
                const newActiveCard = Math.round(scrollTop / cardHeight)
                
                if (newActiveCard !== activeCard && newActiveCard >= 0 && newActiveCard < cards.length) {
                  setActiveCard(newActiveCard)
                }
                
                // Card selection logic only - no centering lock
              }
            }}
          >
            <div className="space-y-0">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="h-[700px] sm:h-[600px] lg:h-[500px] flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-8 sm:pt-12 lg:pt-16"
                >
                  <div className="w-full max-w-4xl">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed mb-8 text-center">
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
    </>
  )
}
