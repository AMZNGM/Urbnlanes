import TText from '@/translations/TText'
import db from '@/database/urbnlanes-db.json'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import Heading from '@/components/ui/Heading'
import MainBtn from '@/components/ui/buttons/MainBtn'
import NewsCard from '@/components/news-components/NewsCard'

export default function LatestNews({ className, withHeading = true }: { className?: string; withHeading?: boolean }) {
  const latestArticles = [...db.mediacenter.blogs, ...db.mediacenter.news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

  return (
    <section className={`relative w-full h-full overflow-hidden bg-black text-text px-4 py-8 ${className}`}>
      <div className="flex justify-between items-end pb-12">
        {withHeading ? <Heading className="mb-0!" text={<TText tKey="common.latestNews" />} /> : <div></div>}
        <MainBtn to="/media-center-news" tKey="common.allNews" />
      </div>

      <div className="gap-4 grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2">
        {latestArticles.map((article, index) => (
          <AnimIn key={article.id} delay={0.1 * index}>
            <NewsCard article={article} />
          </AnimIn>
        ))}
      </div>
    </section>
  )
}
