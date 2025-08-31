"use client"

import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  className?: string
  href?: string
}

export default function Button({ children, onClick, variant = "primary", className = "", href }: ButtonProps) {
  const baseClasses =
    "px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 backdrop-blur-md shadow-lg"

  const variantClasses = {
    primary:
      "bg-yellow-400/90 backdrop-blur-md border border-yellow-300/30 text-black hover:bg-yellow-300/90 shadow-yellow-400/20",
    secondary:
      "bg-gray-800/40 backdrop-blur-md border border-gray-600/40 text-white hover:bg-gray-700/50 shadow-gray-900/30",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
