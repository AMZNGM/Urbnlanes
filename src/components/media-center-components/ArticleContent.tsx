'use client'

import { useRouter } from 'next/navigation'
import TText from '@/translations/TText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import { ChevronLeft, Share2, Calendar, Tag } from 'lucide-react'
import { motion } from 'motion/react'
import LatestNews from '@/components/news-components/LatestNews'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function ArticleContent({ article }: { article: any }) {
  const router = useRouter()

  const images = Array.isArray(article.image) ? article.image : [article.image]
  const contents = Array.isArray(article.content) ? article.content : [article.content]
  const dateStr = article.date

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: article.title,
        url: window.location.href,
      })
    }
  }

  return (
    <main className="min-h-screen bg-bg text-text pb-24">
      {/* Article Header & Hero */}
      <section className="relative w-dvw px-4 md:px-18 pt-48 pb-24">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => router.back()} className="group flex items-center gap-2 text-main/60 hover:text-main transition-colors mb-12 cursor-pointer">
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span className="font-black text-xs uppercase tracking-widest">Back to Media Center</span>
          </button>

          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-main/10 border border-main/20 rounded-full px-4 py-1.5">
              <Calendar size={14} className="text-main" />
              <span className="opacity-80 font-bold text-xs uppercase tracking-widest">{dateStr}</span>
            </div>
            <div className="flex items-center gap-2 bg-main/10 border border-main/20 rounded-full px-4 py-1.5">
              <Tag size={14} className="text-main" />
              <span className="opacity-80 font-bold text-xs uppercase tracking-widest">{article.category || article.type}</span>
            </div>
          </div>

          <AnimText as="h1" className="max-w-5xl font-black text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter mb-12">
            {article.title}
          </AnimText>

          <div className="relative aspect-video overflow-hidden border border-main/10 rounded-4xl">
            <ImageIn src={images[0] || '/images/blogs/blog-placeholder.webp'} alt={article.title} className="scale-100!" />
            <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="z-10 relative px-4 md:px-18 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {contents.map((paragraph: string, index: number) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="font-sec font-medium text-text/80 text-xl md:text-2xl leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {images.length > 1 && (
            <div className="gap-4 md:gap-8 grid grid-cols-2 my-24">
              {images.slice(1).map((img: string, i: number) => (
                <div key={i} className="relative aspect-square overflow-hidden border border-main/10 rounded-3xl">
                  <ImageIn src={img as string} alt={`${article.title} gallery ${i}`} />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap justify-between items-center gap-8 border-main/10 border-t mt-24 pt-12">
            {article.source && (
              <a
                href={article.source}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-main text-sm hover:underline uppercase tracking-widest"
              >
                View Original Source
              </a>
            )}

            <button
              onClick={handleShare}
              className="flex items-center gap-3 bg-main rounded-full font-black text-bg text-xs uppercase tracking-widest hover:scale-105 transition-transform px-8 py-4 cursor-pointer"
            >
              <Share2 size={18} />
              Share Article
            </button>
          </div>
        </div>
      </section>

      {/* Related News */}
      <section className="mt-24">
        <LatestNews />
      </section>
    </main>
  )
}
