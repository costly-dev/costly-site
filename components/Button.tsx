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
      "liquid-glass-button text-white",
    secondary:
      "liquid-glass text-white/90 hover:text-white",
  }

  const glowClasses = {
    primary:
      "shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]",
    secondary: "",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${glowClasses[variant]} ${className}`

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
