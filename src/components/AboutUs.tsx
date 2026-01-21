import TextScrollOpacity from '@/components/ui/TextScrollOpacity'

export default function AboutUs() {
  const vid = '/videos/projects/yellow-residence/yr-sneak-peak.mp4'

  return (
    <section className="relative w-full h-full flex md:flex-row flex-col bg-black max-md:px-4">
      <div className="relative w-full md:w-1/2 h-dvh max-md:h-[50vh]">
        <video
          src={vid}
          poster="/images/poster.png"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="relative w-1/2 max-md:w-full h-dvh max-md:h-full">
        <TextScrollOpacity />
      </div>
    </section>
  )
}
