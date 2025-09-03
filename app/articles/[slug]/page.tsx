import { getArticle, getArticles } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import TableOfContents from '@/components/TableOfContents'
import { WavyBackground } from '@/components/wavy-background'

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
      {/* Wavy background decoration - behind everything */}
      <WavyBackground />
      
      {/* Article Header - above waves with z-index */}
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <header className="pt-32 pb-28">
          {/* Article metadata */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
            <time className="font-medium" style={{color: 'var(--text-secondary)'}}>
              {new Date(article.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            {article.category && (
              <>
                <span style={{color: 'var(--text-tertiary)'}}>•</span>
                <Link
                  href={`/articles/category/${encodeURIComponent(article.category.toLowerCase())}`}
                  className="px-2 py-1 text-xs rounded-full font-medium transition-all hover:scale-105" 
                  style={{
                    background: 'var(--tag-bg)',
                    color: 'var(--tag-text)',
                    border: '1px solid var(--tag-border)'
                  }}
                >
                  {article.category}
                </Link>
              </>
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary">
            {article.title}
          </h1>
        </header>
      </div>

      {/* Article Body with ToC */}
      <div className="mx-auto max-w-5xl px-6 py-12 relative z-10">
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
              <div className="mt-16 pt-8">
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