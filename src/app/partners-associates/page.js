import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.partnersAssociates()

export default function PartnersAssociates() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Partners & Associates</h1>
      <p>Our trusted partners and associates.</p>
    </div>
  )
}
