'use client'

import { useNews } from '@/hooks/useNews'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import NewsCard from '@/components/news-components/NewsCard'
import MediaCenterSearch from '@/components/news-components/MediaCenterSearch'

export default function MediaCenterNewsFeed() {
  const newsState = useNews()
  const { filteredItems } = newsState

  return (
    <section className="relative overflow-hidden space-y-8 bg-text text-bg px-8 max-md:px-2 py-32 max-md:py-24">
      <MediaCenterSearch {...newsState} />

      {filteredItems.length > 0 &&
        (!newsState.searchQuery && newsState.selectedFilter === 'all' ? (
          <AnimIn reAnim className="flex rtl:flex-row-reverse rtl:justify-end gap-[2dvw] text-[6dvw] max-md:text-[10dvw] normal-case">
            <AnimText as={'h2'} className="rtl:leading-32!">
              <TText tKey="db.metadata.company.title" />
            </AnimText>
            <AnimText as={'h2'} className="rtl:leading-32!">
              <TText tKey="nav.news" />
            </AnimText>
          </AnimIn>
        ) : (
          <AnimIn reAnim className="flex gap-[2dvw] text-[6dvw] max-md:text-[10dvw] normal-case">
            <AnimText as={'h2'} className="leading-32!">
              <TText tKey="news.filteredNews" />
            </AnimText>
          </AnimIn>
        ))}

      <div className="gap-2 grid lg:grid-cols-2">
        {filteredItems.slice(0, 2).map((article, index) => (
          <AnimIn layout reAnim key={article.id} delay={0.1 * index} className="aspect-7/5 max-md:aspect-square">
            <NewsCard article={article as any} look="mono" />
          </AnimIn>
        ))}
      </div>

      <div className="gap-2 grid grid-cols-2 xl:grid-cols-4 mt-24">
        {filteredItems.slice(2, 6).map((article, index) => (
          <AnimIn layout reAnim key={article.id} delay={0.1 * index} className="aspect-5/5">
            <NewsCard article={article as any} look="monoSm" />
          </AnimIn>
        ))}
      </div>

      <div className="md:aspect-12/5 gap-2 grid grid-cols-6 max-md:grid-cols-3 grid-rows-4 mt-24 lg:show">
        {filteredItems.slice(6, 11).map((article, index) => (
          <AnimIn
            layout
            reAnim
            key={article.id}
            delay={0.1 * index}
            className={`${index === 0 ? 'col-span-4 row-span-full max-md:col-span-3 max-md:aspect-6/5' : 'col-span-2 max-md:col-span-3 max-md:aspect-12/5'}`}
          >
            <NewsCard article={article as any} look={index === 0 ? 'mono' : 'monoSide'} />
          </AnimIn>
        ))}
      </div>

      <div className="gap-2 grid grid-cols-2 xl:grid-cols-4 mt-24">
        {filteredItems.slice(11, 19).map((article, index) => (
          <AnimIn layout reAnim key={article.id} delay={0.1 * index} className="aspect-5/5 max-md:aspect-4/5">
            <NewsCard article={article as any} look="monoSm" />
          </AnimIn>
        ))}
      </div>

      <div className="gap-2 grid grid-cols-2 lg:grid-cols-6 mt-24">
        {filteredItems.slice(19, 21).map((article, index) => (
          <AnimIn layout reAnim key={article.id} delay={0.1 * index} className={`${index === 0 ? 'col-span-4 aspect-7/5' : 'col-span-2 aspect-6/5'}`}>
            <NewsCard article={article as any} look="mono" />
          </AnimIn>
        ))}
      </div>

      <div className="gap-2 grid grid-cols-2 xl:grid-cols-4 mt-24">
        {filteredItems.slice(21).map((article, index) => (
          <AnimIn layout reAnim key={article.id} delay={0.1 * index} className="aspect-5/5 max-md:aspect-4/5">
            <NewsCard article={article as any} look="monoSm" />
          </AnimIn>
        ))}
      </div>
    </section>
  )
}
