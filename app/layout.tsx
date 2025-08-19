import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Providers } from './providers'
import { ThemeToggle } from '@/components/theme-toggle'
import { Navigation } from '@/components/navigation'
import { HomeLogo } from '@/components/home-logo'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tom French - Chief Product Officer',
  description: 'CPO, product leader, and creator. Transforming businesses through customer-centric product strategy and digital innovation.',
  openGraph: {
    title: 'Tom French - Chief Product Officer',
    description: 'CPO, product leader, and creator. Transforming businesses through customer-centric product strategy and digital innovation.',
    url: 'https://tomfrench.net',
    siteName: 'Tom French',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
          {/* Modern Centered Navigation */}
          <header className="fixed left-0 right-0 top-0 z-50 backdrop-blur-xl" style={{backgroundColor: 'color-mix(in srgb, var(--background) 80%, transparent)'}}>
            <nav className="mx-auto flex h-20 max-w-6xl items-center px-6">
              <div className="flex w-full items-center justify-between">
                {/* Logo - now a circular TF button when not on homepage */}
                <HomeLogo />
                
                {/* Center Navigation */}
                <Navigation />
                
                {/* Right side */}
                <div className="flex items-center gap-4">
                  <Link href="/contact" className="btn-primary text-sm">
                    Contact
                  </Link>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-grow pt-20">
            {children}
          </main>

          {/* Simple Footer */}
          <footer className="border-t" style={{borderColor: 'var(--border)'}}>
            <div className="mx-auto max-w-5xl px-6 py-12">
              <div className="text-center text-sm text-muted">
                © {new Date().getFullYear()} Tom French
              </div>
            </div>
          </footer>
        </div>
        </Providers>
      </body>
    </html>
  )
}