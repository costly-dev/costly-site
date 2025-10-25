"use client"

import { useState } from "react"
import Button from "./Button"

interface ContactProps {
  onWaitlistClick: () => void
}

export default function Contact({ onWaitlistClick }: ContactProps) {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
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
          <div className="liquid-glass liquid-glass-intense rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
                A fair and transparent model
              </h2>
              
              <div className="space-y-4">
                <p className="text-white/90 leading-relaxed text-base text-center">
                  Costly's pricing is simple: a $2.99/month subscription unlocks all premium features, including advanced block lists, custom difficulty multipliers, and reward tracking. No data selling, no ads, no microtransactions.
                </p>
                
                <p className="text-white/90 leading-relaxed text-base text-center">
                  Optional deposits are always held securely through Stripe and can only be withdrawn by meeting focus goals. If you delete your account, all remaining deposits are forfeited as part of the accountability framework: a reminder that follow-through matters more than refunds.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
                <Button 
                  onClick={() => window.open('https://linkedin.com/in/xiaojerry', '_blank')}
                  variant="primary" 
                  className="px-6 py-3 text-base font-medium"
                >
                  Contact Me
                </Button>
                <Button 
                  onClick={onWaitlistClick}
                  variant="secondary" 
                  className="px-6 py-3 text-base font-medium"
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3 text-white/70">
            <p className="text-sm">
              Questions? Reach out to us at{" "}
              <span className="text-silver-300">
                TBA@email.com
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
