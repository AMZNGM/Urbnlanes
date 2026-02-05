import AnimIn from '@/components/ui/unstyled/AnimIn'
import DraggableBoxCarousel from '@/components/home-components/latestUpdates-components/DraggableBoxCarousel'
import HoverListGallery from '@/components/home-components/latestUpdates-components/HoverListGallery'

export default function Updates() {
  return (
    <AnimIn as="section" className="relative w-full h-[70dvh] flex max-md:flex-col justify-center items-center bg-black text-text">
      <DraggableBoxCarousel className="z-30 md:absolute md:inset-0 md:w-2/3 h-full flex justify-center items-center" />
      <HoverListGallery />
    </AnimIn>
  )
}
