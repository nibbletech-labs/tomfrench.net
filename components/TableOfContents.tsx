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
        rootMargin: '-20% 0% -70% 0%',
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
      const offset = 100 // Account for fixed header
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
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
                    ${isActive ? 'font-medium' : ''}
                    ${isH3 ? 'text-xs' : 'text-sm'}
                  `}
                  style={{
                    color: isActive 
                      ? 'var(--toc-text-active)' 
                      : 'var(--toc-text-inactive)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--toc-text-hover)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--toc-text-inactive)'
                    }
                  }}
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