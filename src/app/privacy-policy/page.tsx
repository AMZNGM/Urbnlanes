import { metadataGenerators } from '@/seo/seo-helpers'
import { SoftLine } from '@/components/ui/effects/Lines'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'

export const generateMetadata = metadataGenerators.privacyPolicy

export default function PrivacyPolicyPage() {
  return (
    <main className="relative w-full min-h-dvh overflow-hidden bg-bg text-text p-12 max-md:px-4">
      <SoftLine className="h-1!" />
      <h1 className="font-sec text-[5vw] max-md:text-[10vw] max-lg:text-[8vw] text-center ltr:leading-[0.95] rtl:leading-24 tracking-tight">
        Website Privacy Notice
      </h1>
      <SoftLine className="h-1!" />

      <AnimText as="p" delay={0.2} className="font-light text-center italic">
        Last updated: {new Date().toLocaleDateString()}
      </AnimText>

      <AnimIn delay={0.3} className="space-y-6 text-center mt-12">
        <h2 className="font-sec text-3xl">Introduction</h2>
        <div className="space-y-4 font-light text-bg/80 text-lg normal-case leading-relaxed">
          <p>
            Urbnlanes is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you visit our website and use our services.
          </p>
        </div>
      </AnimIn>

      <div className="space-y-16 mt-12">
        <AnimIn delay={0.4} className="space-y-6">
          <h2 className="font-sec text-3xl">Information We Collect</h2>
          <div className="gap-8 grid md:grid-cols-3">
            <div className="bg-main/25 border rounded-2xl p-8">
              <h3 className="font-medium text-xl mb-4">Personal Information</h3>
              <p className="font-light/70 normal-case">
                Name, email address, phone number, and other contact information you provide when you inquire about our properties or services.
              </p>
            </div>
            <div className="bg-main/25 border rounded-2xl p-8">
              <h3 className="font-medium text-xl mb-4">Usage Data</h3>
              <p className="font-light/70 normal-case">
                Information about how you interact with our website, including pages visited, time spent, and other analytics data.
              </p>
            </div>
            <div className="bg-main/25 border rounded-2xl p-8">
              <h3 className="font-medium text-xl mb-4">Technical Information</h3>
              <p className="font-light/70 normal-case">IP address, browser type, device information, and other technical data collected automatically.</p>
            </div>
          </div>
        </AnimIn>

        <AnimIn delay={0.5} className="space-y-6">
          <h2 className="font-sec text-3xl">How We Use Your Information</h2>
          <ul className="gap-4 grid md:grid-cols-2">
            {[
              'To provide and maintain our services',
              'To respond to your inquiries and requests',
              'To send you information about our properties and services',
              'To improve our website and user experience',
              'To comply with legal obligations',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 bg-main/25 rounded-2xl normal-case p-4">
                <div className="w-1.5 h-1.5 bg-main/25 rounded-full" />
                <span className="font-light/80">{item}</span>
              </li>
            ))}
          </ul>
        </AnimIn>

        <AnimIn delay={0.6} className="space-y-6">
          <h2 className="font-sec text-3xl">Information Sharing</h2>
          <p className="font-light/80 text-lg normal-case">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
          </p>
        </AnimIn>

        <AnimIn delay={0.7} className="space-y-6">
          <h2 className="font-sec text-3xl">Data Security</h2>
          <p className="font-light/80 text-lg normal-case">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration,
            disclosure, or destruction.
          </p>
        </AnimIn>

        <AnimIn delay={0.8} className="space-y-6">
          <h2 className="font-sec text-3xl">Contact Us</h2>
          <div className="inline-block w-full bg-main/25 border rounded-3xl normal-case p-10">
            <p className="mb-6">If you have any questions about this Privacy Policy, please contact us at:</p>
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
