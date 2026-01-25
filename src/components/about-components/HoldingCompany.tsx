import Image from 'next/image'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import BreathingText from '@/components/ui/text/BreathingText'

export default function HoldingCompany() {
  return (
    <section className="rtl:hidden relative w-dvw overflow-hidden bg-text text-black max-md:pb-12">
      <AnimIn className="flex max-md:flex-col justify-center items-center px-18 max-md:px-4">
        <p className="md:hidden space-x-4 font-bold text-[8.5dvw] text-center text-nowrap">
          <span>
            <TText tKey="common.holding" />
          </span>
          <span>
            <TText tKey="common.company" />
          </span>
        </p>

        <BreathingText staggerFrom="first" className="max-md:hidden text-[8.2dvw] text-center text-nowrap">
          <TText tKey="common.holding" />
        </BreathingText>

        <Image
          src="/images/logos/eagroup-logo.webp"
          alt="EA Group Logo"
          width={400}
          height={400}
          sizes="10dvw"
          className="w-50 h-auto object-contain invert"
        />

        <BreathingText staggerFrom="last" className="max-md:hidden text-[8.2dvw] text-center text-nowrap">
          <TText tKey="common.company" />
        </BreathingText>
      </AnimIn>
    </section>
  )
}
