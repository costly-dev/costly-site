export default function SocialIcons() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92548-PjbixvdLQyu430F4s4CmF5WI3Iw4wc.png",
      url:"https://www.linkedin.com/company/its-costly",
      color: "bg-yellow-400", // Changed from blue to yellow background
    },
    {
      name: "GitHub",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/github_PNG40-7dxspWPkVl1nFKWV2KIZX6Rh4xgN8x.png", // Updated to new GitHub icon without white edges
      url:"https://github.com/costly-dev",
      color: "bg-yellow-400", // Changed from gray to yellow background
    },
    {
      name: "Instagram",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/insta-vA3pfyrlFknPW65GP8nMGDZAVhlwnD.png", // Updated Instagram icon to new version without white edges
      url:"/coming-soon",
      color: "bg-yellow-400",
    },
    {
      name: "Discord",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/discord-Pl5crUf3G0Qxft6XVMAP0B0YAm9QN1.png", // Updated to new Discord icon without white edges
      url:"/coming-soon",
      color: "bg-yellow-400", // Changed from indigo to yellow background
    },
    {
      name: "Reddit",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Reddit-ynPmaOineKwe990ip45P3xXajwfLI9.png", // Updated to new Reddit icon without white edges
      url:"/coming-soon",
      color: "bg-yellow-400", // Changed from orange to yellow background
    },
    {
      name: "Figma",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65888-lkdPFWb43zAGXxJc2C6v26FRFZpw3F.png",
      url:"https://www.figma.com/design/64edVxv8mtdyn1EosHyJgR/Costly-App-Flow?node-id=0-1&t=885acFJRJXrLbck3-1",
      color: "bg-yellow-400", // Changed from gray to yellow background
    },
  ]

  return (
    <div className="flex gap-5 flex-wrap">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center hover:scale-110 transition-transform p-2`}
          aria-label={social.name}
        >
          <img
            src={social.icon || "/placeholder.svg"}
            alt={`${social.name} icon`}
            className="w-full h-full object-contain"
          />
        </a>
      ))}
    </div>
  )
}
