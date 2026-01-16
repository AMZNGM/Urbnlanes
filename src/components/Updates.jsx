'use client'

import { useTranslation } from '@/hooks/useTranslation'
import HoverListGallery from '@/components/ui/HoverListGallery'
import DraggableBoxCarousel from '@/components/ui/DraggableBoxCarousel'
import Heading from '@/components/ui/Heading'

export default function Updates() {
  const { t } = useTranslation()

  return (
    <section className="relative w-full h-[70dvh] flex max-md:flex-col justify-center items-center bg-black text-text">
      <Heading text={t('nav.updates')} withOutLine={true} className="md:absolute md:inset-0 md:max-w-md px-4" />
      <DraggableBoxCarousel className="z-30 md:absolute md:inset-0 md:w-2/3 h-full flex justify-center items-center" />
      <HoverListGallery />
    </section>
  )
}
