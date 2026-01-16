import { metadataGenerators } from '@/lib/seo-helpers'

export const generateMetadata = metadataGenerators.mediaCenterNews()

export default function MediaCenterNews() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Media Center & News</h1>
      <p>Latest news and media updates from Urbnlanes.</p>
    </div>
  )
}
