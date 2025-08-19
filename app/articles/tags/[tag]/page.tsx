import { getArticlesByTag, getAllTags } from '@/lib/obsidian'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const articles = await getArticlesByTag(decodedTag)
  
  if (articles.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Back navigation bar */}
      <div className="border-b" style={{borderColor: 'var(--border)'}}>
        <div className="mx-auto max-w-6xl px-6 py-4">
          <Link 
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{color: 'var(--text-secondary)'}}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-medium uppercase tracking-wider text-muted">Tag</span>
            <span className="tag-base tag-gradient">
              {decodedTag}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-primary sm:text-5xl">
            Articles tagged with "{decodedTag}"
          </h1>
          <p className="mt-4 text-lg text-secondary">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.slug} className="group">
              <Link href={`/articles/${article.slug}`} className="block card-base card-hover">
                <time className="text-sm font-medium text-muted">
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                <h2 className="mt-3 text-xl font-bold text-primary">
                  {article.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-secondary">
                  {article.excerpt}
                </p>
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="tag-base tag-standard text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 text-sm font-medium" style={{color: 'var(--accent-primary)'}}>
                  Read more →
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Related tags section */}
        <div className="mt-16 border-t pt-8" style={{borderColor: 'var(--border)'}}>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{color: 'var(--text-secondary)'}}>
            Browse other tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {(await getAllTags()).filter(t => t !== decodedTag).map((otherTag) => (
              <Link
                key={otherTag}
                href={`/articles/tags/${encodeURIComponent(otherTag)}`}
                className="tag-base tag-standard hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400"
              >
                {otherTag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}