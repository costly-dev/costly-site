"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let mounted = true
    let progressInterval: NodeJS.Timeout | null = null

    // Track resource loading state
    const resourceState = {
      domReady: false,
      fontsReady: false,
      imagesReady: false
    }

    // Check images loading
    const checkImages = () => {
      const criticalImages = [
        '/icon.png',
        '/GraphicsNotif.png',
        '/GraphicsNotif_upscaled_compressed.jpg'
      ]

      let imagesChecked = 0
      let imagesLoaded = 0

      criticalImages.forEach((src) => {
        const img = new Image()
        img.onload = () => {
          if (!mounted) return
          imagesChecked++
          imagesLoaded++
          if (imagesChecked === criticalImages.length) {
            resourceState.imagesReady = imagesLoaded >= 2 // At least 2 out of 3
            updateProgress()
          }
        }
        img.onerror = () => {
          if (!mounted) return
          imagesChecked++
          if (imagesChecked === criticalImages.length) {
            resourceState.imagesReady = imagesLoaded >= 2
            updateProgress()
          }
        }
        img.src = src
      })

      // Timeout fallback - assume images loaded after 3 seconds
      setTimeout(() => {
        if (mounted && imagesChecked < criticalImages.length) {
          resourceState.imagesReady = true
          updateProgress()
        }
      }, 3000)
    }

    // Update progress based on resource state
    const updateProgress = () => {
      if (!mounted) return

      let loadedCount = 0
      const totalCount = 3

      // Check DOM ready state
      resourceState.domReady = document.readyState === 'complete'
      if (resourceState.domReady) {
        loadedCount++
      }

      // Check fonts loaded
      if (typeof document !== 'undefined' && (document as any).fonts && (document as any).fonts.check) {
        try {
          const interLoaded = (document as any).fonts.check('400 1em Inter') || 
                             (document as any).fonts.check('1em Inter')
          const dancingScriptLoaded = (document as any).fonts.check('400 1em "Dancing Script"') ||
                                     (document as any).fonts.check('1em "Dancing Script"')
          resourceState.fontsReady = interLoaded && dancingScriptLoaded
        } catch (e) {
          resourceState.fontsReady = true // Assume loaded if check fails
        }
      } else {
        resourceState.fontsReady = true // Fallback
      }

      if (resourceState.fontsReady) {
        loadedCount++
      }
      if (resourceState.imagesReady) {
        loadedCount++
      }

      // Calculate progress (0-90% based on resources, then animate to 100%)
      const resourceProgress = (loadedCount / totalCount) * 90
      setProgress((prev) => {
        const newProgress = Math.max(prev, resourceProgress)
        
        // If all resources are loaded, animate to 100%
        if (loadedCount === totalCount && newProgress >= 90) {
          if (progressInterval) {
            clearInterval(progressInterval)
          }
          
          // Animate to 100%
          progressInterval = setInterval(() => {
            if (!mounted) {
              if (progressInterval) clearInterval(progressInterval)
              return
            }
            
            setProgress((p) => {
              if (p >= 100) {
                if (progressInterval) {
                  clearInterval(progressInterval)
                }
                // Fade out
                setTimeout(() => {
                  if (mounted) {
                    setIsVisible(false)
                    setTimeout(onLoadingComplete, 300)
                  }
                }, 300)
                return 100
              }
              return Math.min(p + 5, 100)
            })
          }, 50)
          
          return newProgress
        }
        
        return newProgress
      })
    }

    // Start checking images
    checkImages()

    // Initial progress check
    updateProgress()

    // Poll for progress updates
    const progressCheckInterval = setInterval(updateProgress, 100)

    // Fallback: ensure progress reaches 100% after max 5 seconds
    const maxWaitTimeout = setTimeout(() => {
      if (mounted) {
        setProgress(100)
        setTimeout(() => {
          if (mounted) {
            setIsVisible(false)
            onLoadingComplete()
          }
        }, 300)
      }
    }, 5000)

    return () => {
      mounted = false
      if (progressInterval) {
        clearInterval(progressInterval)
      }
      clearInterval(progressCheckInterval)
      clearTimeout(maxWaitTimeout)
    }
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
