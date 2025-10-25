"use client"

import { useState, useEffect, useRef } from "react"

interface PhilosophyProps {
  onNavigate: (section: string) => void
}

export default function Philosophy({ onNavigate }: PhilosophyProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)

  const fullText = "Every minute of discipline strengthens your streak, while every lapse comes with a small, automatic financial consequence. By turning focus into something tangible, Costly helps you build consistency not through guilt or gamification, but through clear, immediate accountability. It's self-accountability made concrete: lose focus, lose a dollar; stay disciplined, reclaim your balance and your confidence."

  // Check localStorage on component mount
  useEffect(() => {
    const cachedGenerated = localStorage.getItem('philosophy-generated')
    if (cachedGenerated === 'true') {
      setDisplayedText(fullText)
      setHasGenerated(true)
    }
  }, [fullText])

  // Handle scroll-based typing
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const section = sectionRef.current
      
      if (section) {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight
        const viewportHeight = window.innerHeight
        const scrollPosition = currentScrollY + viewportHeight / 2
        
        // Reset auto-scroll state when returning to the section
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom && hasAutoScrolled) {
          setHasAutoScrolled(false)
        }
        
        // Start typing when scrolling into the section (only if not already generated)
        if (scrollPosition >= sectionTop && displayedText.length === 0 && !isTyping && !hasGenerated) {
          setIsTyping(true)
        }
        
        // Auto-scroll to About section when scrolled past Philosophy
        if (scrollPosition > sectionBottom + 100 && !hasAutoScrolled && displayedText.length === fullText.length) {
          setHasAutoScrolled(true)
          setTimeout(() => {
            onNavigate("about")
          }, 500) // Small delay
        }
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [displayedText.length, fullText.length, isTyping, hasAutoScrolled, onNavigate])

  // Typing animation effect
  useEffect(() => {
    if (isTyping && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
        
        // Auto-scroll down as text generates to maintain even spacing
        const section = sectionRef.current
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight
          const viewportHeight = window.innerHeight
          const currentScrollY = window.scrollY
          const scrollPosition = currentScrollY + viewportHeight / 2
          
          // Only auto-scroll if we're in the section
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            // Keep the section centered in the viewport as text generates
            const targetScrollPosition = sectionTop + (sectionBottom - sectionTop) / 2 - viewportHeight / 2
            
            window.scrollTo({
              top: Math.max(0, targetScrollPosition),
              behavior: "smooth"
            })
          }
        }
      }, 30) // Typing speed
      
      return () => clearTimeout(timeout)
    } else if (isTyping && displayedText.length === fullText.length) {
      // Stop animation when complete and save to localStorage
      setIsTyping(false)
      setHasGenerated(true)
      localStorage.setItem('philosophy-generated', 'true')
    }
  }, [isTyping, displayedText, fullText])

  return (
    <section ref={sectionRef} className="h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center">
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
    </section>
  )
}
