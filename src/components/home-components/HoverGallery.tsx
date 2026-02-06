import AnimIn from '@/components/ui/unstyled/AnimIn'
import DraggableBoxCarousel from '@/components/home-components/DraggableBoxCarousel'
import HoverListGallery from '@/components/home-components/HoverListGallery'

export default function HoverGallery() {
  return (
    <AnimIn as="section" className="relative w-dvw bg-bg text-text px-4 max-md:px-2 py-12 max-md:pb-40">
      <DraggableBoxCarousel className="z-60 md:absolute relative md:inset-0 md:w-2/4 h-full flex justify-center items-center md:-translate-y-12" />
      <HoverListGallery />
    </AnimIn>
  )
}
