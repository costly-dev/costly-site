"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Reduce loading time significantly for better LCP
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Fade out after loading completes
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onLoadingComplete, 150) // Reduced fade out time
          }, 100) // Reduced delay
          return 100
        }
        return prev + Math.random() * 25 + 10 // Faster progress (10-35 instead of 5-20)
      })
    }, 50) // Faster interval (50ms instead of 100ms)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-opacity duration-300 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/icon.png"
            alt="Costly Logo"
            className="w-16 h-16 mx-auto animate-pulse"
            width={64}
            height={64}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="text-white/60 text-sm mt-4">
          {progress < 30 ? "Initializing..." : 
           progress < 60 ? "Loading assets..." : 
           progress < 90 ? "Almost ready..." : 
           "Welcome to Costly"}
        </p>
      </div>
    </div>
  )
}
