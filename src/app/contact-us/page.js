import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.contactUs()

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Contact Us</h1>
      <p>Get in touch with Urbnlanes.</p>
    </div>
  )
}
