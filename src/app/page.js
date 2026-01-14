import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import Preloader from '@/components/loading-components/Preloader'
import ProgressCarousel from '@/components/ProgressCarousel'
import MaskImages from '@/components/MaskImages'
import WhoWeAre from '@/components/WhoWeAre'
import AboutUs from '@/components/AboutUs'
import VideoSection from '@/components/VideoSection'
import OurValues from '@/components/OurValues'
import Updates from '@/components/Updates'
import SelectedProjects from '@/components/SelectedProjects'
import Newsletter from '@/components/Newsletter'

export const metadata = metadataGenerators.home()

export default function Home() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      {/* <Preloader /> */}

      <div className="sticky top-0">
        <ProgressCarousel />
      </div>

      <WhoWeAre />
      {/* <AboutUs />
      <VideoSection />
      <SelectedProjects />
      <Updates />
      <OurValues />
      <Newsletter /> */}
    </Suspense>
  )
}
