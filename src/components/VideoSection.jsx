'use client'

import { useTranslation } from '@/hooks/useTranslation'
import TextMarquee from '@/components/ui/text/TextMarquee'

export default function VideoSection() {
  const { t } = useTranslation()

  return (
    <section dir="ltr" className="relative w-full h-dvh overflow-hidden flex flex-col justify-between">
      <TextMarquee texts={[t('videoSection.marquee')]} className="z-10 relative bg-black" />

      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/one-year-1.mp4" type="video/mp4" />
      </video>

      <TextMarquee texts={[t('videoSection.marquee')]} className="z-10 relative bg-black" />
    </section>
  )
}
