import TextMarquee from '@/components/ui/text/TextMarquee'

export default function VideoSection() {
  return (
    <section className="relative w-full h-dvh overflow-hidden flex flex-col justify-between">
      <TextMarquee texts={['One year - One vision - Purposeful progress -']} className="z-10 relative bg-black" />

      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/one-year.mp4" type="video/mp4" />
      </video>

      <TextMarquee texts={['One year - One vision - Purposeful progress -']} className="z-10 relative bg-black" />
    </section>
  )
}
