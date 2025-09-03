export function WavyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top wave - using brand gradient colors */}
      <svg
        className="absolute top-0 left-0 w-full opacity-30 dark:opacity-20"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '40vh' }}
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'var(--gradient-from)' }} />
            <stop offset="50%" style={{ stopColor: 'var(--gradient-via)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--gradient-to)' }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave-gradient-1)"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
      
      {/* Bottom wave - secondary gradient */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-20 dark:opacity-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '30vh' }}
      >
        <defs>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'var(--gradient-secondary-from)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--gradient-secondary-to)' }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave-gradient-2)"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
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