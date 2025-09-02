import { getProject, getProjects } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      {/* Back link */}
      <Link 
        href="/projects" 
        className="mb-8 inline-flex items-center text-sm text-secondary hover:text-primary"
      >
        ← Back to projects
      </Link>

      {/* Project Header */}
      <header className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-4xl font-bold text-primary">{project.title}</h1>
          {project.status && (
            <span className={`tag-base ${
              project.status === 'live' 
                ? 'badge-status-live'
                : project.status === 'development' 
                ? 'badge-status-dev'
                : project.status === 'exited'
                ? 'badge-status-exited'
                : 'tag-standard'
            }`}>
              {project.status}
            </span>
          )}
        </div>
        
        {project.description && (
          <p className="text-lg text-secondary">
            {project.description}
          </p>
        )}

        {/* Project Links */}
        <div className="mt-6 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              View Live Project
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium card-base card-hover"
            >
              View on GitHub
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {project.featuredImage && (
        <div className="mb-12 overflow-hidden rounded-lg">
          <img 
            src={project.featuredImage} 
            alt={project.title}
            className="w-full"
          />
        </div>
      )}

      {/* Tech Stack */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-primary">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="tag-base tag-standard"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Project Content */}
      <div 
        className="prose prose-gray max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: project.htmlContent || '' }}
      />

      {/* Project Metrics/Achievements */}
      {project.achievements && project.achievements.length > 0 && (
        <div className="mt-12 rounded-lg p-6 card-base">
          <h2 className="mb-4 text-xl font-semibold text-primary">Key Achievements</h2>
          <ul className="space-y-2">
            {project.achievements.map((achievement: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 text-green-600 dark:text-green-400">✓</span>
                <span className="text-secondary">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}