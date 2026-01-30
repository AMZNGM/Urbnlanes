import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function PartnersHero() {
  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-text text-text p-2">
      <div data-scroll data-scroll-speed="-0.6" className="relative w-full h-full">
        <ImageIn
          src="/images/projects/noi/noi-gallery-11.webp"
          alt="Partners & Associates"
          priority
          sizes="100vw"
          className="scale-100!"
          divClassName="overflow-hidden rounded-2xl blur-none!"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/75 rounded-2xl" />
      </div>

      <div className="z-10 absolute inset-0 flex flex-col justify-end duration-300 ease-linear px-18 max-md:px-4 py-8 max-md:py-28">
        <AnimText as="h1" className="font-sec max-md:text-5xl text-6xl leading-12 rtl:leading-22 tracking-tight">
          <TText tKey="nav.partners" />
        </AnimText>

        <AnimText as={'p'} delay={0.4} className="max-w-3xl text-text/90 text-lg normal-case md:text-balance leading-relaxed tracking-wider">
          <TText tKey="partners.partnersDesc" />
        </AnimText>
      </div>
    </section>
  )
}
