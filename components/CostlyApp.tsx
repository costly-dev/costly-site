"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import Hero from "./Hero"
import Philosophy from "./Philosophy"
import About from "./About"
import Roadmap from "./Roadmap"
import Contact from "./Contact"
import ScrollingNotifications from "./ScrollingNotifications"
import WaitlistModal from "./WaitlistModal"
import LoadingScreen from "./LoadingScreen"

export default function CostlyApp() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      if (sectionId === "roadmap") {
        // For roadmap, scroll so it covers the previous content
        const headerHeight = 100
        const elementPosition = element.offsetTop - (headerHeight * 1.25)
        
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth"
        })
      } else if (sectionId === "home") {
        // For home, scroll to top of notifications (default position)
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      } else if (sectionId === "about") {
        // For about, center on desktop but scroll to top on mobile
        const isMobile = window.innerWidth < 640 // sm breakpoint
        const headerHeight = 100
        
        if (isMobile) {
          // Mobile: scroll to top of section
          window.scrollTo({
            top: element.offsetTop - headerHeight,
            behavior: "smooth"
          })
        } else {
          // Desktop: center it in the viewport
          const viewportHeight = window.innerHeight
          const elementHeight = element.offsetHeight
          const centerPosition = element.offsetTop - headerHeight - (viewportHeight - elementHeight) / 2
          
          window.scrollTo({
            top: Math.max(0, centerPosition),
            behavior: "smooth"
          })
        }
      } else if (sectionId === "contact") {
        // For contact, scroll to the top of the contact section
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth"
        })
      } else {
        // For other sections, use normal positioning
        const headerHeight = 100
        const elementPosition = element.offsetTop - headerHeight
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth"
        })
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "roadmap", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <LoadingScreen onLoadingComplete={() => setIsLoaded(true)} />
      
      <Header
        onWaitlistClick={() => setIsWaitlistOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
        isLoaded={isLoaded}
      />
      <ScrollingNotifications isLoaded={isLoaded} />

      <main>
        <Hero 
          onScrollToAbout={() => scrollToSection("about")} 
          onWaitlistClick={() => setIsWaitlistOpen(true)}
          isLoaded={isLoaded}
        />
        <Philosophy onNavigate={scrollToSection} />
        <About onNavigate={scrollToSection} />
        <Roadmap 
          onNavigate={scrollToSection}
          activeSection={activeSection}
        />
        <Contact onWaitlistClick={() => setIsWaitlistOpen(true)} />
      </main>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  )
}
