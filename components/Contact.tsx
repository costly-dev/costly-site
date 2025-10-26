"use client"

import { useState, useEffect, useRef } from "react"
import QuickNavigation from "./QuickNavigation"

interface ContactProps {
  onWaitlistClick: () => void
  onNavigate: (section: string) => void
}

export default function Contact({ onWaitlistClick, onNavigate }: ContactProps) {
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset animation state when entering view
            setAnimatedItems(new Set())
            
            // Stagger animations for different components
            const animationSequence = [
              { id: 'header', delay: 0 },
              { id: 'card', delay: 200 },
              { id: 'buttons', delay: 400 },
              { id: 'info', delay: 600 }
            ]
            
            animationSequence.forEach(({ id, delay }) => {
              setTimeout(() => {
                setAnimatedItems(prev => new Set([...prev, id]))
              }, delay)
            })
          } else {
            // Reset animation state when leaving view
            setAnimatedItems(new Set())
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="space-y-6">
          {/* Header */}
          <div className={`space-y-3 transition-all duration-700 ${
            animatedItems.has('header') 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "Londrina Shadow, cursive" }}
            >
              <span className="text-silver-300">Get</span>{" "}
              <span className="text-white">In Touch</span>
            </h1>
            
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              Ready to transform your focus habits? Join our waitlist to be the first to experience Costly when it launches.
            </p>
          </div>

          {/* Pricing & Contact Card */}
          <div className={`liquid-glass liquid-glass-intense rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto transition-all duration-700 ${
            animatedItems.has('card') 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
                A fair and transparent model
              </h2>
              
              <div className="space-y-4">
                <p className="text-white/90 leading-relaxed text-base text-center">
                  Costly's pricing is simple: a $2.99/month subscription unlocks all premium features, including advanced block lists, custom difficulty multipliers, and reward tracking. No data selling & no ads.
                </p>
                
                <p className="text-white/90 leading-relaxed text-base text-center">
                  Account deposits are always held securely through Stripe and can only be withdrawn by meeting focus goals. If you delete your account, all remaining deposits are forfeited as part of the accountability framework: a reminder that follow-through matters more than refunds.
                </p>
              </div>

              <div className={`flex flex-row gap-2 sm:gap-3 justify-center pt-3 transition-all duration-500 ${
                animatedItems.has('buttons') 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-4 scale-95'
              }`}>
                <button 
                  onClick={() => window.open('mailto:hello@costly.live', '_self')}
                  className="w-12 h-12 rounded-full font-medium transition-all duration-200 hover:scale-105 backdrop-blur-md shadow-lg liquid-glass-button text-white !shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:!shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center justify-center"
                  style={{ animation: 'none' }}
                  title="Contact Us"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </button>
                <button 
                  onClick={onWaitlistClick}
                  className="w-32 sm:w-auto h-12 sm:h-auto px-0 sm:px-6 py-0 sm:py-3 text-xs sm:text-base font-medium hover:scale-105 transition-all duration-200 rounded-full backdrop-blur-md shadow-lg !bg-white/90 !text-black !shadow-[0_0_25px_rgba(255,255,255,0.6)] flex items-center justify-center"
                >
                  <span className="hidden sm:inline">Join Waitlist</span>
                  <span className="sm:hidden">Join Waitlist</span>
                </button>
                <button 
                  onClick={() => window.open('https://linkedin.com/in/xiaojerry', '_blank')}
                  className="w-12 h-12 rounded-full font-medium transition-all duration-200 hover:scale-105 backdrop-blur-md shadow-lg !bg-blue-900 !text-white !shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:!shadow-[0_0_35px_rgba(59,130,246,0.8)] flex items-center justify-center"
                  title="My LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className={`transition-all duration-500 ${
            animatedItems.has('info') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}>
            <QuickNavigation onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </section>
  )
}
