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
  const [headerFade, setHeaderFade] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const phases = [
    {
      title: "Foundation",
      status: "completed",
      date: "Q4 2025",
      progress: 100,
      description: "Core app infrastructure and basic functionality",
      features: [
        "Native iOS app with FamilyControls integration",
        "Stripe payment processing setup",
        "Convex cloud database architecture", 
        "Clerk authentication system",
        "Basic UI/UX implementation"
      ],
    },
    {
      title: "Core Features",
      status: "in-progress", 
      date: "Q1 2026",
      progress: 65,
      description: "Essential app blocking and penalty system",
      features: [
        "App blocking via ManagedSettings framework",
        "Penalty charge system with Stripe",
        "Session timer and focus tracking",
        "Basic user dashboard",
        "In-app balance management"
      ],
    },
    {
      title: "Accountability",
      status: "planned",
      date: "Q2 2026", 
      progress: 0,
      description: "Advanced penalty and reward systems with streak tracking",
      features: [
        "Penalty escalation tiers",
        "Streak tracking and rewards",
        "Withdrawal goal requirements",
        "Tamper-proof enforcement",
        "Advanced analytics dashboard"
      ],
    },
    {
      title: "Premium",
      status: "planned",
      date: "Q3 2026",
      progress: 0,
      description: "Subscription model and advanced features",
      features: [
        "$2.99/month premium subscription",
        "Advanced block list customization",
        "Difficulty multiplier settings",
        "Reward tracking and history",
        "Priority customer support"
      ],
    },
    {
      title: "Enterprise",
      status: "planned", 
      date: "Q4 2026+",
      progress: 0,
      description: "Enterprise features and platform expansion",
      features: [
        "Plaid bank integration",
        "Team accountability features",
        "API access for developers",
        "Advanced team analytics",
        "Multi-platform support (Android, Web)"
      ],
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
            
            // Animate progress bar smoothly using requestAnimationFrame
            setTimeout(() => {
              // Calculate total progress across all phases
              const totalProgress = phases.reduce((sum, phase) => sum + phase.progress, 0) / phases.length
              const targetWidth = Math.round(totalProgress) // Use actual progress percentage
              const duration = 2000 // 2 seconds for smooth animation
              const startTime = performance.now()
              
              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                
                // Use easeOutCubic for smooth deceleration
                const easeOutCubic = 1 - Math.pow(1 - progress, 3)
                const currentWidth = targetWidth * easeOutCubic
                
                setProgressWidth(currentWidth)
                
                if (progress < 1) {
                  requestAnimationFrame(animate)
                }
              }
              
              requestAnimationFrame(animate)
            }, 1000) // Start after phases begin animating
          } else {
            // Reset animation state when leaving view
            setIsVisible(false)
            setAnimatedItems(new Set())
            setProgressWidth(0)
          }
        })
      },
      { threshold: 0.1 }
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

  // Handle header fade effect when title gets covered
  useEffect(() => {
    const handleScroll = () => {
      const roadmapSection = document.getElementById('roadmap')
      if (roadmapSection) {
        const headerElement = roadmapSection.querySelector('header')
        if (headerElement) {
          const headerRect = headerElement.getBoundingClientRect()
          const isHeaderCovered = headerRect.top < 100 // Fade when header is within 100px of top
          setHeaderFade(isHeaderCovered)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} id="roadmap" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <header className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'translate-y-0' : 'opacity-0 translate-y-8'
        } ${headerFade ? 'opacity-0 scale-95' : isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Development Roadmap
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Our planned features and development timeline for Costly
          </p>
        </header>
        
        {/* Scroll indicator - completely outside the roadmap container */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/>
            </svg>
            <span>Swipe to explore phases</span>
          </div>
        </div>

        <div className="mb-16">
          <div className="liquid-glass liquid-glass-intense rounded-2xl p-6 sm:p-8">

            {/* Horizontal scrolling for all devices */}
            <div className="overflow-x-auto scrollbar-hide scroll-smooth">
              <div className="flex gap-6 pt-2 pb-4" style={{ width: 'max-content' }}>
                {phases.map((phase, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col w-80 min-h-[500px] transition-all duration-500 ${
                      animatedItems.has(index) 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {/* Liquid Glass Card */}
                    <div className="liquid-glass liquid-glass-interactive roadmap-card-glow rounded-xl p-6 h-full flex flex-col">
                      {/* Phase Header - Fixed height */}
                      <div className="text-center flex-shrink-0 mb-4">
                        <div className="text-xs text-white/60 mb-1">Phase {index + 1}</div>
                        <h5 className="text-lg font-bold text-white/90 mb-2 min-h-[2.5rem] flex items-center justify-center whitespace-nowrap">{phase.title}</h5>
                        <div className="flex items-center justify-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                          phase.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : phase.status === 'in-progress'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {phase.status === 'completed' ? (
                            <>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                              </svg>
                              Completed
                            </>
                          ) : phase.status === 'in-progress' ? (
                            <>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                              </svg>
                              In Progress
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                              </svg>
                              Planned
                            </>
                          )}
                        </span>
                          <span className="text-xs text-white/60">{phase.date}</span>
                        </div>
                        <p className="text-xs text-white/70 mb-3 min-h-[2.5rem] flex items-center justify-center">{phase.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-black/20 rounded-full overflow-hidden mb-3">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              phase.status === 'completed' 
                                ? 'bg-green-400' 
                                : phase.status === 'in-progress'
                                ? 'bg-blue-400'
                                : 'bg-gray-400'
                            }`}
                            style={{ width: `${phase.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/60">{phase.progress}% Complete</span>
                      </div>
                    
                      {/* Features List - Flexible height */}
                      <ul className="space-y-2 flex-1">
                        {phase.features.map((feature, featureIndex) => (
                          <li 
                            key={featureIndex} 
                            className={`text-sm text-white/70 leading-relaxed transition-all duration-300 ${
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
                  </div>
                ))}
              </div>
              
              {/* Horizontal progress bar - Liquid Glass style */}
              <div className="mt-8 h-2 bg-black/20 backdrop-blur-sm border border-white/10 rounded-full overflow-hidden" style={{ width: `${(320 + 24) * phases.length}px` }}>
                <div 
                  className="h-full bg-gradient-to-r from-white/20 to-white/40 backdrop-blur-sm rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
