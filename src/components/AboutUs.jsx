import TextScrollOpacity from '@/components/ui/TextScrollOpacity'

export default function AboutUs() {
  const vid = '/videos/projects/yellow-residence/yr-sneak-peak.mp4'

  return (
    <section className="relative w-full h-full overflow-hidden flex md:flex-row flex-col bg-black max-md:px-4">
      <div className="relative w-full md:w-1/2 h-dvh max-md:h-[50vh]">
        <video
          src={vid}
          autoPlay
          loop
          muted
          playsInline
          className="hover:z-10 absolute inset-0 w-full h-full object-cover max-md:rounded-2xl"
        />

        <video
          data-scroll
          data-scroll-speed="0.3"
          src={vid}
          autoPlay
          loop
          muted
          playsInline
          className="max-lg:hidden absolute inset-0 w-1/2 h-full object-cover -translate-y-66"
        />
      </div>

      <div className="relative w-1/2 max-md:w-full h-dvh max-md:h-full">
        <TextScrollOpacity />
      </div>
    </section>
  )
}
