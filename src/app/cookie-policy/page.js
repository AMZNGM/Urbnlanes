import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.cookiePolicy()

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies</h2>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website to remember your
                  actions and preferences (such as login, language, font size, and other display preferences) over a period of time, so you
                  don&apos;t have to keep re-entering them whenever you come back to the site or browse from one page to another.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Cookies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Essential Cookies</h3>
                    <p className="text-gray-600">
                      These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually
                      only set in response to actions made by you which amount to a request for services.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Performance Cookies</h3>
                    <p className="text-gray-600">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                      They help us to know which pages are the most and least popular and see how visitors move around the site.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Functional Cookies</h3>
                    <p className="text-gray-600">
                      These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by
                      third-party providers whose services we have added to our pages.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Targeting Cookies</h3>
                    <p className="text-gray-600">
                      These cookies may be set through our site by our advertising partners. They may be used by those companies to build a
                      profile of your interests and show you relevant adverts on other sites.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Cookies</h2>
                <p className="text-gray-600 mb-4">
                  In some special cases we also use cookies provided by trusted third parties. The following section details which
                  third-party cookies you might encounter through this site.
                </p>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    <strong>Google Analytics:</strong> Used for website analytics and performance tracking
                  </p>
                  <p>
                    <strong>Social Media Cookies:</strong> Used when you share content on social platforms
                  </p>
                  <p>
                    <strong>Advertising Cookies:</strong> Used to serve relevant advertisements
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Managing Cookies</h2>
                <p className="text-gray-600 mb-4">
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you
                  can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some
                  preferences every time you visit a site and some services and functionality may not work.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Choices</h2>
                <p className="text-gray-600 mb-4">
                  You have the right to accept or reject cookies. You can manage your cookie preferences through the cookie consent banner
                  on our website or through your browser settings.
                </p>
                <div className="mt-4">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Browser Settings</h3>
                  <p className="text-gray-600">
                    Most browsers allow you to control cookies through their settings. Please note that disabling cookies may affect the
                    functionality of our website.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">If you have any questions about our Cookie Policy, please contact us at:</p>
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
