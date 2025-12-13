import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.storyBrandedResidences()

export default function StoryBrandedResidences() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Story Branded Residences</h1>
      <p>Luxury branded residences by Urbnlanes.</p>
    </div>
  )
}
