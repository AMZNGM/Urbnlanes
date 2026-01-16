'use client'

import { useTranslation } from '@/hooks/useTranslation'
import TextMarquee from '@/components/ui/text/TextMarquee'

export default function VideoSection({ src = '/videos/one-year-1.mp4', marquee = true }) {
  const { t } = useTranslation()

  return (
    <section dir="ltr" className="relative w-full h-dvh overflow-hidden flex flex-col justify-between">
      {marquee ? <TextMarquee texts={[t('videoSection.marquee')]} className="z-10 relative bg-black" /> : null}

      <video
        src={src}
        type="video/mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/poster.png"
        className="absolute inset-0 w-full h-full object-cover bg-bg"
      />

      {marquee ? <TextMarquee texts={[t('videoSection.marquee')]} className="z-10 relative bg-black" /> : null}
    </section>
  )
}
