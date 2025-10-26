"use client"

import { useState, useEffect, useRef } from "react"

interface PhilosophyProps {
  onComplete?: () => void
}

export default function Philosophy({ onComplete }: PhilosophyProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [showArrow, setShowArrow] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const lockedScrollPosition = useRef(0)

  const fullText = "Every minute of discipline strengthens your streak, while every lapse comes with a small, automatic financial consequence. By turning focus into something tangible, Costly helps you build consistency not through guilt or gamification, but through clear, immediate accountability. It's self-accountability made concrete: lose focus, lose a dollar; stay disciplined, reclaim your balance and your confidence. The stakes are real: if you delete the app before meeting your withdrawal goals, you forfeit your accumulated balance. This isn't a penalty—it's the natural consequence of abandoning your commitment to yourself. Your money stays locked until you prove you can maintain the habits you set out to build."

  // Check localStorage on component mount
  useEffect(() => {
    const cachedGenerated = localStorage.getItem('philosophy-generated')
    if (cachedGenerated === 'true') {
      setDisplayedText(fullText)
      setHasGenerated(true)
    }
  }, [fullText])

  // Handle scroll-based typing and scroll locking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const section = sectionRef.current
      
      // Detect user scrolling and hide arrow
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current)
      if (scrollDelta > 5 && showArrow) {
        setShowArrow(false)
        // Dispatch event for About component
        window.dispatchEvent(new CustomEvent('arrow-fade'))
      }
      
      if (section) {
        const sectionTop = section.offsetTop
        const viewportHeight = window.innerHeight
        const scrollPosition = currentScrollY + viewportHeight / 2
        
        // Start typing when scrolling into the section (only if not already generated)
        if (scrollPosition >= sectionTop && displayedText.length === 0 && !isTyping && !hasGenerated) {
          setIsTyping(true)
          setIsScrollLocked(true)
          lockedScrollPosition.current = currentScrollY
        }
        
        // Simple scroll lock - only prevent scrolling down past the section during generation
        if (isScrollLocked && isTyping && section) {
          const sectionBottom = section.offsetTop + section.offsetHeight
          const maxScrollY = sectionBottom - viewportHeight + 50 // Small buffer
          
          // Only prevent scrolling down past the section, allow scrolling up
          if (currentScrollY > maxScrollY) {
            window.scrollTo({
              top: maxScrollY,
              behavior: 'auto' // Instant correction to prevent jitter
            })
          }
        } else if (isScrollLocked && !isTyping) {
          // Release scroll lock when typing is complete
          setIsScrollLocked(false)
        }
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [displayedText.length, fullText.length, isTyping, isScrollLocked, showArrow])

  // Typing animation effect
  useEffect(() => {
    if (isTyping && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 30) // Typing speed
      
      return () => clearTimeout(timeout)
    } else if (isTyping && displayedText.length === fullText.length) {
      // Stop animation when complete and save to localStorage
      setIsTyping(false)
      setIsScrollLocked(false)
      setHasGenerated(true)
      localStorage.setItem('philosophy-generated', 'true')
      
      // Show arrow after a short delay
      setTimeout(() => {
        setShowArrow(true)
        // Notify parent that philosophy is complete
        if (onComplete) {
          onComplete()
        }
        // Dispatch event for About component
        window.dispatchEvent(new CustomEvent('philosophy-complete'))
      }, 1000)
    }
  }, [isTyping, displayedText, fullText])

  return (
    <section ref={sectionRef} className="min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center relative pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 lg:p-8">
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed text-center font-mono">
            <span className="whitespace-pre-wrap">
              {displayedText}
            </span>
            <span className="animate-pulse text-silver-300">|</span>
          </div>
        </div>
      </div>
      
      {/* Cool down arrow that fades in and out */}
      {showArrow && (
        <div 
          className="absolute -translate-x-1/2 top-full -mt-32 animate-bounce z-10 cursor-pointer"
          onClick={() => {
            // Scroll down to the next section (About)
            const aboutSection = document.getElementById('about')
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' })
            }
            setShowArrow(false)
          }}
        >
          <div className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors">
            <svg 
              className="w-6 h-6 animate-pulse" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs font-mono">Scroll down to continue</span>
          </div>
        </div>
      )}
    </section>
  )
}
