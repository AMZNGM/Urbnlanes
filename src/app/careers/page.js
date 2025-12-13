import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.careers()

export default function Careers() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Careers</h1>
      <p>Join our team and build your career with Urbnlanes.</p>
    </div>
  )
}
