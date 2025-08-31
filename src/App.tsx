"use client"

import { useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Roadmap from "./components/Roadmap"
import ScrollingNotifications from "./components/ScrollingNotifications"
import WaitlistModal from "./components/WaitlistModal"

function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollingNotifications />
      <Header onWaitlistClick={() => setIsWaitlistOpen(true)} onNavigate={scrollToSection} />

      <main>
        <Hero onScrollToAbout={() => scrollToSection("about")} />
        <About />
        <Roadmap />
      </main>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  )
}

export default App
