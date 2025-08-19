export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold sm:text-6xl">
          <span className="gradient-brand-text">Resources</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-secondary">
          Battle-tested frameworks and tools from my experience leading product at scale.
        </p>
      </div>
      
      {/* Resource Categories */}
      <div className="grid gap-8 md:grid-cols-2">
        <section className="card-base card-hover p-8">
          <div className="icon-base icon-bg-primary">
            <svg className="h-8 w-8" style={{color: 'var(--accent-primary)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-primary">Strategy & Vision</h2>
          <div className="space-y-3">
            <div className="group">
              <h3 className="font-semibold text-primary">Product Vision Canvas</h3>
              <p className="text-sm text-secondary">
                A structured framework for defining and communicating product vision at scale.
              </p>
            </div>
            <div className="group">
              <h3 className="font-semibold text-primary">OKR Implementation Guide</h3>
              <p className="text-sm text-secondary">
                Practical guide to implementing OKRs that actually drive outcomes.
              </p>
            </div>
            <div className="group">
              <h3 className="font-semibold text-primary">Strategic Roadmap Template</h3>
              <p className="text-sm text-secondary">
                Battle-tested roadmap format that balances flexibility with commitment.
              </p>
            </div>
          </div>
        </section>

        <section className="card-base card-hover p-8">
          <div className="icon-base icon-bg-blue">
            <svg className="h-8 w-8" style={{color: 'var(--accent-blue)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-primary">Team Leadership</h2>
          <div className="space-y-3">
            <div className="group">
              <h3 className="font-semibold text-primary">PM Interview Framework</h3>
              <p className="text-sm text-secondary">
                Comprehensive interview structure for hiring exceptional product managers.
              </p>
            </div>
            <div className="group">
              <h3 className="font-semibold text-primary">Team Structure Models</h3>
              <p className="text-sm text-secondary">
                Proven org structures for product teams from 5 to 50+ people.
              </p>
            </div>
            <div className="group">
              <h3 className="font-semibold text-primary">Performance Review Templates</h3>
              <p className="text-sm text-secondary">
                Fair and growth-oriented performance review framework for PMs.
              </p>
            </div>
          </div>
        </section>

        <section className="card-base card-hover p-8">
          <div className="icon-base icon-bg-purple">
            <svg className="h-8 w-8" style={{color: 'var(--accent-purple)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-primary">Discovery & Validation</h2>
          <div className="space-y-3">
            <div className="group">
              <h3 className="font-semibold text-primary">User Interview Guide</h3>
              <p className="text-sm text-secondary">
                How to conduct user interviews that uncover real insights.
              </p>
            </div>
            <div className="group">
              <h3 className="font-semibold text-primary">Jobs-to-be-Done Framework</h3>
              <p className="text-sm text-secondary">
                JTBD implementation for understanding customer motivations.
              </p>
            </div>
            <div className="group">
              <h3 className="font-semibold text-primary">Validation Playbook</h3>
              <p className="text-sm text-secondary">
                Systematic approach to validating product ideas before building.
              </p>
            </div>
          </div>
        </section>

        <section className="card-base card-hover p-8">
          <div className="icon-base icon-bg-success">
            <svg className="h-8 w-8" style={{color: 'var(--accent-success)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-primary">Metrics & Growth</h2>
          <div className="space-y-3">
            <div className="group">
              <h3 className="font-semibold text-primary">North Star Metric Guide</h3>
              <p className="text-sm text-secondary">
                How to identify and implement your product's north star metric.
              </p>
            </div>
            <div className="group">
              <h3 className="font-semibold text-primary">Product Analytics Framework</h3>
              <p className="text-sm text-secondary">
                Setting up analytics that drive actionable insights.
              </p>
            </div>
            <div className="group">
              <h3 className="font-semibold text-primary">Growth Model Templates</h3>
              <p className="text-sm text-secondary">
                Quantitative growth models for different business types.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Coming Soon Notice */}
      <section className="mt-12 rounded-2xl bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-8 text-center dark:from-teal-950/10 dark:via-blue-950/10 dark:to-purple-950/10">
        <h3 className="mb-3 text-xl font-bold text-primary">Download Links Coming Soon</h3>
        <p className="mx-auto max-w-2xl text-secondary">
          I'm currently organizing and refining these resources based on my experience 
          at Utility Warehouse, Alfred, and BrightSun. Subscribe to get notified when 
          they're ready.
        </p>
      </section>
    </div>
  )
}