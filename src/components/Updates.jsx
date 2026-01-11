import HoverListGallery from '@/components/ui/HoverListGallery'
import DraggableBoxCarousel from '@/components/ui/DraggableBoxCarousel'

export default function Updates() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex justify-center items-center bg-black text-text">
      <DraggableBoxCarousel />
      <HoverListGallery />
    </section>
  )
}
