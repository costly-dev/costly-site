"use client"

import { useState, useEffect } from 'react'
import { advancedObfuscateEmail, advancedDeobfuscateEmail } from '../lib/email-obfuscation'

interface ObfuscatedEmailProps {
  email: string
  className?: string
  children?: React.ReactNode
}

export default function ObfuscatedEmail({ email, className = "", children }: ObfuscatedEmailProps) {
  const [isDecrypted, setIsDecrypted] = useState(false)
  const [displayEmail, setDisplayEmail] = useState('')
  const [obfuscatedEmail, setObfuscatedEmail] = useState('')

  useEffect(() => {
    // Create obfuscated version on mount
    const obfuscated = advancedObfuscateEmail(email)
    setObfuscatedEmail(obfuscated)
    
    // Show obfuscated version initially
    setDisplayEmail(obfuscated)
  }, [email])

  const handleClick = () => {
    if (!isDecrypted) {
      // Decrypt and show real email
      const decrypted = advancedDeobfuscateEmail(obfuscatedEmail)
      setDisplayEmail(decrypted)
      setIsDecrypted(true)
    } else {
      // Re-obfuscate
      setDisplayEmail(obfuscatedEmail)
      setIsDecrypted(false)
    }
  }

  const handleMouseEnter = () => {
    if (!isDecrypted) {
      // Show decrypted email on hover
      const decrypted = advancedDeobfuscateEmail(obfuscatedEmail)
      setDisplayEmail(decrypted)
    }
  }

  const handleMouseLeave = () => {
    if (!isDecrypted) {
      // Re-obfuscate when mouse leaves
      setDisplayEmail(obfuscatedEmail)
    }
  }

  return (
    <span
      className={`cursor-pointer select-none transition-all duration-200 hover:text-white ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={isDecrypted ? "Click to obfuscate" : "Click to reveal email"}
    >
      {children || displayEmail}
    </span>
  )
}
