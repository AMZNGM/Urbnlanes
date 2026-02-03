import AnimIn from '@/components/ui/unstyled/AnimIn'
import TText from '@/translations/TText'
import Heading from '@/components/shared/Heading'
import DraggableBoxCarousel from '@/components/latestUpdates-components/DraggableBoxCarousel'
import HoverListGallery from '@/components/latestUpdates-components/HoverListGallery'

export default function Updates() {
  return (
    <AnimIn as="section" className="relative w-full h-[70dvh] flex max-md:flex-col justify-center items-center bg-black text-text">
      {/* <Heading text={<TText tKey="nav.updates" />} line={true} className="md:absolute md:inset-0 md:max-w-md px-4" /> */}
      <DraggableBoxCarousel className="z-30 md:absolute md:inset-0 md:w-2/3 h-full flex justify-center items-center" />
      <HoverListGallery />
    </AnimIn>
  )
}
