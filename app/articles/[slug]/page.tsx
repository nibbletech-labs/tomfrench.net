import { getArticle, getArticles } from '@/lib/obsidian'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  
  if (!article) {
    notFound()
  }

  return (
    <article className="min-h-screen">
      {/* Back navigation bar */}
      <div className="border-b" style={{borderColor: 'var(--border)'}}>
        <div className="mx-auto max-w-3xl px-6 py-4">
          <Link 
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{color: 'var(--text-secondary)'}}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to articles
          </Link>
        </div>
      </div>
      
      {/* Article content */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        
        <header className="mb-12">
          {/* Article metadata */}
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <time className="font-medium" style={{color: 'var(--text-secondary)'}}>
              {new Date(article.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            {article.readingTime && (
              <>
                <span className="text-muted">•</span>
                <span className="font-medium" style={{color: 'var(--text-secondary)'}}>
                  {article.readingTime}
                </span>
              </>
            )}
            {article.category && (
              <>
                <span className="text-muted">•</span>
                <span className="tag-base badge-category">
                  {article.category}
                </span>
              </>
            )}
          </div>
          
          {/* Title with better typography */}
          <h1 className="text-4xl font-bold leading-tight text-primary sm:text-5xl sm:leading-tight">
            {article.title}
          </h1>
          
          {/* Author info (placeholder for now) */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-white font-bold">
              TF
            </div>
            <div>
              <div className="font-medium text-primary">Tom French</div>
              <div className="text-sm text-muted">Chief Product Officer</div>
            </div>
          </div>
        </header>

        {article.featuredImage && (
          <div className="-mx-6 mb-12 overflow-hidden sm:mx-0 sm:rounded-2xl">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full"
            />
          </div>
        )}

        {/* Article content with improved typography */}
        <div 
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-2xl prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-code:rounded prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950"
          dangerouslySetInnerHTML={{ __html: article.htmlContent || '' }}
        />

        {/* Tags section with better styling */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-16 border-t pt-8" style={{borderColor: 'var(--border)'}}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{color: 'var(--text-secondary)'}}>
              Tagged with
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles/tags/${encodeURIComponent(tag)}`}
                  className="tag-base tag-standard hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </article>
  )
}