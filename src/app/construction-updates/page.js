import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.constructionUpdates()

export default function ConstructionUpdates() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Construction Updates</h1>
      <p>Latest progress updates on our construction projects.</p>
    </div>
  )
}
