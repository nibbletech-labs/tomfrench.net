'use client'

import Link from 'next/link'
import { type Article } from '@/lib/content'

export function ArticleCard({ article, index = 0 }: { article: Article, index?: number }) {
  const accents = [
    { border: 'border-l-blue-500', hover: 'hover:bg-blue-500/5 hover:shadow-blue-500/20' },
    { border: 'border-l-purple-500', hover: 'hover:bg-purple-500/5 hover:shadow-purple-500/20' },
    { border: 'border-l-emerald-500', hover: 'hover:bg-emerald-500/5 hover:shadow-emerald-500/20' },
    { border: 'border-l-orange-500', hover: 'hover:bg-orange-500/5 hover:shadow-orange-500/20' }
  ];
  const accent = accents[index % accents.length];
  
  return (
    <article className={`group rounded-l-sm rounded-r-2xl border-l-4 ${accent.border} pl-6 pr-6 py-6 transition-all ${accent.hover} hover:shadow-lg`}>
      <Link href={`/articles/${article.slug}`} className="block">
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
        <div className="mt-4 text-sm font-medium" style={{color: 'var(--accent-blue)'}}>
          Read more →
        </div>
      </Link>
      {article.tags && article.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/articles/tags/${encodeURIComponent(tag)}`}
              className="tag-base tag-gradient hover:shadow-md relative z-10"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}