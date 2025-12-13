import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.privacyPolicy()

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Urbnlanes (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our
                  services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Personal Information</h3>
                    <p className="text-gray-600">
                      Name, email address, phone number, and other contact information you provide when you inquire about our properties or
                      services.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Usage Data</h3>
                    <p className="text-gray-600">
                      Information about how you interact with our website, including pages visited, time spent, and other analytics data.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Technical Information</h3>
                    <p className="text-gray-600">
                      IP address, browser type, device information, and other technical data collected automatically.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>To provide and maintain our services</li>
                  <li>To respond to your inquiries and requests</li>
                  <li>To send you information about our properties and services</li>
                  <li>To improve our website and user experience</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as
                  described in this policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  You have the right to access, update, or delete your personal information. Please contact us to exercise these rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600">If you have any questions about this Privacy Policy, please contact us at:</p>
                <div className="mt-4 text-gray-600">
                  <p>Email: privacy@urbnlanes.com</p>
                  <p>Phone: [Your Phone Number]</p>
                  <p>Address: [Your Address]</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
