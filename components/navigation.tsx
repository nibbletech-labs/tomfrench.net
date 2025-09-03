'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
  { href: '/articles', label: 'Articles' },
  { href: '/projects', label: 'Projects' },
  { href: '/resources', label: 'Resources' },
]

export function Navigation() {
  const pathname = usePathname()
  const [showMasks, setShowMasks] = useState(true)
  
  useEffect(() => {
    const handleScroll = () => {
      // Only apply masks on article pages with ToC
      if (pathname?.startsWith('/articles/')) {
        const hasTableOfContents = document.querySelector('aside nav') !== null
        
        if (hasTableOfContents) {
          // Hide masks when scrolled past threshold
          const threshold = 250 // Start hiding masks before content reaches nav
          setShowMasks(window.scrollY < threshold)
        } else {
          // No masks needed for centered articles
          setShowMasks(false)
        }
      } else {
        // No masks needed for other pages
        setShowMasks(false)
      }
    }
    
    // Check initial state
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
      {/* Single continuous masking div behind all nav items */}
      <div 
        className={`absolute pointer-events-none transition-opacity duration-300 ${
          showMasks ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          top: '-80px', // Extend to top of nav bar
          left: '-8rem', // Extend well beyond nav items
          right: '-8rem', // Extend well beyond nav items
          height: '80px', // Height of nav bar
          background: 'hsl(var(--hue-secondary) var(--sat-high) var(--light-400))', // Use CSS variable for wave color
          zIndex: -1,
        }}
      />
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium nav-link relative ${isActive ? 'nav-link-active' : ''}`}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}