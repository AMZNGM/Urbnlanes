import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function PartnersCTA() {
  return (
    <section className="relative w-dvw overflow-hidden bg-black text-text px-18 max-md:px-4 py-24">
      <AnimIn className="max-w-3xl space-y-8 text-center mx-auto">
        <AnimText as="h2" className="font-sec text-3xl tracking-wider">
          <TText tKey="common.partnersCTA" />
        </AnimText>

        <AnimText as="p" className="opacity-80 leading-relaxed">
          <TText tKey="common.partnersCTADesc" />
        </AnimText>

        <MainBtn href="mailto:partnerships@urbnlanes.com" tKey="nav.getInTouch" className="mt-8" />
      </AnimIn>
    </section>
  )
}
