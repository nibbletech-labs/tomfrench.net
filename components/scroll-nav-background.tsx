'use client'

import { useEffect, useState } from 'react'

export function ScrollNavBackground() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Add background when the main content reaches the nav bar
      // This is roughly when the waves end and article content begins
      // Nav is 80px (h-20), waves are 450px, header padding is 96px (pt-24)
      // So trigger around 350-380px when content is about to go under nav
      setIsScrolled(window.scrollY > 360)
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