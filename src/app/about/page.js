import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.about()

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>About Urbnlanes</h1>
      <p>Learn more about Urbnlanes, a diversified real estate development company.</p>
    </div>
  )
}
