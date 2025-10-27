"use client"

import { useEffect, useState, useRef } from "react"
import SocialIcons from "./SocialIcons"
import Button from "./Button"

interface HeroProps {
  onScrollToAbout: () => void
  onWaitlistClick: () => void
  isLoaded?: boolean
}

export default function Hero({ onScrollToAbout, onWaitlistClick, isLoaded = false }: HeroProps) {
  const [scrollY, setScrollY] = useState(0)
  const [textTransform, setTextTransform] = useState(0)
  const [currentFontIndex, setCurrentFontIndex] = useState(0) // Start with consistent font
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [usedFonts, setUsedFonts] = useState<number[]>([])
  const [shuffledFonts, setShuffledFonts] = useState<number[]>([])
  const [fontScales, setFontScales] = useState<number[]>([])
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [slotMachineFonts, setSlotMachineFonts] = useState<{font: string, gap: number}[]>([])
  const [hasRouletteTriggered, setHasRouletteTriggered] = useState(false)
  const [isRouletteComplete, setIsRouletteComplete] = useState(false)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const cursiveFonts = [
    'font-norican',
    'font-yesteryear',
    'font-amita',
    'font-dancing-script',
    'font-pacifico',
    'font-kalam',
    'font-caveat',
    'font-great-vibes',
    'font-allura',
    'font-alex-brush',
    'font-satisfy',
    'font-yellowtail',
    'font-bad-script',
    'font-berkshire-swash',
    'font-cedarville-cursive',
    'font-courgette',
    'font-felipa',
    'font-gloria-hallelujah',
    'font-gochi-hand',
    'font-handlee',
    'font-indie-flower',
    'font-itim',
    'font-kaushan-script',
    'font-lobster',
    'font-lobster-two',
    'font-marck-script',
    'font-merienda',
    'font-niconne',
    'font-nothing-you-could-do',
    'font-pinyon-script',
    'font-princess-sofia',
    'font-redressed',
    'font-rochester',
    'font-sail',
    'font-salsa',
    'font-shadows-into-light',
    'font-shadows-into-light-two',
    'font-sofia',
    'font-sue-ellen-francisco',
    'font-tangerine',
    'font-the-girl-next-door',
    'font-tillana',
    'font-waiting-for-the-sunrise',
    'font-walter-turncoat',
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Detect mobile/desktop on mount
    setIsMobile(window.innerWidth < 1024)

    // Set random font after hydration to avoid SSR mismatch
    if (!hasInitialized) {
      setCurrentFontIndex(Math.floor(Math.random() * cursiveFonts.length))
      setHasInitialized(true)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasInitialized, cursiveFonts.length])

  // Function to measure font size and calculate scale
  const measureFontSize = (fontClass: string): number => {
    // Create a temporary element to measure the font
    const tempElement = document.createElement('h1')
    tempElement.className = `text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight ${isMobile ? 'text-center' : 'text-left'} ${fontClass} whitespace-nowrap`
    tempElement.textContent = 'Focus That Counts'
    tempElement.style.position = 'absolute'
    tempElement.style.visibility = 'hidden'
    tempElement.style.top = '-9999px'
    tempElement.style.left = '-9999px'
    tempElement.style.width = 'auto'
    tempElement.style.height = 'auto'
    
    document.body.appendChild(tempElement)
    
    // Force a reflow to ensure accurate measurements
    tempElement.offsetHeight
    
    const rect = tempElement.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    document.body.removeChild(tempElement)
    
    // Calculate target width based on screen size - should not cross middle line
    const screenWidth = window.innerWidth
    const maxWidth = isMobile 
      ? Math.max(screenWidth - 100, 200) // Full width minus padding on mobile
      : Math.max(screenWidth / 2 - 150, 200) // Half screen minus padding on desktop
    const targetWidth = Math.min(maxWidth, isMobile ? 400 : 500) // Different caps for mobile/desktop
    const targetHeight = 100 // Target height in pixels
    
    const widthScale = targetWidth / width
    const heightScale = targetHeight / height
    
    // Use the smaller scale to ensure text fits within screen bounds
    const scale = Math.min(widthScale, heightScale, 1.0) // Reduced max scale
    
    return Math.max(scale, 0.5) // Reduced minimum scale
  }

  // Initialize shuffled fonts and measure font sizes on component mount
  useEffect(() => {
    const shuffleArray = (array: number[]) => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }
    
    const fontIndices = Array.from({ length: cursiveFonts.length }, (_, i) => i)
    setShuffledFonts(shuffleArray(fontIndices))
    
    // Measure all font sizes
    const scales = cursiveFonts.map(fontClass => measureFontSize(fontClass))
    setFontScales(scales)
  }, [cursiveFonts.length, isMobile])

  // Recalculate font scales on window resize
  useEffect(() => {
    const handleResize = () => {
      const scales = cursiveFonts.map(fontClass => measureFontSize(fontClass))
      setFontScales(scales)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [cursiveFonts.length])


  // Desktop: One-time scroll detection for roulette trigger
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop || hasRouletteTriggered) return

    let lastScrollPosition = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = Math.abs(currentScrollY - lastScrollPosition)
      
      // Detect scroll direction
      if (currentScrollY > lastScrollPosition) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollPosition) {
        setScrollDirection('up')
      }
      
      // Calculate scroll velocity
      const velocity = scrollDifference
      setScrollVelocity(velocity)
      setIsScrolling(true)
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
        setScrollVelocity(0)
      }, 100)
      
      lastScrollPosition = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [hasRouletteTriggered])

  // Mobile/Tablet: Random font on reload only
  useEffect(() => {
    const isMobileOrTablet = window.innerWidth < 1024
    if (!isMobileOrTablet || shuffledFonts.length === 0) return

    // Set random font on reload for mobile/tablet
    const randomIndex = Math.floor(Math.random() * cursiveFonts.length)
    setCurrentFontIndex(randomIndex)
    setUsedFonts([randomIndex])
  }, [cursiveFonts.length, shuffledFonts])

  // One-time roulette animation - triggers once when scrolling starts
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop || hasRouletteTriggered || isRouletteComplete) return

    if (isScrolling && scrollVelocity > 0 && !isSpinning) {
      // Trigger roulette for the first time
      setIsSpinning(true)
      setHasRouletteTriggered(true)
      
      // Generate fonts for the one-time roulette
      const spinFonts = []
      const totalLines = 6
      
      for (let i = 0; i < totalLines; i++) {
        spinFonts.push({
          font: cursiveFonts[Math.floor(Math.random() * cursiveFonts.length)],
          gap: i < 3 ? 1.0 : (i - 2) * 1.5
        })
      }
      
      // Add final font
      let finalFontIndex: number
      if (usedFonts.length >= cursiveFonts.length) {
        setUsedFonts([])
        const fontIndices = Array.from({ length: cursiveFonts.length }, (_, i) => i)
        const shuffled = [...fontIndices]
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        setShuffledFonts(shuffled)
        finalFontIndex = shuffled[0]
      } else {
        finalFontIndex = shuffledFonts[usedFonts.length]
      }
      
      spinFonts.push({
        font: cursiveFonts[finalFontIndex],
        gap: 2.0
      })
      setSlotMachineFonts(spinFonts)
      
      // Set a timeout to complete the roulette
      setTimeout(() => {
        // Use the last font from the current slot machine fonts
        const lastFont = spinFonts[spinFonts.length - 1]
        const fontIndex = cursiveFonts.indexOf(lastFont.font)
        if (fontIndex !== -1) {
          setCurrentFontIndex(fontIndex)
          setUsedFonts(prev => [...prev, fontIndex])
        }
        setIsSpinning(false)
        setIsScrolling(false)
        setIsRouletteComplete(true)
      }, 2000) // Match CSS animation duration
    }
  }, [isScrolling, scrollVelocity, isSpinning, hasRouletteTriggered, isRouletteComplete, cursiveFonts.length, shuffledFonts, usedFonts])

  useEffect(() => {
    // Only apply scroll animation on desktop (lg and up)
    if (window.innerWidth < 1024) {
      setTextTransform(0)
      return
    }

    // More stable scroll-based movement with reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setTextTransform(0)
      return
    }

    // Simple scroll-based movement - text moves down as you scroll
    const scrollProgress = Math.min(scrollY / 700, 1) // Move over 600px of scroll (faster response)
    const maxMovement = 700 // Reduced maximum movement for better stability
    
    setTextTransform(scrollProgress * maxMovement)
  }, [scrollY])

  return (
    <section id="home" className="min-h-screen flex items-start justify-center px-3 sm:px-5 lg:px-[76px]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start min-h-screen py-16">
          
          {/* Text content */}
          <div 
            className={`space-y-6 lg:space-y-8 order-2 lg:order-1 transition-all duration-1000 ease-out optimized-animation pl-0 relative z-10 text-center xl:text-left ${
              isLoaded 
                ? 'opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transform: isLoaded ? `translateY(${textTransform}px)` : 'translateY(8px)',
              transition: isLoaded ? 'transform 0.1s ease-out' : 'all 1s ease-out'
            }}
          >
            <header>
            {/* Font options - change the class to test different cursive fonts:
                font-londrina-shadow (current - bold display)
                font-dancing-script (elegant cursive)
                font-pacifico (casual cursive)
                font-kalam (handwritten cursive)
                font-caveat (handwriting cursive)
                font-comfortaa (rounded cursive)
                font-quicksand (modern cursive)
            */}
            {isSpinning && !isMobile ? (
              <div className="slot-machine-container">
                <div className={`${isScrolling ? 'roulette-spinning' : 'roulette-slowdown'}`}>
                  {slotMachineFonts.map((fontData, index) => (
                    <div 
                      key={index} 
                      className={`slot-machine-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-center xl:text-left ${fontData.font} whitespace-nowrap`}
                      style={{
                        marginBottom: `${fontData.gap}em`,
                        transformOrigin: isMobile ? 'center center' : 'left center'
                      }}
                    >
                      <span className="text-silver-300">Focus</span>{" "}
                      <span className="text-white">That</span>{" "}
                      <span className="text-white">Counts</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h1
                ref={titleRef}
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-center xl:text-left ${cursiveFonts[currentFontIndex]} whitespace-nowrap`}
                style={{
                  transform: `scale(${fontScales[currentFontIndex] || 1})`,
                  transformOrigin: isMobile ? 'center center' : 'left center'
                }}
              >
                <span className="text-silver-300">Focus</span>{" "}
                <span className="text-white">That</span>{" "}
                <span className="text-white">Counts</span>
              </h1>
            )}
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mt-5 text-center lg:text-left mx-auto lg:mx-0">
              Costly is a behavioral accountability app for iPhone and Mac that connects your focus to real, measurable stakes. You set your own rules: how long you'll stay focused, which apps you'll block, and how much you're willing to risk if you break them.
            </p>
            </header>

            {/* Join Waitlist Button */}
            <div className="flex justify-center lg:justify-start">
              <Button 
                onClick={onWaitlistClick} 
                variant="primary" 
                className="flex items-center justify-center gap-2 h-12 px-6 w-full max-w-2xl !bg-white/90 !text-black shadow-[0_0_25px_rgba(255,255,255,0.6)] stable-button"
              >
                Join Waitlist
              </Button>
            </div>

            <div className="flex justify-center w-full max-w-2xl mt-6 lg:mt-0">
              <SocialIcons onScrollToAbout={onScrollToAbout} />
            </div>
            
          </div>

          {/* App preview */}
          <div className={`flex justify-center lg:justify-end order-1 lg:order-2 transition-all duration-1000 ease-out delay-300 ${
            isLoaded 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-8 opacity-0'
          }`}>
            <div className="relative hero-image-container lg:mr-0">
              {/* Mobile desktop recommendation */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 lg:hidden">
                <p className="text-xs text-white/40 text-center whitespace-nowrap">
                  (This site looks better on desktop)
                </p>
              </div>
              {/* Mobile and small screens - use original image */}
              <img 
                src="/GraphicsNotif.png" 
                alt="Costly App Preview - iPhone notification showing penalty system"
                className="w-64 h-[520px] sm:w-72 sm:h-[585px] lg:hidden object-contain"
                width={288}
                height={585}
                loading="eager"
                decoding="async"
              />
              
              {/* Desktop - use compressed image */}
              <img 
                src="/GraphicsNotif_upscaled_compressed.jpg" 
                alt="Costly App Preview - iPhone notification showing penalty system"
                className="hidden lg:block w-[450px] h-[920px] xl:w-[500px] xl:h-[1020px] object-contain"
                width={500}
                height={1020}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
 