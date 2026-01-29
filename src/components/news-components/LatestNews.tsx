import { ScrollArrows } from '@/components/ui/buttons/ArrowBtn'
import db from '@/database/urbnlanes-db.json'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import NewsCard from '@/components/news-components/NewsCard'

export default function LatestNews({ className }: { className?: string }) {
  let latestArticles = [...db.mediacenter.blogs, ...db.mediacenter.news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6)

  return (
    <section className={`relative bg-text text-black py-12 ${className}`}>
      <div className="flex gap-2 max-md:mx-4 ms-18 mb-4">
        <MainBtn to="/media-center-news" tKey="common.allNews" look="mono" />
        <ScrollArrows />
      </div>

      <div data-scroll-container style={{ scrollbarWidth: 'none' }} className="overflow-x-auto flex gap-2">
        <div className="w-1/10 shrink-0" />
        {latestArticles.map((article, index) => (
          <AnimIn blur key={article.id} delay={0.1 * index} className="w-160 shrink-0">
            <NewsCard article={article} />
          </AnimIn>
        ))}
        <div className="w-1/10 shrink-0" />
      </div>
    </section>
  )
}
