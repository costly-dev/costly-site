"use client"

import { useEffect, useState, useRef, useCallback } from "react"

const notifications = [
  {
    app: "Instagram",
    message: "You opened Instagram. $5.00 charged. Stay focused.",
  },
  {
    app: "X", 
    message: "You opened X. $5.00 charged. Work more, yap less.",
  },
  {
    app: "TikTok",
    message: "You opened TikTok. $5.00 charged. Don't scroll away.",
  },
  {
    app: "Reddit",
    message: "You opened Reddit. $5.00 charged. Better things to do.",
  },
  {
    app: "Discord",
    message: "You opened Discord. $5.00 charged. VC Later.",
  },
]

interface ScrollingNotificationsProps {
  isLoaded?: boolean
}

export default function ScrollingNotifications({ isLoaded = false }: ScrollingNotificationsProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [sequenceWidth, setSequenceWidth] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const sequenceRef = useRef<HTMLDivElement>(null)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Measure the width of a single full sequence (one set of notifications)
  const measureSequenceWidth = useCallback(() => {
    const el = sequenceRef.current
    if (!el) return 0
    const width = Math.round(el.getBoundingClientRect().width)
    return width
  }, [])

  // Keep sequence width updated on mount/resize/font load
  useEffect(() => {
    const update = () => {
      const w = measureSequenceWidth()
      if (w > 0) setSequenceWidth(w)
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    const fontReady = (document as any).fonts?.ready
    if (fontReady && typeof fontReady.then === 'function') {
      ;(document as any).fonts.ready.then(update).catch(() => {})
    }
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [measureSequenceWidth])

  // Compute CSS animation duration (seconds) from measured width and desired speed
  const animationDurationSec = (() => {
    if (!sequenceWidth) return 0
    const speedPxPerSec = isMobile ? 30 : 50
    return sequenceWidth / speedPxPerSec
  })()

  // Debug logging for mobile
  useEffect(() => {
    if (isMobile && sequenceWidth > 0) {
      console.log('Mobile scrolling debug:', {
        sequenceWidth,
        animationDurationSec,
        isMobile
      })
    }
  }, [sequenceWidth, animationDurationSec, isMobile])

  return (
    <div className={`scrolling-notifications relative w-full overflow-hidden py-4 mt-20 sm:mt-24 transition-all duration-1000 ease-out delay-500 ${
      isLoaded 
        ? 'translate-y-0 opacity-100' 
        : '-translate-y-4 opacity-0'
    }`}>
      <div
        ref={trackRef}
        className="flex flex-nowrap will-change-transform marquee-track"
        style={{ 
          // Use CSS variable for measured width and time-based CSS animation for smoothness
          // @ts-ignore - CSS custom property
          "--marquee-width": `${sequenceWidth || (isMobile ? 1460 : 1660)}px`,
          animationDuration: animationDurationSec ? `${animationDurationSec}s` : (isMobile ? '48s' : '33s'),
          animationPlayState: 'running' as any
        }}
      >
        <div className="flex gap-3" ref={sequenceRef}>
          {notifications.map((notification, index) => (
            <div
              key={`seq1-${index}`}
              className="notification-item no-border flex-shrink-0 liquid-glass liquid-glass-interactive rounded-2xl px-3 py-3 min-w-[280px] max-w-[280px] sm:min-w-[320px] sm:max-w-[320px] shadow-sm"
            >
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 mt-1.5">
                  <img
                    src="/icon.png"
                    alt="Costly"
                    className="w-8 h-8 rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold text-white/90">Costly</span>
                    <span className="text-xs text-gray-500">now</span>
                  </div>
                  <div className="text-sm text-white/80 leading-tight line-clamp-2">
                    {notification.message}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3" aria-hidden>
          {notifications.map((notification, index) => (
            <div
              key={`seq2-${index}`}
              className="notification-item no-border flex-shrink-0 liquid-glass liquid-glass-interactive rounded-2xl px-3 py-3 min-w-[280px] max-w-[280px] sm:min-w-[320px] sm:max-w-[320px] shadow-sm"
            >
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 mt-1.5">
                  <img
                    src="/icon.png"
                    alt="Costly"
                    className="w-8 h-8 rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold text-white/90">Costly</span>
                    <span className="text-xs text-gray-500">now</span>
                  </div>
                  <div className="text-sm text-white/80 leading-tight line-clamp-2">
                    {notification.message}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
