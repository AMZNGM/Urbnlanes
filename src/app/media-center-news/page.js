import { getDatabase } from '@/database/urbnlanes-db.json'
import NewsCard from '@/components/news-components/NewsCard'

export const metadata = {
  title: 'Media Center - News | Urbnlanes',
  description: 'Latest news and updates from Urbnlanes real estate development',
}

export default function MediaCenterNews() {
  const db = getDatabase()

  return (
    <div title="Media Center">
      <p className="text-lg text-text/80 mb-8">{db.mediacenter.headline}</p>

      <section className="space-y-8">
        {db.mediacenter.blogs.map((blog) => (
          <NewsCard key={blog.id} blog={blog} />
        ))}
      </section>
    </div>
  )
}
