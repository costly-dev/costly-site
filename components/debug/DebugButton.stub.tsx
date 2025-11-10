// Stub file to prevent build failures when DebugButton.tsx is gitignored
// This file should be committed to git
// The actual DebugButton.tsx can be gitignored for local development

"use client"

import { useState, useEffect } from "react"

interface DebugButtonProps {
  debugMode: boolean
  onToggleDebug: () => void
  onReset: () => void
}

export default function DebugButton({ debugMode, onToggleDebug, onReset }: DebugButtonProps) {
  const [RealDebugButton, setRealDebugButton] = useState<React.ComponentType<DebugButtonProps> | null>(null)

  // In development, try to load the real DebugButton if it exists
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      // Use a dynamically constructed path to avoid webpack static analysis
      // Construct path dynamically so webpack can't statically analyze it
      const currentDir = '.'
      const debugFile = 'DebugButton'
      const debugPath = `${currentDir}/${debugFile}`
      
      // Use a function to prevent webpack from analyzing the import
      const loadRealDebug = async () => {
        try {
          // Use Function constructor to prevent webpack from analyzing the import
          const importFunc = new Function('path', 'return import(path)')
          const module = await importFunc(debugPath)
          return module
        } catch {
          return null
        }
      }
      
      loadRealDebug()
        .then((module: any) => {
          if (module?.default) {
            setRealDebugButton(() => module.default)
          }
        })
        .catch(() => {
          // Real DebugButton not available, use stub implementation
        })
    }
  }, [])

  // If real DebugButton is loaded, use it
  if (RealDebugButton) {
    return <RealDebugButton debugMode={debugMode} onToggleDebug={onToggleDebug} onReset={onReset} />
  }

  // Stub implementation - render nothing in production, basic UI in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  // Basic stub UI for development when real DebugButton is not available
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      <button
        onClick={onToggleDebug}
        className={`px-3 py-2 text-xs font-mono rounded-lg transition-all ${
          debugMode 
            ? 'bg-red-500/80 hover:bg-red-500 text-white' 
            : 'bg-gray-800/50 hover:bg-gray-800 text-white/60 hover:text-white'
        }`}
        title="Toggle Debug Mode (Stub)"
      >
        DEBUG {debugMode ? 'ON' : 'OFF'} (STUB)
      </button>
      {debugMode && (
        <button
          onClick={onReset}
          className="px-3 py-2 text-xs font-mono bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg transition-all"
          title="Reset all states and clear cache"
        >
          RESET
        </button>
      )}
    </div>
  )
}

