import { getArticle, getArticles } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import TableOfContents from '@/components/TableOfContents'

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
        <div className="mx-auto max-w-5xl px-6 py-4">
          <Link 
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all opacity-70 hover:opacity-100"
            style={{color: 'var(--text-primary)'}}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to articles
          </Link>
        </div>
      </div>
      
      {/* Article Header - Separate from content */}
      <div className="mx-auto max-w-5xl px-6">
        <header className="py-12 border-b" style={{borderColor: 'var(--border)'}}>
          {/* Article metadata */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
            <time className="font-medium" style={{color: 'var(--text-secondary)'}}>
              {new Date(article.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            {article.readingTime && (
              <>
                <span style={{color: 'var(--text-tertiary)'}}>•</span>
                <span className="font-medium" style={{color: 'var(--text-secondary)'}}>
                  {article.readingTime}
                </span>
              </>
            )}
            {article.category && (
              <>
                <span style={{color: 'var(--text-tertiary)'}}>•</span>
                <span className="px-2 py-1 text-xs rounded-full font-medium" style={{
                  background: 'var(--tag-bg)',
                  color: 'var(--tag-text)',
                  border: '1px solid var(--tag-border)'
                }}>
                  {article.category}
                </span>
              </>
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary mb-6">
            {article.title}
          </h1>
          
          {/* Author info */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-white font-bold">
              TF
            </div>
            <div>
              <div className="font-medium text-primary">Tom French</div>
              <div className="text-sm" style={{color: 'var(--text-secondary)'}}>Chief Product Officer</div>
            </div>
          </div>
        </header>
      </div>

      {/* Article Body with ToC */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className={`${article.showTableOfContents && article.headings && article.headings.length > 0 ? 'lg:grid lg:grid-cols-[1fr_280px] lg:gap-12' : ''}`}>
          {/* Main Content */}
          <div className="max-w-3xl">
            {article.featuredImage && (
              <div className="mb-12 overflow-hidden rounded-xl">
                <img 
                  src={article.featuredImage} 
                  alt={article.title}
                  className="w-full"
                />
              </div>
            )}

            {/* Article content with custom typography */}
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.htmlContent || '' }}
            />

            {/* Tags section */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-16 pt-8 border-t" style={{borderColor: 'var(--border)'}}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{color: 'var(--text-secondary)'}}>
                  Tagged with
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/articles/tags/${encodeURIComponent(tag)}`}
                      className="px-3 py-1 text-sm rounded-full transition-all hover:scale-105"
                      style={{
                        background: 'var(--tag-bg)',
                        color: 'var(--tag-text)',
                        border: '1px solid var(--tag-border)'
                      }}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Table of Contents - Aligned with content */}
          {article.showTableOfContents && article.headings && article.headings.length > 0 && (
            <div className="hidden lg:block">
              <TableOfContents headings={article.headings} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}