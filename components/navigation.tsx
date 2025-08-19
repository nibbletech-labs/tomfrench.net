'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/articles', label: 'Articles' },
  { href: '/projects', label: 'Projects' },
  { href: '/resources', label: 'Resources' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}