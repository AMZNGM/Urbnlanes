import { metadataGenerators } from '@/lib/seo-helpers'
import { getRouteConfig } from '@/config/routes.config'

export const metadata = metadataGenerators.termsOfUse()

export default function TermsOfUsePage() {
  const routeConfig = getRouteConfig('/terms-of-use')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Use</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agreement to Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using the Urbnlanes website, you accept and agree to be bound by the terms and provision of this
                  agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use License</h2>
                <p className="text-gray-600 mb-4">
                  Permission is granted to temporarily download one copy of the materials on Urbnlanes&apos; website for personal,
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license
                  you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
                <p className="text-gray-600 mb-4">
                  The materials on Urbnlanes&apos; website are provided on an &ldquo;as is&rdquo; basis. Urbnlanes makes no warranties,
                  expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied
                  warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual
                  property or other violation of rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitations</h2>
                <p className="text-gray-600 mb-4">
                  In no event shall Urbnlanes or its suppliers be liable for any damages (including, without limitation, damages for loss of
                  data or profit, or due to business interruption) arising out of the use or inability to use the materials on
                  Urbnlanes&apos; website, even if Urbnlanes or an Urbnlanes authorized representative has been notified orally or in
                  writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accuracy of Materials</h2>
                <p className="text-gray-600 mb-4">
                  The materials appearing on Urbnlanes&apos; website could include technical, typographical, or photographic errors.
                  Urbnlanes does not warrant that any of the materials on its website are accurate, complete, or current. Urbnlanes may make
                  changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Links</h2>
                <p className="text-gray-600 mb-4">
                  Urbnlanes has not reviewed all of the sites linked to its website and is not responsible for the contents of any such
                  linked site. The inclusion of any link does not imply endorsement by Urbnlanes of the site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Terms of Use Modifications</h2>
                <p className="text-gray-600 mb-4">
                  Urbnlanes may revise these terms of service for its website at any time without notice. By using this website, you are
                  agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you
                  irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-600 mb-4">If you have any questions about these Terms of Use, please contact us at:</p>
                <div className="mt-4 text-gray-600">
                  <p>Email: legal@urbnlanes.com</p>
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
