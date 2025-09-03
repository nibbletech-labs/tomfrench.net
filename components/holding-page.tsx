'use client'

export function HoldingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Animated gradient circle */}
        <div className="mb-8 inline-flex">
          <div className="relative h-32 w-32 mx-auto">
            <div className="absolute inset-0 rounded-full gradient-brand opacity-20 blur-2xl animate-pulse"></div>
            <div className="relative h-32 w-32 rounded-full gradient-brand flex items-center justify-center">
              <span className="text-white text-5xl font-bold">T</span>
            </div>
          </div>
        </div>
        
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
          Coming Soon
        </h1>
        
        <p className="mb-8 text-lg text-secondary">
          I'm currently refreshing my site with new content and features.
        </p>
        
        <div className="flex gap-4 justify-center">
          <a
            href="https://www.linkedin.com/in/tom-french-9386907/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl p-3 transition-all hover:shadow-md"
            style={{backgroundColor: 'var(--hover-bg)', color: 'var(--text-secondary)'}}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}