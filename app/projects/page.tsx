import Link from 'next/link'
import { getProjects } from '@/lib/obsidian'

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold sm:text-6xl">
          <span className="gradient-brand-text">Projects</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-secondary">
          Side projects and ventures where I explore new ideas and technologies.
        </p>
      </div>

      {/* Projects List */}
      <div className="grid gap-6 md:grid-cols-2">
        {projects.length === 0 ? (
          <div className="col-span-full rounded-2xl p-12 text-center card-base">
            <p className="text-secondary">
              No projects yet. Create markdown files in the content/projects folder.
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
              <div className="h-full card-base card-hover p-8">
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {project.title}
                  </h2>
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
                <p className="mb-4 text-secondary">
                  {project.excerpt || project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech: string) => (
                      <span key={tech} className="tag-base tag-gradient">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                  View project →
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}