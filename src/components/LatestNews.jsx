'use client'

import { motion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import db from '@/database/urbnlanes-db.json'
import Heading from '@/components/ui/Heading'
import MainBtn from '@/components/ui/buttons/MainBtn'
import NewsCard from '@/components/news-components/NewsCard'

export default function LatestNews() {
  const { t } = useTranslation()
  const blogs = db.mediacenter.blogs
  const news = db.mediacenter.news
  const latestArticles = [...blogs, ...news].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)

  return (
    <section className="relative w-full h-full overflow-hidden bg-black text-text px-4 py-8">
      <div className="flex justify-between items-center">
        <Heading text={t('common.latestNews')} />

        <MainBtn to="/media-center-news" className="mt-16">
          {t('common.allNews')}
        </MainBtn>
      </div>

      <div className="gap-4 grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2">
        {latestArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 * index }}
          >
            <NewsCard key={article.id} article={article} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
