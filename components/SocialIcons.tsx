interface SocialIconsProps {
  onScrollToAbout?: () => void
}


export default function SocialIcons({ onScrollToAbout }: SocialIconsProps) {

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92548-PjbixvdLQyu430F4s4CmF5WI3Iw4wc.png",
      url:"https://www.linkedin.com/company/its-costly",
      color: "bg-black border-2 border-white",
    },
    {
      name: "GitHub",
      icon: "/github.png",
      url:"https://github.com/costly-dev",
      color: "bg-black border-2 border-white",
    },
    {
      name: "Instagram",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/insta-vA3pfyrlFknPW65GP8nMGDZAVhlwnD.png",
      url:"/coming-soon",
      color: "bg-black border-2 border-white",
    },
    {
      name: "Discord",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/discord-Pl5crUf3G0Qxft6XVMAP0B0YAm9QN1.png",
      url:"/coming-soon",
      color: "bg-black border-2 border-white",
    },
    {
      name: "Reddit",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Reddit-ynPmaOineKwe990ip45P3xXajwfLI9.png",
      url:"/coming-soon",
      color: "bg-black border-2 border-white",
    },
    // {
    //   name: "Figma",
    //   icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65888-lkdPFWb43zAGXxJc2C6v26FRFZpw3F.png",
    //   url:"https://www.figma.com/design/64edVxv8mtdyn1EosHyJgR/Costly-App-Flow?node-id=0-1&t=885acFJRJXrLbck3-1",
    //   color: "bg-black border-2 border-white",
    // },
  ]

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-center justify-center">
        <div className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap justify-center">
          {socialLinks.map((social) => (
          <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-black rounded-xl flex items-center justify-center hover:scale-110 transition-transform p-1.5"
              aria-label={social.name}
          >
              <img
              src={social.icon}
              alt={`${social.name} icon`}
              className={`w-full h-full object-contain ${
                social.name === "GitHub" ? "scale-150" : 
                social.name === "LinkedIn" ? "scale-125" : 
                ""
              }`}
              />
          </a>
          ))}
        </div>
        
        {onScrollToAbout && (
          <button
            onClick={onScrollToAbout}
            className="px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 text-xs md:text-sm lg:text-base rounded-full font-medium transition-all duration-200 hover:scale-105 backdrop-blur-md shadow-lg liquid-glass-button text-white shimmer shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] flex items-center gap-1.5 whitespace-nowrap"
          >
            Learn more
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/>
            </svg>
          </button>
        )}
    </div>
  )
}
