import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '../ui/unstyled/ImageIn'
import TText from '@/translations/TText'
import BreathingText from '@/components/ui/text/BreathingText'

export default function OurProjectsHero() {
  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-black text-text">
      <ImageIn
        src={'/images/projects/noi/noi-gallery-18.webp'}
        alt="Background Page"
        priority
        sizes="100vw"
        className="opacity-60 scale-120"
        divClassName="absolute! inset-0"
        hasIconOverlay
      />

      <AnimIn data-scroll data-scroll-speed="0.2" className="z-10 relative w-full h-full flex flex-col justify-end items-center duration-300 p-4 max-md:py-20">
        <BreathingText as="div" repeatDelay={2} className="w-full text-[10dvw] text-center text-nowrap ltr:leading-none max-md:pb-6">
          <TText tKey={`nav.ourProjects`} />
        </BreathingText>

        <AnimText
          as={'p'}
          delay={0.9}
          className="max-w-5xl text-text/90 max-md:text-xs text-sm text-center normal-case text-balance leading-relaxed tracking-wider"
        >
          <TText tKey={`common.projectsDesc`} />
        </AnimText>
      </AnimIn>
    </section>
  )
}
