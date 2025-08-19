'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function HomeLogo() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  // Hide on homepage
  if (isHomepage) {
    return <div className="w-10" /> // Spacer to maintain layout
  }

  return (
    <Link 
      href="/" 
      className="flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
      title="Home"
    >
      TF
    </Link>
  )
}