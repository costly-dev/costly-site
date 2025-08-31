"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import Hero from "./Hero"
import About from "./About"
import Roadmap from "./Roadmap"
import ScrollingNotifications from "./ScrollingNotifications"
import WaitlistModal from "./WaitlistModal"

export default function CostlyApp() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "roadmap"]
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
      <Header
        onWaitlistClick={() => setIsWaitlistOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />
      <ScrollingNotifications />

      <main>
        <Hero onScrollToAbout={() => scrollToSection("about")} />
        <About />
        <Roadmap 
          onNavigate={scrollToSection}
          activeSection={activeSection}
        />
      </main>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  )
}
