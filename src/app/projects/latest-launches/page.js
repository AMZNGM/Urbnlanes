import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.latestLaunches()

export default function LatestLaunchesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Latest Launches</h1>
      <p>Discover the latest launches by Urbnlanes.</p>
    </div>
  )
}
