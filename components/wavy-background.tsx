export function WavyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1 - Furthest back, teal/cyan */}
      <svg
        className="absolute -top-20 left-0 w-full opacity-10 dark:opacity-5"
        viewBox="0 0 1440 560"
        preserveAspectRatio="none"
        style={{ height: '70vh' }}
      >
        <path
          fill="var(--gradient-from)"
          d="M0,320 C320,400 640,360 960,380 C1280,400 1440,350 1440,350 L1440,0 L0,0 Z"
        />
      </svg>

      {/* Layer 2 - Middle layer, blue */}
      <svg
        className="absolute -top-10 left-0 w-full opacity-15 dark:opacity-8"
        viewBox="0 0 1440 480"
        preserveAspectRatio="none"
        style={{ height: '60vh' }}
      >
        <path
          fill="var(--gradient-via)"
          d="M0,280 C480,380 960,320 1440,360 L1440,0 L0,0 Z"
        />
      </svg>

      {/* Layer 3 - Front layer, purple gradient */}
      <svg
        className="absolute top-0 left-0 w-full opacity-20 dark:opacity-10"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ height: '50vh' }}
      >
        <defs>
          <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'var(--gradient-via)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--gradient-to)' }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#purple-gradient)"
          d="M0,240 C360,320 720,280 1080,300 C1260,310 1440,280 1440,280 L1440,0 L0,0 Z"
        />
      </svg>
    </div>
  )
}

// Alternative: Geometric angular waves matching your brand
export function GeometricWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute top-0 left-0 w-full opacity-25 dark:opacity-15"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ height: '50vh' }}
      >
        <defs>
          <linearGradient id="geo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--gradient-from)' }} />
            <stop offset="33%" style={{ stopColor: 'var(--gradient-via)' }} />
            <stop offset="66%" style={{ stopColor: 'var(--gradient-to)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--accent-blood-orange)' }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#geo-gradient)"
          d="M0,100 L240,150 L480,80 L720,140 L960,90 L1200,130 L1440,100 L1440,0 L0,0 Z"
        />
        <path
          fill="url(#geo-gradient)"
          fillOpacity="0.5"
          d="M0,200 L360,250 L720,180 L1080,240 L1440,200 L1440,0 L0,0 Z"
        />
      </svg>
    </div>
  )
}

// Subtle animated version
export function AnimatedWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute top-0 left-0 w-full opacity-20 dark:opacity-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '40vh' }}
      >
        <defs>
          <linearGradient id="animated-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'var(--gradient-from)' }}>
              <animate attributeName="offset" values="0;0.5;0" dur="20s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" style={{ stopColor: 'var(--gradient-via)' }}>
              <animate attributeName="offset" values="0.5;1;0.5" dur="20s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" style={{ stopColor: 'var(--gradient-to)' }}>
              <animate attributeName="offset" values="1;0.5;1" dur="20s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <path
          fill="url(#animated-gradient)"
          d="M0,224L60,213.3C120,203,240,181,360,192C480,203,600,245,720,261.3C840,277,960,267,1080,240C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        >
          <animate 
            attributeName="d" 
            values="M0,224L60,213.3C120,203,240,181,360,192C480,203,600,245,720,261.3C840,277,960,267,1080,240C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z;
                    M0,192L60,202.7C120,213,240,235,360,229.3C480,224,600,192,720,186.7C840,181,960,203,1080,213.3C1200,224,1320,224,1380,224L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z;
                    M0,224L60,213.3C120,203,240,181,360,192C480,203,600,245,720,261.3C840,277,960,267,1080,240C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            dur="30s" 
            repeatCount="indefinite" 
          />
        </path>
      </svg>
    </div>
  )
}