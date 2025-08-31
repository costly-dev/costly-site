export default function SocialIcons() {
  const socialLinks = [
    { name: "LinkedIn", icon: "💼", url: "#", color: "bg-blue-600" },
    { name: "GitHub", icon: "🐱", url: "#", color: "bg-gray-800" },
    { name: "Instagram", icon: "📷", url: "#", color: "bg-pink-600" },
    { name: "Discord", icon: "🎮", url: "#", color: "bg-indigo-600" },
    { name: "Reddit", icon: "🤖", url: "#", color: "bg-orange-600" },
    { name: "Figma", icon: "🎨", url: "#", color: "bg-purple-600" },
  ]

  return (
    <div className="flex gap-4 flex-wrap">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white text-xl hover:scale-110 transition-transform`}
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}
