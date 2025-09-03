'use client'

import { useEffect, useState } from 'react'
import { TocHeading } from '@/lib/markdown-utils'

interface TableOfContentsProps {
  headings: TocHeading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
  
  if (headings.length === 0) {
    return null
  }
  
  return (
    <aside className="sticky top-24">
      <nav className="text-sm">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
          On This Page
        </h2>
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