'use client'

import { useEffect, useState } from 'react'

export function ScrollNavBackground() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled more than 50px
      setIsScrolled(window.scrollY > 50)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className={`absolute inset-0 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-xl opacity-100' 
          : 'backdrop-blur-none opacity-0'
      }`}
      style={{
        backgroundColor: isScrolled 
          ? 'color-mix(in srgb, var(--background) 85%, transparent)' 
          : 'transparent'
      }}
    />
  )
}