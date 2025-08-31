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
  const baseClasses = "px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105"

  const variantClasses = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-300",
    secondary: "bg-gray-800/50 backdrop-blur-sm border border-gray-600 text-white hover:bg-gray-700/50",
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
