import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import Preloader from '@/components/loading-components/Preloader'
import ProgressCarousel from '@/components/ProgressCarousel'
import WhoWeAre from '@/components/WhoWeAre'
import OurValues from '@/components/OurValues'
import HoverListGallery from '@/components/ui/HoverListGallery'
import SelectedProjects from '@/components/SelectedProjects'
import AboutUs from '@/components/AboutUs'
import DraggableBoxCarousel from '@/components/ui/DraggableBoxCarousel'

export const metadata = metadataGenerators.home()

export default function Home() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      {/* <Preloader /> */}
      <ProgressCarousel />
      {/* <WhoWeAre /> */}
      {/* <AboutUs /> */}
      {/* <OurValues /> */}
      {/* <HoverListGallery /> */}
      {/* <DraggableBoxCarousel /> */}
      {/* <SelectedProjects /> */}
    </Suspense>
  )
}
