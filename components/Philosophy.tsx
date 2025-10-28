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
  const [arrowVisible, setArrowVisible] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [showProgressBar, setShowProgressBar] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const lockedScrollPosition = useRef(0)

  const fullText = "Costly is a platform that lets people turn focus into commitment and discipline into measurable growth. Users place a stake on their own ability to stay off distractions by starting a focus session—if they open apps they've chosen to block, they lose part of that stake as a self-imposed consequence. The funds they set aside are held in a personal Costly account and can grow over time as they remain consistent, but withdrawals are only unlocked once personal milestones are met, such as total focus hours, completed sessions, or sustained streaks. Every change to one's rules or goals carries weight, reinforcing accountability with small penalties that remind users that commitment matters. Future versions will introduce a shared challenge system, allowing friends to join in collective goals and friendly competition built on trust and self-discipline. Costly isn't about restriction—it's about transforming attention into something tangible, where focus itself becomes a form of investment."

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
      
      // Detect user scrolling and hide arrow (only if arrow is visible and not already fading)
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current)
      if (scrollDelta > 5 && showArrow && arrowVisible) {
        setShowArrow(false)
        // Let the arrow fade out naturally instead of immediately hiding
        setTimeout(() => {
          setArrowVisible(false)
        }, 1000) // Match the fade transition duration
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
          setShowProgressBar(true) // Show notification when typing starts
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
      
      // Fade out notification after completion and trigger About icons
      setTimeout(() => {
        setShowProgressBar(false)
        // Dispatch event to trigger About section icons fade-in
        window.dispatchEvent(new CustomEvent('philosophy-notification-complete'))
      }, 2000) // Show completion state for 2 seconds
      
      // Show arrow after progress bar fades out
      setTimeout(() => {
        setShowArrow(true)
        setArrowVisible(true)
        // Notify parent that philosophy is complete
        if (onComplete) {
          onComplete()
        }
        // Dispatch event for About component
        window.dispatchEvent(new CustomEvent('philosophy-complete'))
        
        // Start arrow fade-out after 3 seconds
        setTimeout(() => {
          setShowArrow(false)
          // Remove arrow from DOM after fade transition completes
          setTimeout(() => {
            setArrowVisible(false)
          }, 1000) // Match CSS transition duration
        }, 3000) // 3 second delay
      }, 1500)
    }
  }, [isTyping, displayedText, fullText])

  // Calculate progress percentage
  const progressPercentage = fullText.length > 0 ? (displayedText.length / fullText.length) * 100 : 0

  return (
    <section ref={sectionRef} className="min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center relative pt-20 pb-20">
      {/* Apple-like Notification */}
      <div className={`fixed top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-1000 ease-out ${
        showProgressBar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl px-4 sm:px-6 pt-2 sm:pt-3 pb-1.5 sm:pb-2 shadow-2xl w-72 sm:w-80 md:w-96 lg:w-[28rem] mx-auto">
            {/* Clean Title */}
            <div className="text-center mb-1 sm:mb-1.5">
              <h3 className="text-xs sm:text-sm font-medium text-white/90 tracking-wide">
                ATTENTION SPAN TRAINING
              </h3>
            </div>
            
            {/* Thin Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-0.5 sm:h-1 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto">
        {/* Predetermined centered box with even padding */}
        <div className="min-h-[70vh] flex items-center justify-center py-20">
          <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed text-center font-mono">
              <span className="whitespace-pre-wrap">
                {displayedText}
              </span>
              <span className="animate-pulse text-silver-300">|</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cool down arrow that fades in and out */}
      {arrowVisible && (
        <div 
          className={`absolute -translate-x-1/2 top-full -mt-32 z-10 cursor-pointer transition-opacity duration-1000 ease-in-out ${
            showArrow ? 'opacity-100 animate-bounce' : 'opacity-0'
          }`}
          onClick={() => {
            // Scroll down to the next section (About)
            const aboutSection = document.getElementById('about')
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' })
            }
            setShowArrow(false)
            setArrowVisible(false)
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
