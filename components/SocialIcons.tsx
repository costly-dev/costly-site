export default function SocialIcons() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92548-PjbixvdLQyu430F4s4CmF5WI3Iw4wc.png",
      url:"https://www.linkedin.com/company/its-costly",
      color: "bg-yellow-400",
    },
    {
      name: "GitHub",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/github_PNG40-7dxspWPkVl1nFKWV2KIZX6Rh4xgN8x.png",
      url:"https://github.com/costly-dev",
      color: "bg-yellow-400",
    },
    {
      name: "Instagram",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/insta-vA3pfyrlFknPW65GP8nMGDZAVhlwnD.png",
      url:"/coming-soon",
      color: "bg-yellow-400",
    },
    {
      name: "Discord",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/discord-Pl5crUf3G0Qxft6XVMAP0B0YAm9QN1.png",
      url:"/coming-soon",
      color: "bg-yellow-400",
    },
    {
      name: "Reddit",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Reddit-ynPmaOineKwe990ip45P3xXajwfLI9.png",
      url:"/coming-soon",
      color: "bg-yellow-400",
    },
    {
      name: "Figma",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65888-lkdPFWb43zAGXxJc2C6v26FRFZpw3F.png",
      url:"https://www.figma.com/design/64edVxv8mtdyn1EosHyJgR/Costly-App-Flow?node-id=0-1&t=885acFJRJXrLbck3-1",
      color: "bg-yellow-400",
    },
  ]

  return (
    <div className="flex gap-5 flex-wrap">
        {socialLinks.map((social) => (
        <a    // ← ADD THIS
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center hover:scale-110 transition-transform p-2`}
            aria-label={social.name}
        >
            <img
            src={social.icon}
            alt={`${social.name} icon`}
            className="w-full h-full object-contain"
            />
        </a>
        ))}
    </div>
    )
}
