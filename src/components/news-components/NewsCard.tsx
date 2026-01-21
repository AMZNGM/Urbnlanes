'use client'

import Link from 'next/link'
import { memo } from 'react'
import RippleEffect from '@/components/ui/effects/RippleEffect'
import ImageIn from '@/components/ui/unstyled/ImageIn'

interface Article {
  id: string
  type: string
  category: string
  title: string
  content?: string | string[]
  image?: string | string[]
  source?: string
  date: string
}

interface NewsCardProps {
  article: Article
}

export default memo(function NewsCard({ article }: NewsCardProps) {
  const imageUrl = Array.isArray(article.image) ? article.image[0] : article.image
  const fallbackImage = '/images/blogs/blog-placeholder.webp'
  const imageSrc = imageUrl && imageUrl.trim() !== '' ? imageUrl : fallbackImage

  return (
    <RippleEffect
      as="article"
      className="group relative w-full h-full overflow-hidden bg-main/10 hover:bg-main/15 border rounded-2xl transition-colors duration-500"
    >
      <Link href={`/media-center-news/${article.id}`} className="min-h-100">
        <ImageIn
          src={imageSrc}
          alt={article.title || 'News article'}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = fallbackImage
          }}
          className="group-hover:scale-105 transition-transform duration-500"
          divClassName="h-[60%]! overflow-hidden"
          hasIconOverlay
        />

        <div className="relative w-full h-[40%] flex flex-col justify-between space-y-4 p-4">
          <p title={article.title} className="font-semibold text-lg line-clamp-3">
            {article.title}
          </p>

          <div className="flex justify-between items-center font-medium text-text/60 text-xs">
            <div className="space-x-2">
              <span>{article.type}</span>
              <span>/</span>
              <span>{article.category}</span>
            </div>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    </RippleEffect>
  )
})
