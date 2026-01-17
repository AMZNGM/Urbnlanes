import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { MousePointerClick } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default memo(function NewsCard({ article }) {
  const imageUrl = Array.isArray(article.image) ? article.image[0] : article.image
  const fallbackImage = '/images/blogs/blog-placeholder.webp'
  const imageSrc = imageUrl && imageUrl.trim() !== '' ? imageUrl : fallbackImage

  return (
    <RippleEffect
      tag="article"
      className="group relative w-full h-full overflow-hidden bg-main/10 hover:bg-main/15 border rounded-2xl transition-colors duration-500"
    >
      <Link href={`/media-center-news/${article.id}`} className="h-100">
        <div className="relative w-full h-[60%] overflow-hidden">
          <Image
            src={imageSrc}
            alt={article.title || 'News article'}
            onError={(e) => {
              e.target.src = fallbackImage
            }}
            fill
            sizes="10vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 flex justify-center items-center gap-1 group-hover:bg-black/50 opacity-0 group-hover:opacity-100 text-sm normal-case transition-all duration-500">
            <MousePointerClick size={20} /> See more
          </div>
        </div>

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
