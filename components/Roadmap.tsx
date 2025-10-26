"use client"

import Button from "./Button"
import { useState, useEffect, useRef } from "react"

interface RoadmapProps {
  onNavigate: (section: string) => void
  activeSection: string
}

export default function Roadmap({ onNavigate, activeSection }: RoadmapProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set())
  const [progressWidth, setProgressWidth] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const phases = [
    {
      title: "Core Features",
      features: ["Native app blocking via FamilyControls", "Stripe payment integration", "Convex cloud sync", "Clerk authentication"],
    },
    {
      title: "Accountability",
      features: [
        "Penalty escalation system",
        "Streak tracking & rewards",
        "Balance withdrawal goals",
        "Tamper-proof enforcement",
      ],
    },
    {
      title: "Premium",
      features: ["$2.99/month subscription", "Advanced block lists", "Custom difficulty multipliers", "Reward tracking"],
    },
    {
      title: "Security",
      features: ["TLS 1.3 encryption", "PCI DSS compliance", "Biometric MFA", "Double-entry ledger"],
    },
    {
      title: "Future",
      features: ["Plaid bank integration", "Advanced analytics", "Team accountability", "API access"],
    },
  ]

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Reset animation state when entering view
            setAnimatedItems(new Set())
            setProgressWidth(0)
            
            // Stagger animations for each phase
            phases.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedItems(prev => new Set([...prev, index]))
              }, index * 150) // 150ms delay between each phase
            })
            
            // Animate progress bar slowly creeping up
            setTimeout(() => {
              // Animate from 0 to 20% (Core Features only - first phase out of 5)
              let currentWidth = 0
              const targetWidth = 20 // 20% = 1/5 phases (Core Features)
              const increment = 0.5 // Small increments for smooth crawling
              const interval = setInterval(() => {
                currentWidth += increment
                if (currentWidth >= targetWidth) {
                  currentWidth = targetWidth
                  clearInterval(interval)
                }
                setProgressWidth(currentWidth)
              }, 50) // Update every 50ms for smooth crawling
            }, 1000) // Start after phases begin animating
          } else {
            // Reset animation state when leaving view
            setIsVisible(false)
            setAnimatedItems(new Set())
            setProgressWidth(0)
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
    <section ref={sectionRef} id="roadmap" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <header className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Development Roadmap
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Our planned features and development timeline for Costly
          </p>
        </header>
        
        <div className="mb-16">
          <div className="liquid-glass liquid-glass-intense rounded-2xl p-6 sm:p-8">

            {/* Desktop/Tablet view - 5 columns */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-5 gap-6">
                {phases.map((phase, index) => (
                  <div 
                    key={index} 
                    className={`space-y-4 transition-all duration-500 ${
                      animatedItems.has(index) 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <h5 className="text-lg font-bold text-silver-300 text-center">{phase.title}</h5>
                    <ul className="space-y-2">
                      {phase.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className={`text-sm text-gray-300 leading-relaxed transition-all duration-300 ${
                            animatedItems.has(index) 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 translate-x-4'
                          }`}
                          style={{ transitionDelay: `${(index * 150) + (featureIndex * 100)}ms` }}
                        >
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Horizontal progress bar for desktop/tablet */}
              <div className="mt-8 w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-silver-300 rounded-full"
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
            </div>

            {/* Tablet view - 3 columns */}
            <div className="hidden md:block lg:hidden">
              <div className="grid grid-cols-3 gap-6">
                {phases.slice(0, 3).map((phase, index) => (
                  <div 
                    key={index} 
                    className={`space-y-4 transition-all duration-500 ${
                      animatedItems.has(index) 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <h5 className="text-lg font-bold text-silver-300 text-center">{phase.title}</h5>
                    <ul className="space-y-2">
                      {phase.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className={`text-sm text-gray-300 leading-relaxed transition-all duration-300 ${
                            animatedItems.has(index) 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 translate-x-4'
                          }`}
                          style={{ transitionDelay: `${(index * 200) + (featureIndex * 100)}ms` }}
                        >
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-6 w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-silver-300 rounded-full"
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
            </div>

            {/* Mobile view - Collapsed scrollable with side progress bar */}
            <div className="md:hidden">
              <div className="max-h-96 overflow-y-auto scrollbar-hide">
                <div className="flex gap-4">
                  {/* Progress bar on the left */}
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-full bg-gray-700 rounded-full relative overflow-hidden">
                      <div 
                        className="absolute top-0 w-full bg-silver-300 rounded-full"
                        style={{ height: `${progressWidth}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Stacked phases */}
                  <div className="flex-1 space-y-4">
                    {phases.map((phase, index) => (
                      <div 
                        key={index} 
                        className={`liquid-glass liquid-glass-interactive rounded-lg p-4 transition-all duration-500 ${
                          animatedItems.has(index) 
                            ? 'opacity-100 translate-x-0 scale-100' 
                            : 'opacity-0 translate-x-8 scale-95'
                        }`}
                        style={{ transitionDelay: `${index * 200}ms` }}
                      >
                        <h5 className="text-lg font-bold text-silver-300 mb-3">{phase.title}</h5>
                        <ul className="space-y-2">
                          {phase.features.map((feature, featureIndex) => (
                            <li 
                              key={featureIndex} 
                              className={`text-sm text-gray-300 leading-relaxed transition-all duration-300 ${
                                animatedItems.has(index) 
                                  ? 'opacity-100 translate-y-0' 
                                  : 'opacity-0 translate-y-4'
                              }`}
                              style={{ transitionDelay: `${(index * 200) + (featureIndex * 100)}ms` }}
                            >
                              • {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
