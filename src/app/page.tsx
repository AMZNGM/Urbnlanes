import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import Preloader from '@/components/loading-components/Preloader'
import Hero from '@/components/hero-components/Hero'
const SelectedProjects = dynamic(() => import('@/components/home-components/SelectedProjects'))
import ArtToArchitecture from '@/components/about-components/ArtToArchitecture'
const WhoWeAre = dynamic(() => import('@/components/shared/WhoWeAre'))
import LatestNews from '@/components/news-components/LatestNews'
import OurValuesAccordion from '@/components/home-components/OurValuesAccordion'
import AboutUs from '@/components/home-components/AboutUs'
import HoverGallery from '@/components/home-components/HoverGallery'
import VideoSection from '@/components/shared/VideoSection'

export const generateMetadata = metadataGenerators.home

export default function Home() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      {/* <Preloader /> */}
      <div className="top-0 sticky">
        <Hero />
      </div>
      <SelectedProjects />
      <ArtToArchitecture dark />
      <WhoWeAre dark />
      <LatestNews className="bg-bg! text-text! py-28!" />
      <OurValuesAccordion />
      <AboutUs />
      <HoverGallery />
      <VideoSection />
    </Suspense>
  )
}
