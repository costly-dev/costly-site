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
  const [usedFonts, setUsedFonts] = useState<number[]>([])
  const [shuffledFonts, setShuffledFonts] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [slotMachineFonts, setSlotMachineFonts] = useState<{font: string, gap: number}[]>([])
  const [hasRouletteTriggered, setHasRouletteTriggered] = useState(false)
  const [isRouletteComplete, setIsRouletteComplete] = useState(false)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const cursiveFonts = [
    'font-dancing-script',
    'font-pacifico',
    'font-kalam',
    'font-caveat',
    'font-great-vibes',
    'font-allura',
    'font-alex-brush',
    'font-satisfy',
    'font-bad-script',
    'font-berkshire-swash',
    'font-cedarville-cursive',
    'font-courgette',
    'font-felipa', 
    'font-gochi-hand',
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
    'font-salsa',
    'font-shadows-into-light',
    'font-shadows-into-light-two',
    'font-sofia',
    'font-tangerine',
    'font-tillana',
    'font-waiting-for-the-sunrise',
  ]

  useEffect(() => {
    // Detect mobile/desktop on mount
    setIsMobile(window.innerWidth < 1024)

    // Set random font after hydration to avoid SSR mismatch
    // Wait for fonts to be ready if available, otherwise randomize immediately
    if (!hasInitialized) {
      const randomizeFont = () => {
        if (cursiveFonts.length > 0) {
          setCurrentFontIndex(Math.floor(Math.random() * cursiveFonts.length))
        }
        setHasInitialized(true)
      }

      // Try to wait for fonts, but don't block if document.fonts isn't available
      if (typeof document !== 'undefined' && (document as any).fonts && (document as any).fonts.ready) {
        (document as any).fonts.ready.then(() => {
          randomizeFont()
        }).catch(() => {
          // Fallback if fonts fail to load
          randomizeFont()
        })
      } else {
        // Immediate fallback
        randomizeFont()
      }
    }

    // Only add scroll listener on desktop
    if (window.innerWidth >= 1024) {
      const handleScroll = () => {
        setScrollY(window.scrollY)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [hasInitialized, cursiveFonts.length])


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
    
  }, [cursiveFonts.length, isMobile])

  // Function to calculate optimal font size for desktop (scale up until right edge reaches center)
  const calculateDesktopFontSize = (fontClass: string): number => {
    if (typeof window === 'undefined') return 60
    
    const tempElement = document.createElement('h1')
    tempElement.textContent = 'Bet Against Addiction'
    tempElement.className = `font-bold leading-tight ${fontClass}`
    tempElement.style.position = 'absolute'
    tempElement.style.visibility = 'hidden'
    tempElement.style.whiteSpace = 'nowrap'
    tempElement.style.top = '-9999px'
    tempElement.style.left = '-9999px'
    tempElement.style.fontSize = '60px' // Start with base size
    
    document.body.appendChild(tempElement)
    
    // Force reflow to get accurate measurements
    tempElement.offsetHeight
    
    const baseWidth = tempElement.offsetWidth
    const screenWidth = window.innerWidth
    const centerX = screenWidth / 2
    
    document.body.removeChild(tempElement)
    
    // Calculate scale factor to make text width reach center
    const scaleFactor = centerX / baseWidth
    
    // Calculate final font size (base 60px * scale factor)
    const finalFontSize = 60 * scaleFactor
    
    // Cap at reasonable maximum (e.g., 120px) and minimum (e.g., 30px)
    return Math.min(Math.max(finalFontSize, 30), 120)
  }


  // State for dynamic font size
  const [dynamicFontSize, setDynamicFontSize] = useState(60)

  // Calculate font size when font changes (all screen sizes)
  useEffect(() => {
    if (typeof window !== 'undefined' && cursiveFonts.length > 0) {
      const currentFont = cursiveFonts[currentFontIndex] || cursiveFonts[0]
      const newFontSize = calculateDesktopFontSize(currentFont)
      setDynamicFontSize(newFontSize)
    }
  }, [currentFontIndex, cursiveFonts, isRouletteComplete])


  // Desktop: One-time scroll detection for roulette trigger
  useEffect(() => {
    if (isMobile || hasRouletteTriggered) return

    let lastScrollPosition = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = Math.abs(currentScrollY - lastScrollPosition)
      
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
  }, [hasRouletteTriggered, isMobile])

  // Mobile/Tablet: Random font on reload only
  useEffect(() => {
    if (!isMobile || shuffledFonts.length === 0) return

    // Set random font on reload for mobile/tablet
    const randomIndex = cursiveFonts.length > 0 ? Math.floor(Math.random() * cursiveFonts.length) : 0
    setCurrentFontIndex(randomIndex)
    setUsedFonts([randomIndex])
  }, [cursiveFonts.length, shuffledFonts, isMobile])

  // One-time roulette animation - triggers once when scrolling starts
  useEffect(() => {
    if (isMobile || hasRouletteTriggered || isRouletteComplete) return

    if (isScrolling && scrollVelocity > 0 && !isSpinning) {
      // Trigger roulette for the first time
      setIsSpinning(true)
      setHasRouletteTriggered(true)
      
      // Generate fonts for the one-time roulette
      const spinFonts: {font: string, gap: number}[] = []
      const totalLines = 6
      
      for (let i = 0; i < totalLines; i++) {
        spinFonts.push({
          font: cursiveFonts.length > 0 ? cursiveFonts[Math.floor(Math.random() * cursiveFonts.length)] || cursiveFonts[0] : cursiveFonts[0] || 'font-dancing-script',
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
        finalFontIndex = shuffled[0] || 0
      } else {
        finalFontIndex = shuffledFonts.length > 0 && usedFonts.length < shuffledFonts.length ? (shuffledFonts[usedFonts.length] || shuffledFonts[0] || 0) : 0
      }
      
      spinFonts.push({
        font: cursiveFonts.length > 0 ? cursiveFonts[finalFontIndex] || cursiveFonts[0] : cursiveFonts[0] || 'font-dancing-script',
        gap: 2.0
      })
      setSlotMachineFonts(spinFonts)
      
        // Set a timeout to complete the roulette
        setTimeout(() => {
          // Use the last font from the current slot machine fonts
          const lastFont = spinFonts[spinFonts.length - 1]
          const fontIndex = cursiveFonts.indexOf(lastFont.font)
          if (fontIndex !== -1 && cursiveFonts.length > 0) {
            setCurrentFontIndex(fontIndex)
            setUsedFonts(prev => [...prev, fontIndex])
          } else if (cursiveFonts.length > 0) {
            setCurrentFontIndex(0)
            setUsedFonts(prev => [...prev, 0])
          }
          setIsSpinning(false)
          setIsScrolling(false)
          setIsRouletteComplete(true)
        }, 2000) // Match CSS animation duration
    }
  }, [isScrolling, scrollVelocity, isSpinning, hasRouletteTriggered, isRouletteComplete, cursiveFonts.length, shuffledFonts, usedFonts, isMobile])

  useEffect(() => {
    // Only apply scroll animation on desktop (lg and up)
    if (isMobile) {
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
  }, [scrollY, isMobile])

  return (
    <section id="home" className="min-h-screen flex items-start justify-center px-3 sm:px-5 lg:px-[76px]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start min-h-screen py-16">
          
          {/* Text content */}
          <div 
            className={`space-y-6 lg:space-y-8 order-2 lg:order-1 transition-all duration-1000 ease-out optimized-animation pl-0 pr-0 relative z-10 text-center lg:text-left ${
              isLoaded 
                ? 'opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transform: isLoaded 
                ? (isMobile ? 'translateY(0px)' : `translateY(${textTransform}px)`)
                : 'translateY(8px)',
              transition: isLoaded ? (isMobile ? 'none' : 'transform 0.1s ease-out') : 'all 1s ease-out'
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
              <div className="slot-machine-container text-center xl:text-left">
                <div className={`${isScrolling ? 'roulette-spinning' : 'roulette-slowdown'}`}>
                  {slotMachineFonts.map((fontData, index) => (
                    <div 
                      key={index} 
                      className={`slot-machine-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-center xl:text-left ${fontData.font} whitespace-nowrap`}
                      style={{
                        marginBottom: `${fontData.gap}em`,
                        fontSize: `${dynamicFontSize}px`,
                        marginLeft: !isMobile ? '-24px' : '0px'
                      }}
                    >
                      <span className="text-silver-300">Bet</span>{" "}
                      <span className="text-white">Against</span>{" "}
                      <span className="text-white">Addiction</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h1
                ref={titleRef}
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-center xl:text-left ${cursiveFonts.length > 0 ? cursiveFonts[currentFontIndex] || cursiveFonts[0] : 'font-dancing-script'} whitespace-nowrap`}
                style={{
                  fontSize: `${dynamicFontSize}px`,
                  marginLeft: !isMobile ? '-24px' : '0px'
                }}
              >
                <span className="text-silver-300">Bet</span>{" "}
                <span className="text-white">Against</span>{" "}
                <span className="text-white">Addiction</span>
              </h1>
            )}
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mt-5 text-center lg:text-left mx-auto lg:mx-0">
              Costly is a behavioral accountability app for iPhone and Mac that connects your focus to real, measurable stakes. You set your own rules: how long you'll stay focused, which apps you'll block, and how much you're willing to risk if you break them.
            </p>
            </header>

            {/* Join Waitlist Button - Full Width */}
            <div className="flex justify-center lg:justify-start w-full max-w-2xl mt-6">
              <Button 
                onClick={onWaitlistClick} 
                variant="primary" 
                className="flex items-center justify-center gap-2 h-12 px-6 w-full !bg-white/90 !text-black shadow-[0_0_25px_rgba(255,255,255,0.6)] stable-button"
              >
                Join Waitlist
              </Button>
            </div>

            {/* Icons Row */}
            <div className="flex justify-center lg:justify-start w-full max-w-2xl mt-4">
              <SocialIcons onScrollToAbout={onScrollToAbout} />
            </div>

            {/* Learn More Button - Mobile Only (separate row) */}
            {onScrollToAbout && (
              <div className="flex justify-center w-full max-w-2xl mt-4 lg:hidden">
                <button
                  onClick={onScrollToAbout}
                  className="px-6 py-3 text-sm rounded-full font-medium transition-all duration-200 hover:scale-105 backdrop-blur-md shadow-lg liquid-glass-button text-white shimmer shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] flex items-center gap-1.5 whitespace-nowrap w-full justify-center"
                >
                  Learn more
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            )}
            
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
              {/* Mobile and small screens - optimize for LCP */}
              <img 
                src="/GraphicsNotif.png" 
                alt="Costly App Preview - iPhone notification showing penalty system"
                className="w-64 h-[520px] sm:w-72 sm:h-[585px] lg:hidden object-contain"
                width={288}
                height={585}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
              
              {/* Desktop - optimize for LCP with compressed default */}
              <img 
                src="/GraphicsNotif_upscaled_compressed.jpg" 
                alt="Costly App Preview - iPhone notification showing penalty system"
                className="hidden lg:block w-[450px] h-[920px] xl:w-[500px] xl:h-[1020px] object-contain transition-opacity duration-300"
                width={500}
                height={1020}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
 