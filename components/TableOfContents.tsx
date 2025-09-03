'use client'

import { useEffect, useState } from 'react'
import { TocHeading } from '@/lib/markdown-utils'

interface TableOfContentsProps {
  headings: TocHeading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('top')
  
  useEffect(() => {
    // Check if we're at the top of the page
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveId('top')
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 100) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        // Adjust rootMargin to account for fixed header (80px) and some padding
        // Top margin should be negative (header height + buffer)
        // Bottom margin should leave room for next section detection
        rootMargin: '-100px 0% -66% 0%',
        threshold: 0
      }
    )
    
    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      headings.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    
    if (id === 'top') {
      // Scroll to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      setActiveId('top')
    } else {
      const element = document.getElementById(id)
      if (element) {
        const offset = 100 // Account for fixed header (should match rootMargin top value)
        const top = element.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({
          top,
          behavior: 'smooth'
        })
        // Set active immediately for better UX
        setActiveId(id)
      }
    }
  }
  
  if (headings.length === 0) {
    return null
  }
  
  return (
    <aside className="sticky top-24">
      <nav className="text-sm">
        <a
          href="#top"
          onClick={(e) => handleClick(e, 'top')}
          className={`
            block mb-4 text-xs font-bold uppercase tracking-wider
            transition-all duration-200
            ${activeId === 'top'
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }
          `}
        >
          On This Page
        </a>
        <ul className="space-y-2">
          {headings.map((heading) => {
            const isActive = activeId === heading.id
            const isH3 = heading.level === 3
            
            return (
              <li
                key={heading.id}
                className={`${isH3 ? 'ml-3' : ''}`}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`
                    block py-1 leading-relaxed
                    transition-all duration-200
                    ${isActive 
                      ? 'text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                    }
                    ${isH3 ? 'text-xs' : 'text-sm'}
                  `}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}