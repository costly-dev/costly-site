"use client"

import SocialIcons from "./SocialIcons"
import Button from "./Button"

interface HeroProps {
  onScrollToAbout: () => void
}

export default function Hero({ onScrollToAbout }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-32">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-yellow-400 stroke-text">Financial</span>{" "}
              <span className="text-white stroke-text">Deterrent</span>
              <br />
              <span className="text-white stroke-text">FOR</span>{" "}
              <span className="text-purple-400 stroke-text">Distractions</span>
            </h1>
          </div>

          <SocialIcons />

          <div className="flex gap-4">
            <Button onClick={onScrollToAbout} variant="primary" className="flex items-center gap-2">
              How does it work?
              <span className="text-xl">↓ ↓ ↓</span>
            </Button>

            <Button variant="secondary">↑ Touch us.</Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] border-4 border-gray-700 shadow-2xl">
              <div className="absolute inset-4 bg-black rounded-[2.5rem] flex flex-col items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-yellow-400 flex items-center justify-center mb-8">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-PS4vPKIEDNGx8DaZnerSDvbFjF5DZH.png"
                    alt="Costly Logo"
                    className="w-16 h-16"
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-gray-400 text-sm">Every moment of</p>
                  <p className="text-gray-400 text-sm">weakness has a price...</p>
                  <p className="text-white text-sm mt-4">Your mission is to never</p>
                  <p className="text-white text-sm">pay it.</p>
                </div>
              </div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
