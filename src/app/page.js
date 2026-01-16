import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'
import Preloader from '@/components/loading-components/Preloader'
import ProgressCarousel from '@/components/ProgressCarousel'

const WhoWeAre = dynamic(() => import('@/components/WhoWeAre'))
const AboutUs = dynamic(() => import('@/components/AboutUs'))
const VideoSection = dynamic(() => import('@/components/VideoSection'))
const SelectedProjects = dynamic(() => import('@/components/SelectedProjects'))
const Updates = dynamic(() => import('@/components/Updates'))
const OurValues = dynamic(() => import('@/components/OurValues'))
const Newsletter = dynamic(() => import('@/components/Newsletter'))

export const generateMetadata = metadataGenerators.home()

export default function Home() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <Preloader />
      <ProgressCarousel />
      <WhoWeAre />
      <AboutUs />
      <VideoSection />
      <SelectedProjects />
      <Updates />
      <OurValues />
      <Newsletter />
    </Suspense>
  )
}
