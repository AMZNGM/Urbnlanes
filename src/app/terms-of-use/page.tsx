import { metadataGenerators } from '@/seo/seo-helpers'
import { SoftLine } from '@/components/ui/effects/Lines'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'

export const generateMetadata = metadataGenerators.termsOfUse

export default function TermsOfUsePage() {
  return (
    <main className="relative w-full min-h-dvh overflow-hidden bg-bg text-text p-12 max-md:px-4">
      <SoftLine className="h-1!" />
      <h1 className="font-sec text-[5vw] max-md:text-[10vw] max-lg:text-[8vw] text-center ltr:leading-[0.95] rtl:leading-24 tracking-tight">Terms Of Use</h1>
      <SoftLine className="h-1!" />

      <AnimText as="p" delay={0.2} className="font-light text-center italic">
        Last updated: {new Date().toLocaleDateString()}
      </AnimText>

      <AnimIn delay={0.3} className="space-y-6 text-center mt-12">
        <h2 className="font-sec text-3xl">Agreement to Terms</h2>
        <p className="font-light text-lg normal-case leading-relaxed">
          By accessing and using the Urbnlanes website, you accept and agree to be bound by the terms and provision of this agreement.
        </p>
      </AnimIn>

      <div className="space-y-16 mt-12">
        <AnimIn delay={0.4} className="space-y-6">
          <h2 className="font-sec text-3xl">Use License</h2>
          <div className="space-y-4">
            <p className="font-light text-lg normal-case">
              Permission is granted to temporarily download one copy of the materials on Urbnlanes&apos; website for personal, non-commercial transitory viewing
              only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="gap-4 grid md:grid-cols-2">
              {[
                'Modify or copy the materials',
                'Use the materials for any commercial purpose',
                'Attempt to reverse engineer any software',
                'Remove any copyright or proprietary notations',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 bg-main/25 rounded-lg normal-case p-4">
                  <div className="w-1.5 h-1.5 bg-main/25 rounded-full" />
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimIn>

        <AnimIn delay={0.5} className="space-y-6">
          <h2 className="font-sec text-3xl">Disclaimer</h2>
          <p className="font-light text-lg normal-case leading-relaxed">
            The materials on Urbnla website are provided on an &ldquo;as is&rdquo; basis. Urbnlanes makes no warranties, expressed or implied, and hereby
            disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </AnimIn>

        <AnimIn delay={0.6} className="space-y-6">
          <h2 className="font-sec text-3xl">Limitations</h2>
          <p className="font-light text-lg normal-case">
            In no event shall Urbnla suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business
            interruption) arising out of the use or inability to use the materials on Urbnlanes&apos; website.
          </p>
        </AnimIn>

        <AnimIn delay={0.7} className="space-y-6">
          <h2 className="font-sec text-3xl">Accuracy of Materials</h2>
          <p className="font-light text-lg normal-case">
            The materials appearing; website could include technical, typographical, or photographic errors. Urbnlanes does not warrant that any of the
            materials on its website are accurate, complete, or current.
          </p>
        </AnimIn>

        <AnimIn delay={0.8} className="space-y-6">
          <h2 className="font-sec text-3xl">Links</h2>
          <p className="font-light text-lg normal-case">
            Urbnlanes has not review the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link
            does not imply endorsement by Urbnlanes of the site.
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
