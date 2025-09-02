import Link from 'next/link'
import { getProjects } from '@/lib/content'

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

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <div className="col-span-full rounded-2xl p-12 text-center card-base">
            <p className="text-secondary">
              No projects yet. Create markdown files in the content/projects folder.
            </p>
          </div>
        ) : (
          projects.map((project, index) => {
            const colors = [
              { main: '#3B82F6', dark: '#1E40AF' }, // Blue
              { main: '#A855F7', dark: '#7C3AED' }, // Purple
              { main: '#10B981', dark: '#059669' }, // Emerald
              { main: '#F59E0B', dark: '#D97706' }, // Amber
              { main: '#EF4444', dark: '#DC2626' }, // Red
              { main: '#EC4899', dark: '#DB2777' }, // Pink
              { main: '#14B8A6', dark: '#0D9488' }, // Teal
              { main: '#F97316', dark: '#EA580C' }, // Orange
            ];
            const colorSet = colors[index % colors.length];
            const projectColor = project.color || colorSet.main;
            const projectColorDark = project.color ? project.color + '99' : colorSet.dark;
            
            return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative h-80 w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:z-10"
              style={{
                border: project.image ? `3px solid ${projectColor}` : 'none',
                background: project.image 
                  ? `url(${project.image}) center/cover`
                  : `linear-gradient(135deg, ${projectColor}, ${projectColorDark})`
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
                  {project.description || project.excerpt}
                </p>
              </div>
              
              {/* Hover effect indicator */}
              <div className="absolute right-4 top-4 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </Link>
            )
          })
        )}
      </div>
    </div>
  )
}