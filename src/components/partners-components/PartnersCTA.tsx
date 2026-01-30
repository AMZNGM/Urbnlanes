import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import { MotionLine } from '@/components/ui/effects/Lines'

export default function PartnersCTA() {
  return (
    <section className="relative w-dvw overflow-hidden bg-text text-bg px-18 max-md:px-4">
      <MotionLine className="mb-24" />

      <AnimIn className="max-w-xl space-y-8 text-center mx-auto">
        <AnimText as="h2" className="font-black text-5xl leading-10!">
          <TText tKey="partners.partnersCTA" />
        </AnimText>

        <MainBtn href="mailto:partnerships@urbnlanes.com" tKey="nav.getInTouch" look="dark" className="hover:bg-text! hover:text-bg!" />

        <AnimText as="p" className="font-semibold text-balance leading-2">
          <TText tKey="partners.partnersCTADesc" />
        </AnimText>
      </AnimIn>

      <MotionLine className="mt-24" />
    </section>
  )
}
