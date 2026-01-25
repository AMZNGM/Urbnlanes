import AnimIn from '@/components/ui/unstyled/AnimIn'
import TextMarquee from '@/components/ui/text/TextMarquee'

export default function VideoSection({ src = '/videos/one-year-1.mp4', marquee = true }: { src?: string; marquee?: boolean }) {
  return (
    <AnimIn dir="ltr" className="relative w-full h-dvh overflow-hidden flex flex-col justify-between">
      {marquee ? <TextMarquee texts="videoSection.marquee" className="z-10 relative bg-black" /> : null}

      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/poster.png"
        className="absolute inset-0 w-full h-full object-cover bg-bg"
      />

      {marquee ? <TextMarquee texts="videoSection.marquee" className="z-10 relative bg-black" /> : null}
    </AnimIn>
  )
}
