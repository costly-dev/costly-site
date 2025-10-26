"use client"

import { useState, useEffect, useRef } from "react"
import Button from "./Button"

interface ContactProps {
  onWaitlistClick: () => void
}

export default function Contact({ onWaitlistClick }: ContactProps) {
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

              <div className={`flex flex-col sm:flex-row gap-3 justify-center pt-3 transition-all duration-500 ${
                animatedItems.has('buttons') 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-4 scale-95'
              }`}>
                <Button 
                  onClick={() => window.open('https://linkedin.com/in/xiaojerry', '_blank')}
                  variant="primary" 
                  className="px-6 py-3 text-base font-medium hover:scale-105 transition-transform duration-200"
                >
                  Contact Me
                </Button>
                <Button 
                  onClick={onWaitlistClick}
                  variant="secondary" 
                  className="px-6 py-3 text-base font-medium hover:scale-105 transition-transform duration-200"
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className={`space-y-3 text-white/70 transition-all duration-500 ${
            animatedItems.has('info') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-sm">
              Questions? Reach out to us at{" "}
              <span className="text-silver-300">
                hello@costly.live
              </span>
            </p>
            
            <div className="flex justify-center space-x-4 text-xs">
              <span>• Early Access</span>
              <span>• Launch Updates</span>
              <span>• Special Pricing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
