import HoverListGallery from '@/components/ui/HoverListGallery'
import DraggableBoxCarousel from '@/components/ui/DraggableBoxCarousel'
import Heading from '@/components/ui/Heading'

export default function Updates() {
  return (
    <section className="relative w-full h-[70dvh] bg-black text-text">
      <div className="w-full h-px bg-linear-to-r from-transparent via-main to-transparent mb-6" />

      <div className="relative w-full h-full flex max-md:flex-col justify-center items-center">
        <Heading text="Construction Updates" className="md:absolute md:inset-0 md:max-w-md px-4" withOutLine={true} />

        <div className="z-30 md:absolute md:inset-0 md:w-2/3 h-full flex justify-center items-center">
          <DraggableBoxCarousel />
        </div>

        <HoverListGallery />
      </div>
    </section>
  )
}
