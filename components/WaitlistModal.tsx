"use client"
import type React from "react"
import { useState, useEffect } from "react"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Handle fade in/out animations and reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Reset form when modal opens
      setEmail("")
      setError(null)
      setIsSubmitted(false)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Normalize email: lowercase and trim whitespace
    const normalizedEmail = email.trim().toLowerCase()
    
    if (!normalizedEmail) {
      setError("Please enter a valid email address.")
      setIsSubmitting(false)
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      setError("Please enter a valid email address.")
      setIsSubmitting(false)
      return
    }

    console.log('[WaitlistModal] Submitting email:', normalizedEmail)
    
    try {
      // Use API route that uses service_role key (bypasses RLS)
      const response = await fetch('/api/waitlist-join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('[WaitlistModal] Error response:', response.status, data)
        setError(data.error || `Something went wrong (${response.status}). Please try again.`)
        setIsSubmitting(false)
        return
      }

      console.log('[WaitlistModal] Successfully added email:', normalizedEmail, 'Response:', data)
      setIsSubmitted(true)
      setIsSubmitting(false)

      setTimeout(() => {
        handleClose()
        setIsSubmitted(false)
        setEmail("")
        setError(null)
      }, 2000)
    } catch (error) {
      console.error('[WaitlistModal] Network error:', error)
      setError("Network error. Please check your connection and try again.")
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-out ${
      isOpen ? 'opacity-100' : 'opacity-0'
    }`}>
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`} 
        onClick={handleClose}
      ></div>

      <div className={`relative liquid-glass liquid-glass-intense rounded-2xl p-8 max-w-md w-full mx-4 transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-95 translate-y-4'
      }`}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
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
                className="w-full px-4 py-3 liquid-glass border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
              />

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full liquid-glass-button text-white py-3 rounded-lg font-medium disabled:opacity-50"
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
