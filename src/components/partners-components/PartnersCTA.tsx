import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function PartnersCTA() {
  return (
    <section className="relative w-dvw overflow-hidden bg-text text-bg px-4 max-md:px-2">
      <MotionLine className="mb-24" />

      <AnimIn className="max-w-sm space-y-8 text-center mx-auto">
        <AnimText as="h2" className="text-5xl leading-10!">
          <TText tKey="partners.partnersCTA" />
        </AnimText>

        <MainBtn href="mailto:partnerships@urbnlanes.com" tKey="nav.getInTouch" className="hover:bg-text! hover:text-bg!" />
      </AnimIn>

      <MotionLine className="mt-18" />
    </section>
  )
}
