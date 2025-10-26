"use client"

interface QuickNavigationProps {
  onNavigate: (section: string) => void
  className?: string
}

export default function QuickNavigation({ onNavigate, className = "" }: QuickNavigationProps) {
  return (
    <div className={`flex justify-center items-center gap-4 ${className}`}>
      <button
        onClick={() => onNavigate('home')}
        className="text-white/70 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
        title="Home"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
      </button>
      <button
        onClick={() => onNavigate('about')}
        className="text-white/70 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
        title="About"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
        </svg>
      </button>
      <button
        onClick={() => onNavigate('roadmap')}
        className="text-white/70 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
        title="Roadmap"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
      </button>
    </div>
  )
}
