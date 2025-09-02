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

export default function ScrollingNotifications() {
  const [translateX, setTranslateX] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => {
        // Reset when first set scrolls completely off screen
        // Each notification is ~300px wide, 5 notifications = ~1500px
        if (prev <= -1500) {
          return 0
        }
        return prev - 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative top-[94px] left-0 right-0 z-1 overflow-hidden">
      <div
        className="flex gap-3 transition-transform duration-75 ease-linear"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {[...Array(6)].map((_, setIndex) =>
          notifications.map((notification, index) => (
            <div
              key={`${setIndex}-${index}`}
              className="flex-shrink-0 bg-gray-900/80 backdrop-blur-md border border-gray-700/30 rounded-2xl px-3 py-3 min-w-[320px] max-w-[320px] shadow-sm"
            >
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 mt-1.5">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-XBlCBTIndUwhWRsxZco9q2mA2KQFDT.png"
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
