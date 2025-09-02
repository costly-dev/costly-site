"use client"

import SocialIcons from "./SocialIcons"
import Button from "./Button"
import PhoneZoomContainer from "./PhoneZoomContainer"

interface HeroProps {
  onScrollToAbout: () => void
}

export default function Hero({ onScrollToAbout }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6">
      
      <div className="w-full flex items-center justify-center min-h-screen">
        
        <div className="flex flex-col md:grid md:grid-cols-2 items-center w-full max-w-7xl">

          <div className="phone-spacer"></div>
          
          {/* Text content - different positioning per breakpoint */}
          <div className="relative space-y-4">
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
              style={{ fontFamily: "Londrina Shadow, cursive" }}
            >
              <span className="text-yellow-400 stroke-text">Financial</span>{" "}
              <span className="text-white stroke-text">Deterrent</span>
              <br />
              <span className="text-white stroke-text">FOR</span>{" "}
              <span className="text-purple-400 stroke-text">Distractions</span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl font-italic text-white uppercase tracking-wider leading-tight"
              style={{ fontFamily: "Patrick Hand SC, cursive" }}>
              In a world engineered to steal your attention, where billion-dollar companies hire neuroscientists to make apps more addictive, you need a stronger defense than "I'll try harder tomorrow."  
            </p>

            <SocialIcons />

            <div className="flex gap-4">
              <Button onClick={onScrollToAbout} variant="primary" className="flex items-center gap-2 h-12">
                How does it work?
                <span className="text-xl">↓ ↓ ↓</span>
              </Button>

              <Button variant="secondary" className="h-12 flex px-2 py-3 items-center portrait:hidden">
                ↑ Click 
              </Button>
            </div>
            
            <div className="relative h-10"></div>
            
            <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl px-4 py-3 md:bp-20">
              <p
                className="text-lg md:text-xl lg:text-2xl font-bold text-white uppercase tracking-wider leading-tight"
                style={{ fontFamily: "Patrick Hand SC, cursive" }}
              >
                We built Costly because willpower alone isn't enough anymore. 
                
                Pick your poison apps, set your price, and every time you give in to temptation, you pay. Literally. No exceptions, no take-backs, no "just this once." 
                
                It's not about punishment—it's about making the invisible cost of distraction visible. 
                
                Opened TikTok? It just cost you $.
                
                Still worth it?
              </p>
            </div>
          </div>


          <div className="relative h-10 lg:hidden"></div>

          {/* Phone image - different positioning per breakpoint */}
          <div className=" flex justify-center">
            <div className="relative">
              <div className="relative w-72 h-[550px] lg:w-[500px] lg:h-[950px]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/phonebezel-xzHDgMofVDJxKqTXK7pwViO5w1T8UZ.png"
                  alt="Phone Bezel"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-30%20at%203.13.48%E2%80%AFAM-NMocdKDsHk4ig3nUYlSNFE3AaNFGL8.png"
                    alt="Costly App Start Screen"
                    className="w-[100%] h-[100%] object-contain rounded-[5rem] z-9997"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
