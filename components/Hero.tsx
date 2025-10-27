"use client"

import { useEffect, useState } from "react"
import SocialIcons from "./SocialIcons"
import Button from "./Button"

interface HeroProps {
  onScrollToAbout: () => void
  onWaitlistClick: () => void
  isLoaded?: boolean
}

export default function Hero({ onScrollToAbout, onWaitlistClick, isLoaded = false }: HeroProps) {
  const [scrollY, setScrollY] = useState(0)
  const [textTransform, setTextTransform] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Only apply scroll animation on desktop (lg and up)
    if (window.innerWidth < 1024) {
      setTextTransform(0)
      return
    }

    // More stable scroll-based movement with reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setTextTransform(0)
      return
    }

    // Simple scroll-based movement - text moves down as you scroll
    const scrollProgress = Math.min(scrollY / 700, 1) // Move over 600px of scroll (faster response)
    const maxMovement = 400 // Reduced maximum movement for better stability
    
    setTextTransform(scrollProgress * maxMovement)
  }, [scrollY])

  return (
    <section id="home" className="min-h-screen flex items-start justify-center px-3 sm:px-5 lg:px-[76px]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start min-h-screen py-16">
          
          {/* Text content */}
          <div 
            className={`space-y-6 lg:space-y-8 order-2 lg:order-1 transition-all duration-1000 ease-out optimized-animation ${
              isLoaded 
                ? 'opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transform: isLoaded ? `translateY(${textTransform}px)` : 'translateY(8px)',
              transition: isLoaded ? 'transform 0.1s ease-out' : 'all 1s ease-out'
            }}
          >
            <header>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-center lg:text-left font-londrina-shadow"
            >
              <span className="text-silver-300">Focus</span>{" "}
              <span className="text-white">That</span>{" "}
              <span className="text-white">Counts</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mt-5 text-center lg:text-left mx-auto lg:mx-0">
              Costly is a behavioral accountability app for iPhone and Mac that connects your focus to real, measurable stakes. You set your own rules: how long you'll stay focused, which apps you'll block, and how much you're willing to risk if you break them.
            </p>
            </header>

            {/* Join Waitlist Button */}
            <div className="flex justify-center lg:justify-start">
              <Button 
                onClick={onWaitlistClick} 
                variant="primary" 
                className="flex items-center justify-center gap-2 h-12 px-6 w-full max-w-2xl !bg-white/90 !text-black shadow-[0_0_25px_rgba(255,255,255,0.6)] stable-button"
              >
                Join Waitlist
              </Button>
            </div>

            <div className="flex justify-center w-full max-w-2xl mt-6 lg:mt-0">
              <SocialIcons onScrollToAbout={onScrollToAbout} />
            </div>
            
          </div>

          {/* App preview */}
          <div className={`flex justify-center order-1 lg:order-2 transition-all duration-1000 ease-out delay-300 ${
            isLoaded 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-8 opacity-0'
          }`}>
            <div className="relative hero-image-container">
              {/* Mobile desktop recommendation */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 lg:hidden">
                <p className="text-xs text-white/40 text-center whitespace-nowrap">
                  (This site looks better on desktop)
                </p>
              </div>
              {/* Mobile and small screens - use original image */}
              <img 
                src="/GraphicsNotif.png" 
                alt="Costly App Preview - iPhone notification showing penalty system"
                className="w-64 h-[520px] sm:w-72 sm:h-[585px] lg:hidden object-contain"
                width={288}
                height={585}
                loading="eager"
                decoding="async"
              />
              
              {/* Desktop - use compressed image */}
              <img 
                src="/GraphicsNotif_upscaled_compressed.jpg" 
                alt="Costly App Preview - iPhone notification showing penalty system"
                className="hidden lg:block w-[450px] h-[920px] xl:w-[500px] xl:h-[1020px] object-contain"
                width={500}
                height={1020}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
