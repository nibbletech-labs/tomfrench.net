import { getArticles } from '@/lib/content'
import { ArticleCard } from '@/components/article-card'

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold sm:text-6xl">
          <span className="gradient-brand-text">Articles</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-secondary">
          Thoughts on product leadership, digital transformation, and building exceptional teams.
        </p>
      </div>
      
      <div className="mx-auto max-w-4xl space-y-4">
        {articles.map((article, index) => (
          <ArticleCard key={article.slug} article={article} index={index} />
        ))}
      </div>
    </div>
  )
}