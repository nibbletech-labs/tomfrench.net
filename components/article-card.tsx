'use client'

import Link from 'next/link'
import { type Article } from '@/lib/content'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group">
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
            {article.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/articles/tags/${encodeURIComponent(tag)}`}
                className="tag-base tag-gradient hover:shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        <div className="mt-4 text-sm font-medium" style={{color: 'var(--accent-blue)'}}>
          Read more →
        </div>
      </Link>
    </article>
  )
}