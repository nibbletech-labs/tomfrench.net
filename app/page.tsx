import Link from 'next/link'
import { getArticles, getProjects } from '@/lib/content'
import { getHomepage } from '@/lib/homepage'

export default async function HomePage() {
  const articles = await getArticles()
  const recentArticles = articles.slice(0, 2)
  const projects = await getProjects()
  const featuredProjects = projects.filter(p => p.featured).slice(0, 4)
  const homepage = await getHomepage()

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero Section - Split Layout */}
      <section className="py-12 sm:py-16">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left side - Text content */}
          <div className="order-2 md:order-1">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl xl:text-6xl">
              {homepage.heroTitle.split('Tom')[0]}
              <span className="gradient-brand-text">Tom</span>
              {homepage.heroTitle.split('Tom')[1]}
            </h1>
            
            <p className="mb-4 text-xl text-secondary sm:text-2xl">
              {homepage.heroSubtitle}
            </p>
            
            <p className="mb-6 max-w-lg text-lg text-secondary">
              {homepage.heroDescription}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {homepage.socialLinks?.linkedin && (
              <a
                href={homepage.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl p-3 transition-all hover:shadow-md"
                style={{backgroundColor: 'var(--hover-bg)', color: 'var(--text-secondary)'}}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              )}
              {homepage.socialLinks?.github && (
              <a
                href={homepage.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl p-3 transition-all hover:shadow-md"
                style={{backgroundColor: 'var(--hover-bg)', color: 'var(--text-secondary)'}}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              )}
              {homepage.socialLinks?.twitter && (
              <a
                href={homepage.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl p-3 transition-all hover:shadow-md"
                style={{backgroundColor: 'var(--hover-bg)', color: 'var(--text-secondary)'}}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              )}
              <a
                href="mailto:tom@tomfrench.net"
                className="rounded-xl p-3 transition-all hover:shadow-md"
                style={{backgroundColor: 'var(--hover-bg)', color: 'var(--text-secondary)'}}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right side - Profile image */}
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative h-64 w-64 overflow-hidden rounded-full gradient-brand p-1.5 shadow-2xl sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              <div className="h-full w-full rounded-full overflow-hidden" style={{backgroundColor: 'var(--background)'}}>
                {homepage.profileImage ? (
                  <img 
                    src={homepage.profileImage} 
                    alt="Tom" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="gradient-brand-text text-6xl font-bold sm:text-7xl lg:text-8xl">T</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles Section - Full Width */}
      <section className="mb-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold sm:text-4xl">Recent articles</h2>
          <Link 
            href="/articles" 
            className="text-sm font-medium" style={{color: 'var(--accent-blue)'}}
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {recentArticles.map((article, index) => {
            const accents = [
              { border: 'border-l-blue-500', hover: 'hover:bg-blue-500/5 hover:shadow-blue-500/20' },
              { border: 'border-l-purple-500', hover: 'hover:bg-purple-500/5 hover:shadow-purple-500/20' },
              { border: 'border-l-emerald-500', hover: 'hover:bg-emerald-500/5 hover:shadow-emerald-500/20' },
              { border: 'border-l-orange-500', hover: 'hover:bg-orange-500/5 hover:shadow-orange-500/20' }
            ];
            const accent = accents[index % accents.length];
            return (
            <article key={article.slug} className="group">
              <Link href={`/articles/${article.slug}`} className={`block rounded-l-sm rounded-r-2xl border-l-4 ${accent.border} pl-6 pr-6 py-6 transition-all ${accent.hover} hover:shadow-lg`}>
                <time className="text-sm font-medium text-muted">
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                <h3 className="mt-3 text-xl font-bold text-primary">
                  {article.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-secondary">
                  {article.excerpt}
                </p>
                <div className="mt-4 text-sm font-medium" style={{color: 'var(--accent-blue)'}}>
                  Read more →
                </div>
              </Link>
            </article>
            )
          })}
        </div>
      </section>

      {/* Featured Projects Section - Full Width */}
      <section className="mb-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold sm:text-4xl">Featured projects</h2>
          <Link 
            href="/projects" 
            className="text-sm font-medium" style={{color: 'var(--accent-blue)'}}
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group relative h-80 w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:z-10 ${
                index % 2 === 0 ? 'rotate-1' : '-rotate-1'
              } hover:rotate-0 ${
                index === 3 ? 'hidden lg:hidden xl:block sm:block' : ''
              }`}
                style={{
                  border: project.image ? `3px solid ${project.color || '#3B82F6'}` : 'none',
                  background: project.image 
                    ? `url(${project.image}) center/cover`
                    : `linear-gradient(135deg, ${project.color || '#3B82F6'}, ${project.color ? project.color + '99' : '#1E40AF'})`
                }}
              >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity group-hover:from-black/70 group-hover:via-black/30"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {project.status && (
                    <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      {project.status}
                    </span>
                  )}
                  <h3 className="mb-2 text-xl font-bold">
                    {project.title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {project.description}
                  </p>
                </div>
                
                {/* Hover effect indicator */}
                <div className="absolute right-4 top-4 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
            </Link>
          ))}
          {/* Add placeholder if less than 4 featured projects */}
          {featuredProjects.length < 4 && (
            <Link
              href="/projects"
              className="group relative flex h-80 w-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:z-10 dark:border-gray-700 dark:hover:border-blue-400"
            >
              <div className="text-center">
                <svg className="mx-auto mb-3 h-12 w-12 text-gray-400 transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm font-medium text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
                  View all projects
                </p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Ideas Section - Above Experience */}
      <section className="mb-12">
        <h2 className="mb-8 text-3xl font-bold sm:text-4xl">Ideas I'm exploring</h2>
        <div className="gradient-brand p-[2px] rounded-2xl">
          <div className="rounded-2xl p-6" style={{backgroundColor: 'var(--ideas-bg)'}}>
            {homepage.ideasExploring && homepage.ideasExploring.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {homepage.ideasExploring.map((area, index) => {
                  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-teal-500', 'bg-pink-500'];
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`mt-1 h-2 w-2 rounded-full ${colors[index % colors.length]}`}></div>
                      <div>
                        <h3 className="mb-1 text-lg font-semibold">{area.title}</h3>
                        {area.description && (
                          <p className="text-sm text-secondary">{area.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">AI-Native Product Development</h3>
                    <p className="text-sm text-secondary">How teams can integrate AI into every stage of the product lifecycle</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-purple-500"></div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Remote Team Dynamics</h3>
                    <p className="text-sm text-secondary">Building high-trust, high-performance distributed product teams</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500"></div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Sustainable Growth Models</h3>
                    <p className="text-sm text-secondary">Balancing rapid scaling with long-term organizational health</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-orange-500"></div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Data-Driven Decision Making</h3>
                    <p className="text-sm text-secondary">Moving beyond vanity metrics to actionable product insights</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Customer-Centric Innovation</h3>
                    <p className="text-sm text-secondary">Systematic approaches to understanding and solving real customer problems</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-pink-500"></div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Platform Strategy</h3>
                    <p className="text-sm text-secondary">Building scalable product platforms that enable rapid feature development</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Grid - 2 Columns */}
      <section className="mb-12">
        <h2 className="mb-8 text-3xl font-bold sm:text-4xl">Experience highlights</h2>
        {homepage.experienceHighlights && homepage.experienceHighlights.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {homepage.experienceHighlights.map((exp, index) => {
              const colors = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];
              return (
                <div key={index} className="flex gap-4">
                  {/* Logo or colored square */}
                  <div className="flex-shrink-0">
                    {exp.logo ? (
                      <img 
                        src={exp.logo} 
                        alt={exp.company}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className={`h-12 w-12 rounded-lg ${colors[index % colors.length]}`}></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-sm text-muted">{exp.company} {exp.period && `• ${exp.period}`}</p>
                    {exp.description && (
                      <p className="mt-2 text-sm text-secondary">{exp.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold">Chief Product Officer</h3>
              <p className="text-sm text-muted">Utility Warehouse • FTSE 250</p>
              <p className="mt-2 text-secondary">
                Led product organization serving 1M+ customers. Delivered £10M+ operational savings through digital transformation initiatives.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold">Chief Product Officer</h3>
              <p className="text-sm text-muted">Alfred • Proptech Scale-up</p>
              <p className="mt-2 text-secondary">
                Built product from 0-1 and scaled to serve enterprise clients. Grew team from 5 to 35+ across product, design, and engineering.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold">Founder & CEO</h3>
              <p className="text-sm text-muted">BrightSun • Successfully Exited</p>
              <p className="mt-2 text-secondary">
                Founded and scaled SaaS platform for energy management. Built team of 15+ and achieved successful exit to strategic buyer.
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-lg font-semibold">Product Leader</h3>
              <p className="text-sm text-muted">Previous Roles</p>
              <p className="mt-2 text-secondary">
                Product management roles at high-growth startups and established companies across fintech, energy, and enterprise software.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}