import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '../ui/unstyled/ImageIn'
import TText from '@/translations/TText'
import BreathingText from '@/components/ui/text/BreathingText'

export default function OurProjectsHero() {
  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-text text-text p-2">
      <ImageIn
        src={'/images/projects/noi/noi-gallery-18.webp'}
        alt="Background Page"
        priority
        sizes="100vw"
        className="scale-100!"
        divClassName="overflow-hidden rounded-lg blur-none!"
        data-scroll
        data-scroll-speed="-0.6"
      />

      <AnimIn
        data-scroll
        data-scroll-speed="0.5"
        className="z-50 absolute inset-0 flex flex-col justify-end items-center duration-300 ease-linear px-18 max-md:px-4 py-8 max-md:py-22"
      >
        <BreathingText as="div" repeatDelay={2} className="text-[10dvw] text-center text-nowrap ltr:leading-none max-md:pb-6">
          <TText tKey={`nav.ourProjects`} />
        </BreathingText>

        <AnimText
          as={'p'}
          delay={0.9}
          data-scroll
          data-scroll-speed="0.7"
          className="max-w-5xl text-text/90 max-md:text-xs text-sm text-center normal-case text-balance leading-relaxed tracking-wider ease-linear"
        >
          <TText tKey={`common.projectsDesc`} />
        </AnimText>
      </AnimIn>
    </section>
  )
}
