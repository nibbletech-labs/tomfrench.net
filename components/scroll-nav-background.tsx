'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollNavBackground() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      // Different thresholds for different page types
      let threshold = 50 // Default for most pages
      
      if (pathname?.startsWith('/articles/')) {
        // Article pages with waves need higher threshold
        // Waves are 450px, header padding is 80px (pt-20)
        threshold = 350
      } else if (pathname === '/') {
        // Homepage might need different threshold
        threshold = 100
      }

      setIsScrolled(window.scrollY > threshold)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

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