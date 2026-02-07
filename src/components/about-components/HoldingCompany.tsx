import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import BreathingText from '@/components/ui/text/BreathingText'

export default function HoldingCompany() {
  return (
    <section className="rtl:hidden relative w-dvw overflow-hidden bg-bg text-text px-4 max-md:px-2 pb-18">
      <AnimIn className="flex max-md:flex-col justify-center items-center px-18 max-md:px-4">
        <BreathingText staggerFrom="center" className="md:hidden text-[9.5dvw] text-center text-nowrap">
          <TText tKey="common.holdingCompany" />
        </BreathingText>

        <BreathingText staggerFrom="first" className="max-md:hidden text-[8.2dvw] text-center text-nowrap">
          <TText tKey="common.holding" />
        </BreathingText>

        <ImageIn src="/images/logos/eagroup-logo.webp" alt="EA Group Logo" sizes="10dvw" className="object-contain!" divClassName="w-full h-18! relative" />

        <BreathingText staggerFrom="last" className="max-md:hidden text-[8.2dvw] text-center text-nowrap">
          <TText tKey="common.company" />
        </BreathingText>
      </AnimIn>
    </section>
  )
}
