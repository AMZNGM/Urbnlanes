import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'
import db from '@/database/urbnlanes-db.json'

const ArticleHero = dynamic(() => import('@/components/media-center-components/ArticleHero'))
import ArticleContent from '@/components/media-center-components/ArticleContent'
import LatestNews from '@/components/news-components/LatestNews'
import ScrollIndicator from '@/components/shared/ScrollIndicator'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params
  let article = [...(db.mediacenter.blogs || []), ...(db.mediacenter.news || [])].find((item) => item.id === id)

  return metadataGenerators.article(article)
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params
  let article = [...(db.mediacenter.blogs || []), ...(db.mediacenter.news || [])].find((item) => item.id === id)

  if (!article) {
    notFound()
  }

  return (
    <Suspense fallback={<LoadingLogo />}>
      <ArticleHero article={article} />
      <ArticleContent article={article} />
      <LatestNews />
      <ScrollIndicator />
    </Suspense>
  )
}
