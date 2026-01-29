import Link from 'next/link'
import { memo } from 'react'
import { ArrowRight } from 'lucide-react'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default memo(function NewsCard({
  article,
}: {
  article: {
    id: string
    type: string
    category: string
    title: string
    content?: string | string[]
    image?: string | string[]
    source?: string
    date: string
  }
}) {
  let imageUrl = Array.isArray(article.image) ? article.image[0] : article.image
  let fallbackImage = '/images/blogs/blog-placeholder.webp'
  let imageSrc = imageUrl && imageUrl.trim() !== '' ? imageUrl : fallbackImage

  return (
    <RippleEffect as="article" dir="ltr" className="group rounded-2xl">
      <Link href={`/media-center-news/${article.id}`}>
        <ImageIn src={imageSrc} alt={article.title || 'News article'} divClassName="aspect-video" />

        <div className="right-0 bottom-0 left-0 absolute flex flex-col justify-between bg-black/50 backdrop-blur-2xl rounded-2xl text-text m-4 p-4">
          <h3 title={article.title} className="max-md:text-lg text-xl normal-case line-clamp-2 leading-snug mb-auto">
            {article.title}
          </h3>

          <div className="flex flex-wrap justify-between items-center gap-2 border-t font-medium text-text/60 text-xs sm:text-sm mt-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="max-w-[100px] sm:max-w-none truncate">{article.type}</span>
              <span className="opacity-50">•</span>
              <span className="max-w-[100px] sm:max-w-none truncate">{article.category}</span>
            </div>

            <time className="whitespace-nowrap">{article.date}</time>
          </div>

          <div className="top-4 right-4 absolute opacity-0 group-hover:opacity-100 transition-all -translate-x-full group-hover:translate-x-0 duration-500">
            <ArrowRight size={24} className="animate-pulse" />
          </div>
        </div>
      </Link>
    </RippleEffect>
  )
})
