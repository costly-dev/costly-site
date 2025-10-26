"use client"

import { useEffect, useState } from "react"

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
  showNotifications?: boolean
}

export default function ScrollingNotifications({ isLoaded = false, showNotifications = false }: ScrollingNotificationsProps) {
  const [translateX, setTranslateX] = useState(0)

  useEffect(() => {
    let animationId: number
    let startTime: number
    const speed = 0.5 // pixels per frame (smoother)

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      
      setTranslateX((prev) => {
        // Reset when first set scrolls completely off screen
        // Each notification is ~320px wide + 12px gap = ~332px
        // 5 notifications = ~1660px, but we need to account for the gap
        const totalWidth = (320 + 12) * 5 // 1660px
        if (prev <= -totalWidth) {
          return 0
        }
        return prev - speed
      })
      
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className={`relative w-full overflow-hidden py-4 mt-20 sm:mt-24 transition-all duration-1000 ease-out ${
      showNotifications 
        ? 'translate-y-0 opacity-100' 
        : '-translate-y-4 opacity-0'
    }`}>
      <div
        className="flex gap-3"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {[...Array(6)].map((_, setIndex) =>
          notifications.map((notification, index) => (
            <div
              key={`${setIndex}-${index}`}
              className="flex-shrink-0 liquid-glass liquid-glass-interactive rounded-2xl px-3 py-3 min-w-[320px] max-w-[320px] shadow-sm"
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
          )),
        )}
      </div>
    </div>
  )
}
