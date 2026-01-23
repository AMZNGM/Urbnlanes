import TText from '@/translations/TText'
import AnimText from '@/components/ui/text/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function PartnersHero() {
  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-black text-text">
      <ImageIn
        src="/images/projects/noi/noi-gallery-11.webp"
        alt="Partners & Associates"
        sizes="100vw"
        className="hover:scale-100!"
        divClassName="absolute! inset-0 "
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/75" />

      <div className="relative w-full h-full flex flex-col justify-end p-18 max-md:px-4">
        <AnimText as="h1" className="font-sec max-md:text-5xl text-6xl leading-12 rtl:leading-22 tracking-tight">
          <TText tKey="nav.partners" />
        </AnimText>

        <AnimText
          as={'p'}
          delay={0.4}
          className="max-w-3xl text-text/90 text-lg normal-case md:text-balance leading-relaxed tracking-wider"
        >
          <TText tKey="common.partnersDesc" />
        </AnimText>
      </div>
    </section>
  )
}
