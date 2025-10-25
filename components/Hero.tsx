"use client"

import SocialIcons from "./SocialIcons"
import Button from "./Button"
import PhoneZoomContainer from "./PhoneZoomContainer"

interface HeroProps {
  onScrollToAbout: () => void
  onWaitlistClick: () => void
}

export default function Hero({ onScrollToAbout, onWaitlistClick }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start min-h-screen py-16">
          
          {/* Text content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <header>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-center lg:text-left"
              style={{ fontFamily: "Londrina Shadow, cursive" }}
            >
              <span className="text-silver-300">Focus</span>{" "}
              <span className="text-white">That</span>{" "}
              <span className="text-white">Counts</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mt-5 text-center lg:text-left">
              Costly is a behavioral accountability app for iPhone and Mac that connects your focus to real, measurable stakes. You set your own rules: how long you'll stay focused, which apps you'll block, and how much you're willing to risk if you break them.
            </p>
            </header>

            {/* Join Waitlist Button */}
            <div className="flex justify-center lg:justify-start">
              <Button 
                onClick={onWaitlistClick} 
                variant="primary" 
                className="flex items-center justify-center gap-2 h-12 px-6 w-full max-w-2xl"
              >
                Join Waitlist
              </Button>
            </div>

            <SocialIcons />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onScrollToAbout} variant="primary" className="flex items-center justify-center gap-2 h-12 px-6">
                Learn more
                <span className="text-xl">↓ ↓ ↓</span>
              </Button>

              <Button variant="secondary" className="h-12 px-6 hidden sm:flex items-center">
                ↑ Click 
              </Button>
            </div>
            
          </div>

          {/* Placeholder for app preview */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative">
              <div className="relative w-64 h-[480px] sm:w-72 sm:h-[550px] lg:w-[320px] lg:h-[580px] xl:w-[360px] xl:h-[650px] liquid-glass liquid-glass-interactive rounded-2xl flex items-center justify-center">
                <div className="text-center text-white/60">
                  <div className="text-4xl mb-4">•</div>
                  <p className="text-lg">App Preview</p>
                  <p className="text-sm">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
