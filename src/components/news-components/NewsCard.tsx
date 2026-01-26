import Link from 'next/link'
import { memo } from 'react'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import RippleEffect from '@/components/ui/effects/RippleEffect'

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
      dir="ltr"
      className="group relative w-full h-full overflow-hidden flex flex-col bg-current/10 hover:bg-current/15 rounded-2xl transition-colors"
    >
      <Link href={`/media-center-news/${article.id}`} className="w-full h-full flex flex-col">
        <ImageIn
          src={imageSrc}
          alt={article.title || 'News article'}
          className="group-hover:scale-110 transition-transform duration-700 ease-out"
          divClassName="h-48! sm:h-56! lg:h-64! overflow-hidden"
          hasIconOverlay
        />

        <div className="relative flex flex-col flex-1 justify-between p-6">
          <h3 title={article.title} className="font-semibold max-md:text-lg text-xl line-clamp-2 leading-snug mb-auto">
            {article.title}
          </h3>

          <div className="flex flex-wrap justify-between items-center gap-2 border-t font-medium text-current/60 text-xs sm:text-sm mt-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="max-w-[100px] sm:max-w-none truncate">{article.type}</span>
              <span className="opacity-50">•</span>
              <span className="max-w-[100px] sm:max-w-none truncate">{article.category}</span>
            </div>

            <time className="whitespace-nowrap">{article.date}</time>
          </div>
        </div>
      </Link>
    </RippleEffect>
  )
})
