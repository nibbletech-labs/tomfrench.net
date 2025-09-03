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
        // Check if there's a table of contents on the page to determine layout type
        const hasTableOfContents = document.querySelector('aside nav') !== null
        
        if (!hasTableOfContents) {
          // Centered articles with compact waves (350px height, curves at ~140-200px)
          threshold = 220
        } else {
          // Articles with ToC have regular waves (450px)
          threshold = 350
        }
      } else if (pathname === '/') {
        // Homepage might need different threshold
        threshold = 100
      }

      setIsScrolled(window.scrollY > threshold)
    }

    // Check initial scroll position after a small delay to ensure DOM is ready
    setTimeout(handleScroll, 100)

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