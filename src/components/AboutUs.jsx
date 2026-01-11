import TextScrollOpacity from '@/components/ui/TextScrollOpacity'

export default function AboutUs() {
  const vid = '/videos/projects/yellow-residence/yr-sneak-peak.mp4'

  return (
    <section className="relative w-full h-full flex md:flex-row flex-col bg-black">
      <div className="relative w-full md:w-1/2 h-screen max-md:h-[50vh]">
        <video src={vid} autoPlay loop muted playsInline className="hover:z-10 absolute inset-0 w-full h-full object-cover" />

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

      <div className="relative w-1/2 max-md:w-full h-screen max-md:h-full">
        <TextScrollOpacity />
      </div>
    </section>
  )
}
