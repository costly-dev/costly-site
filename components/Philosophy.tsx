"use client"

import { useState, useEffect, useRef } from "react"
import DebugButton from "./debug/DebugButton"

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
  const [debugMode, setDebugMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const lockedScrollPosition = useRef(0)

  const fullText = "Costly is a platform that lets people turn focus into commitment and discipline into measurable growth. Users place a stake on their own ability to stay off distractions by starting a focus session—if they open apps they've chosen to block, they lose part of that stake as a self-imposed consequence. The funds they set aside are held in a personal Costly account and can grow over time as they remain consistent, but withdrawals are only unlocked once personal milestones are met, such as total focus hours, completed sessions, or sustained streaks. Every change to one's rules or goals carries weight, reinforcing accountability with small penalties that remind users that commitment matters. Future versions will introduce a shared challenge system, allowing friends to join in collective goals and friendly competition built on trust and self-discipline. Costly isn't about restriction—it's about transforming attention into something tangible, where focus itself becomes a form of investment."

  // Reset function for debug mode
  const resetAll = () => {
    // Clear all state
    setDisplayedText("")
    setIsTyping(false)
    setHasGenerated(false)
    setShowArrow(false)
    setArrowVisible(false)
    setIsScrollLocked(false)
    setShowProgressBar(false)
    lastScrollY.current = 0
    lockedScrollPosition.current = 0
    
    // Clear localStorage
    localStorage.removeItem('philosophy-generated')
    
    // Clear any pending timeouts by scrolling to top
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Check localStorage on component mount (skip if debug mode)
  useEffect(() => {
    if (!debugMode) {
      const cachedGenerated = localStorage.getItem('philosophy-generated')
      if (cachedGenerated === 'true') {
        setDisplayedText(fullText)
        setHasGenerated(true)
      }
    }
  }, [fullText, debugMode])

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle scroll-based typing and scroll locking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const section = sectionRef.current
      let scrollBlocked = false
      
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
        
        // Scroll lock - prevent scrolling past the section bottom during generation
        // Allow free scrolling within the section, but block revealing content underneath
        if (isScrollLocked && isTyping && !hasGenerated) {
          const sectionBottom = section.offsetTop + section.offsetHeight
          const maxScrollY = sectionBottom - viewportHeight
          
          // Prevent scrolling down past the section bottom
          // Allow scrolling up freely
          if (currentScrollY > maxScrollY) {
            window.scrollTo({
              top: maxScrollY,
              behavior: 'auto' // Instant correction to prevent jitter
            })
            scrollBlocked = true
          }
        } else if (isScrollLocked && !isTyping && hasGenerated) {
          // Release scroll lock when typing is complete and text is fully generated
          setIsScrollLocked(false)
        }
      }
      
      // Only update lastScrollY if we didn't block the scroll
      if (!scrollBlocked) {
        lastScrollY.current = currentScrollY
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [displayedText.length, fullText.length, isTyping, isScrollLocked, showArrow, hasGenerated])

  // Typing animation effect
  useEffect(() => {
    if (isTyping && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 25) // Typing speed
      
      return () => clearTimeout(timeout)
    } else if (isTyping && displayedText.length === fullText.length) {
      // Stop animation when complete and save to localStorage (skip in debug mode)
      setIsTyping(false)
      setIsScrollLocked(false)
      setHasGenerated(true)
      if (!debugMode) {
        localStorage.setItem('philosophy-generated', 'true')
      }
      
      // Fade out notification after completion and trigger About icons
      setTimeout(() => {
        setShowProgressBar(false)
        // Dispatch event to trigger About section icons fade-in
        window.dispatchEvent(new CustomEvent('philosophy-notification-complete'))
      }, 2000) // Show completion state for 2 seconds
      
      // Show arrow after progress bar fades out
      setTimeout(() => {
        // Set arrowVisible first to add it to DOM, then show it after a small delay to ensure centering
        setArrowVisible(true)
        // Small delay to ensure element is rendered and centered before fading in
        setTimeout(() => {
          setShowArrow(true)
        }, 50)
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
  }, [isTyping, displayedText, fullText, debugMode, onComplete])

  // Calculate progress percentage
  const progressPercentage = fullText.length > 0 ? (displayedText.length / fullText.length) * 100 : 0

  return (
    <section ref={sectionRef} className="min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center relative pt-20 pb-20">
      {/* Debug Mode Button */}
      <DebugButton 
        debugMode={debugMode}
        onToggleDebug={() => setDebugMode(!debugMode)}
        onReset={resetAll}
      />
      {/* Apple-like Notification */}
      <div className={`fixed top-4 sm:top-8 left-1/2 z-50 transition-all duration-1000 ease-out ${
        showProgressBar 
          ? 'opacity-100' 
          : 'opacity-0'
      }`}
      style={{
        transform: showProgressBar 
          ? (isMobile ? 'translate(calc(-50% - 1.5rem), calc(35% - 2px))' : 'translate(-50%, 0%)')
          : (isMobile ? 'translate(calc(-50% - 1.5rem), -2rem)' : 'translate(-50%, -2rem)')
      }}>
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl px-3 sm:px-6 pt-2 sm:pt-3 pb-1.5 sm:pb-2 shadow-2xl w-56 sm:w-80 md:w-96 lg:w-[28rem] mx-auto border-[4pt] border-black">
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
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed text-center font-mono">
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
          className="fixed left-1/2 bottom-32 z-10 cursor-pointer"
          style={{
            transform: 'translateX(-50%)',
            transition: 'opacity 1000ms ease-in-out',
            opacity: showArrow ? 1 : 0
          }}
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
          <div className={`flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors ${
            showArrow ? 'animate-bounce' : ''
          }`}>
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
