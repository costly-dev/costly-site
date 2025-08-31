"use client"

import type React from "react"
import { useState } from "react"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Integrate with Supabase
    // Example Supabase integration:
    // const { data, error } = await supabase
    //   .from('waitlist')
    //   .insert([{ email, created_at: new Date() }])

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
      setEmail("")
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          ✕
        </button>

        {!isSubmitted ? (
          <>
            <h3 className="text-2xl font-bold text-white mb-4">Join the Waitlist</h3>
            <p className="text-gray-300 mb-6">
              Be the first to know when Costly launches and start building better digital habits.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 text-black py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
            <p className="text-gray-300">We'll notify you when Costly is ready.</p>
          </div>
        )}
      </div>
    </div>
  )
}
