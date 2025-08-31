"use client"

import { useEffect, useState } from "react"

const notifications = [
  "Costly has charged $5 to your account. You opened Instagram for 2 minutes.",
  "Costly has charged $3 to your account. You opened TikTok for 1 minute.",
  "Costly has charged $7 to your account. You opened Twitter for 3 minutes.",
  "Costly has charged $2 to your account. You opened YouTube for 30 seconds.",
  "Costly has charged $4 to your account. You opened Facebook for 1.5 minutes.",
]

export default function ScrollingNotifications() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-40 pt-20">
      <div className="flex gap-4 px-6 overflow-hidden">
        {[...Array(5)].map((_, i) => {
          const notificationIndex = (currentIndex + i) % notifications.length
          return (
            <div
              key={i}
              className="flex-shrink-0 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-3 min-w-[300px] animate-pulse"
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-PS4vPKIEDNGx8DaZnerSDvbFjF5DZH.png"
                  alt="Costly"
                  className="w-4 h-4"
                />
                <span className="text-xs text-gray-400">Costly</span>
                <span className="text-xs text-gray-500 ml-auto">9:41 AM</span>
              </div>
              <p className="text-sm text-white">{notifications[notificationIndex]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
