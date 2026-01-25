import { metadataGenerators } from '@/seo/seo-helpers'

export const generateMetadata = metadataGenerators.constructionUpdates()

export default function ConstructionUpdates() {
  return (
    <div className="px-4 py-8">
      <h1>Construction Updates</h1>
      <p>Latest progress updates on our construction projects.</p>
    </div>
  )
}
