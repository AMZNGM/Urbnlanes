import { metadataGenerators } from '@/seo/seo-helpers'
import { SoftLine } from '@/components/ui/effects/Lines'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'

export const generateMetadata = metadataGenerators.cookiePolicy

export default function CookiePolicyPage() {
  return (
    <main className="relative w-full min-h-dvh overflow-hidden bg-bg text-text p-12 max-md:px-4">
      <SoftLine className="h-1!" />
      <h1 className="font-sec text-[5vw] max-md:text-[10vw] max-lg:text-[8vw] text-center ltr:leading-[0.95] rtl:leading-24 tracking-tight">Cookie Policy</h1>
      <SoftLine className="h-1!" />

      <AnimText as="p" delay={0.2} className="font-light text-center italic">
        Last updated: {new Date().toLocaleDateString()}
      </AnimText>

      <AnimIn delay={0.3} className="space-y-6 text-center mt-12">
        <h2 className="font-sec text-3xl">What Are Cookies</h2>
        <div className="space-y-4 font-light text-bg/80 text-lg normal-case leading-relaxed">
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website to remember your actions and preferences
            (such as login, language, font size, and other display preferences) over a period of time.
          </p>
        </div>
      </AnimIn>

      <div className="space-y-16 mt-12">
        <AnimIn delay={0.4} className="space-y-6">
          <h2 className="font-sec text-3xl">How We Use Cookies</h2>
          <div className="gap-8 grid md:grid-cols-2">
            {[
              {
                title: 'Essential Cookies',
                desc: 'Necessary for the website to function and cannot be switched off in our systems.',
              },
              {
                title: 'Performance Cookies',
                desc: 'Allow us to count visits and traffic sources so we can measure and improve performance.',
              },
              {
                title: 'Functional Cookies',
                desc: 'Enable the website to provide enhanced functionality and personalization.',
              },
              {
                title: 'Targeting Cookies',
                desc: 'May be set through our site by our advertising partners to build a profile of your interests.',
              },
            ].map((cookie, i) => (
              <div key={i} className="bg-main/25 border rounded-lg p-8">
                <h3 className="font-medium text-xl mb-4">{cookie.title}</h3>
                <p className="font-light normal-case">{cookie.desc}</p>
              </div>
            ))}
          </div>
        </AnimIn>

        <AnimIn delay={0.5} className="space-y-6">
          <h2 className="font-sec text-3xl">Third-Party Cookies</h2>
          <p className="font-light text-lg normal-case mb-6">In some special cases we also use cookies provided by trusted third parties:</p>
          <ul className="gap-4 grid md:grid-cols-3">
            {[
              { label: 'Google Analytics', desc: 'Website analytics' },
              { label: 'Social Media', desc: 'Sharing content' },
              { label: 'Advertising', desc: 'Relevant ads' },
            ].map((item, i) => (
              <li key={i} className="bg-main/25 border rounded-lg p-6">
                <strong className="block mb-2">{item.label}</strong>
                <span className="font-light normal-case">{item.desc}</span>
              </li>
            ))}
          </ul>
        </AnimIn>

        <AnimIn delay={0.6} className="space-y-6">
          <h2 className="font-sec text-3xl">Managing Cookies</h2>
          <p className="font-light text-lg normal-case leading-relaxed">
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to
            prevent them from being placed.
          </p>
        </AnimIn>

        <AnimIn delay={0.7} className="space-y-6">
          <h2 className="font-sec text-3xl">Contact Us</h2>
          <div className="inline-block w-full bg-main/25 border rounded-3xl normal-case p-10">
            <p className="mb-6">If you have any questions about our Cookie Policy, please contact us at:</p>
            <div className="space-y-2 text-xl">
              <p>
                Email:{' '}
                <a href="mailto:privacy@urbnlanes.com" className="hover:underline">
                  privacy@urbnlanes.com
                </a>
              </p>
              <p>Phone: +20 123 456 7890</p>
              <p>Address: Cairo, Egypt</p>
            </div>
          </div>
        </AnimIn>
      </div>
    </main>
  )
}
