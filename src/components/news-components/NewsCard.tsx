import Link from 'next/link'
import { memo } from 'react'
import { ArrowRight } from 'lucide-react'
import TText from '@/translations/TText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import RippleEffect from '@/components/ui/effects/RippleEffect'

interface NewsCardProps {
  article: {
    id: string
    type: string
    category: string | string[]
    title: string
    content?: string | string[]
    image?: string | string[]
    source?: string
    date: string
  }
  look?: 'default' | 'mono' | 'monoSide' | 'monoSm'
}

export default memo(function NewsCard({ article, look = 'default' }: NewsCardProps) {
  let imageUrl = Array.isArray(article.image) ? article.image[0] : article.image
  let fallbackImage = '/images/blogs/blog-placeholder.webp'
  let imageSrc = imageUrl && imageUrl.trim() !== '' ? imageUrl : fallbackImage

  if (look === 'mono') {
    return (
      <RippleEffect as="article" className="group w-full h-full overflow-hidden bg-text rounded-xl text-bg">
        <Link href={`/media-center-news/${article.id}`} className="w-full h-full flex flex-col">
          <ImageIn src={imageSrc} alt={article.title || 'News article'} className="rounded-xl" divClassName="rounded-xl overflow-hidden" />

          <div className="top-4 left-4 absolute bg-main/25 backdrop-blur-xl rounded-md font-mono text-[10px] text-text tracking-widest px-3 py-2">
            <TText tKey={`news.${article.type}`} />
          </div>

          <div className="flex flex-col gap-2 py-2">
            <h3
              title={article.title}
              className="max-w-3xl max-md:text-xl text-3xl decoration-2 decoration-main group-hover:underline underline-offset-4 normal-case line-clamp-2 leading-tight transition-all duration-300"
            >
              {article.title}
            </h3>

            <time className="font-mono font-bold text-[10px] text-bg/50">{article.date}</time>
          </div>
        </Link>
      </RippleEffect>
    )
  }

  if (look === 'monoSm') {
    return (
      <RippleEffect as="article" className="group w-full h-full overflow-hidden bg-text rounded-xl text-bg">
        <Link href={`/media-center-news/${article.id}`} className="w-full h-full flex flex-col">
          <ImageIn src={imageSrc} alt={article.title || 'News article'} className="rounded-xl" divClassName="rounded-xl overflow-hidden" />

          <div className="flex flex-col gap-2 py-2">
            <h3
              title={article.title}
              className="max-w-3xl max-md:text-sm text-lg decoration-2 decoration-main group-hover:underline underline-offset-4 normal-case line-clamp-2 leading-tight transition-all duration-300"
            >
              {article.title}
            </h3>

            <div className="w-fit bg-main/50 rounded-md font-mono text-[10px] text-bg tracking-widest px-2 py-1">
              <TText tKey={`news.${article.type}`} />
            </div>

            <time className="font-mono font-bold text-[10px] text-bg/50">{article.date}</time>
          </div>
        </Link>
      </RippleEffect>
    )
  }

  if (look === 'monoSide') {
    return (
      <RippleEffect as="article" className="group w-full h-full overflow-hidden bg-text rounded-xl text-bg">
        <Link href={`/media-center-news/${article.id}`} className="w-full h-full gap-2 grid grid-cols-2 max-md:grid-cols-3">
          <ImageIn src={imageSrc} alt={article.title || 'News article'} className="rounded-xl" divClassName="rounded-xl overflow-hidden" />

          <div className="flex flex-col gap-2 max-md:col-span-2 py-2">
            <h3
              title={article.title}
              className="max-w-3xl text-lg max-md:text-lg decoration-2 decoration-main group-hover:underline underline-offset-4 normal-case line-clamp-2 leading-tight transition-all duration-300"
            >
              {article.title}
            </h3>

            <div className="w-fit bg-main/50 rounded-md font-mono text-[10px] text-bg tracking-widest px-2 py-1">
              <TText tKey={`news.${article.type}`} />
            </div>

            <time className="font-mono font-bold text-[10px] text-bg/50">{article.date}</time>
          </div>
        </Link>
      </RippleEffect>
    )
  }

  return (
    <RippleEffect as="article" dir="ltr" className="group rounded-xl max-md:py-2">
      <Link href={`/media-center-news/${article.id}`} className="block relative w-full h-full">
        <ImageIn src={imageSrc} alt={article.title || 'News article'} className="scale-100!" divClassName="h-100! blur-none! overflow-hidden rounded-xl" />

        <div className="right-0 bottom-0 md:bottom-83 group-hover:bottom-0 left-0 absolute flex flex-col justify-between bg-bg/50 backdrop-blur-xl rounded-xl text-text md:scale-80 group-hover:scale-100 transition-all duration-500 m-4 p-4">
          <h3 title={article.title} className="max-md:text-lg text-xl normal-case line-clamp-2 leading-snug mb-auto">
            {article.title}
          </h3>

          <div className="flex flex-wrap justify-between items-center gap-2 border-t font-medium text-text/60 text-xs sm:text-sm mt-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="max-w-25 sm:max-w-none truncate">{article.type}</span>
              <span className="opacity-50">•</span>
              <span className="max-w-25 sm:max-w-none truncate">{article.category}</span>
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
