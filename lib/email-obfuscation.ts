// Email obfuscation utility to prevent scraping
export function obfuscateEmail(email: string): string {
  // Simple ROT13-like obfuscation
  return email
    .split('')
    .map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) { // A-Z
        return String.fromCharCode(((code - 65 + 13) % 26) + 65)
      } else if (code >= 97 && code <= 122) { // a-z
        return String.fromCharCode(((code - 97 + 13) % 26) + 97)
      }
      return char
    })
    .join('')
}

export function deobfuscateEmail(obfuscated: string): string {
  // Reverse the obfuscation
  return obfuscated
    .split('')
    .map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) { // A-Z
        return String.fromCharCode(((code - 65 - 13 + 26) % 26) + 65)
      } else if (code >= 97 && code <= 122) { // a-z
        return String.fromCharCode(((code - 97 - 13 + 26) % 26) + 97)
      }
      return char
    })
    .join('')
}

// More advanced obfuscation using base64 and character splitting
export function advancedObfuscateEmail(email: string): string {
  // Split email into parts
  const [localPart, domain] = email.split('@')
  
  // Obfuscate each part separately
  const obfuscatedLocal = btoa(localPart).split('').reverse().join('')
  const obfuscatedDomain = btoa(domain).split('').reverse().join('')
  
  // Add some noise characters
  const noise = ['x', 'y', 'z']
  const obfuscated = `${obfuscatedLocal}${noise[0]}${obfuscatedDomain}${noise[1]}`
  
  return obfuscated
}

export function advancedDeobfuscateEmail(obfuscated: string): string {
  // Remove noise characters
  const cleaned = obfuscated.replace(/[xyz]/g, '')
  
  // Split at the middle (assuming equal length parts)
  const midPoint = Math.floor(cleaned.length / 2)
  const obfuscatedLocal = cleaned.substring(0, midPoint)
  const obfuscatedDomain = cleaned.substring(midPoint)
  
  // Reverse and decode
  const localPart = atob(obfuscatedLocal.split('').reverse().join(''))
  const domain = atob(obfuscatedDomain.split('').reverse().join(''))
  
  return `${localPart}@${domain}`
}
