import db from '@/database/urbnlanes-db.json'
import { metadataGenerators } from '@/seo/seo-helpers'
import { notFound } from 'next/navigation'
import ArticleContent from '@/components/media-center-components/ArticleContent'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blogs = db.mediacenter.blogs || []
  const news = db.mediacenter.news || []
  const article = [...blogs, ...news].find((item) => item.id === id)

  return metadataGenerators.article(article)
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blogs = db.mediacenter.blogs || []
  const news = db.mediacenter.news || []
  const article = [...blogs, ...news].find((item) => item.id === id)

  if (!article) {
    notFound()
  }

  return <ArticleContent article={article} />
}
