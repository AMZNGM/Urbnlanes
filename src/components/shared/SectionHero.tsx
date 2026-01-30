import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '../ui/unstyled/ImageIn'
import BreathingText from '@/components/ui/text/BreathingText'

export default function SectionHero({ image = '', tKey = '', tKeyPara = '' }: { image: string; tKey: string; tKeyPara?: string }) {
  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-text text-text p-2">
      <ImageIn src={image} alt="Background Image" priority sizes="100vw" className="scale-100!" divClassName="overflow-hidden rounded-2xl blur-none!" />

      <AnimIn
        data-scroll
        data-scroll-speed="0.6"
        className="z-50 absolute inset-0 flex flex-col justify-end items-center duration-300 ease-linear px-18 max-md:px-4 py-8 max-md:py-28"
      >
        <BreathingText as="div" repeatDelay={2} className="text-[13dvw] max-md:text-[12dvw] text-center text-nowrap ltr:leading-none">
          <TText tKey={tKey} />
        </BreathingText>

        <MotionLine className="max-md:hidden" />

        <AnimText
          as="h1"
          delay={0.9}
          data-scroll
          data-scroll-speed="0.2"
          className="max-md:hidden max-w-5xl text-text/90 max-md:text-xs text-sm text-center normal-case text-balance leading-relaxed tracking-wider ease-linear"
        >
          <TText tKey={tKeyPara} />
        </AnimText>
      </AnimIn>
    </section>
  )
}
