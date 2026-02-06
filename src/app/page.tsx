import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import Preloader from '@/components/loading-components/Preloader'
import Hero from '@/components/hero-components/Hero'
const SelectedProjects = dynamic(() => import('@/components/home-components/SelectedProjects'))
const WhoWeAre = dynamic(() => import('@/components/home-components/WhoWeAre'))
const AboutUs = dynamic(() => import('@/components/home-components/AboutUs'))
const HoverGallery = dynamic(() => import('@/components/home-components/HoverGallery'))
const TeamOfExperts = dynamic(() => import('@/components/home-components/TeamOfExperts'))
const VideoSection = dynamic(() => import('@/components/shared/VideoSection'))
const OurValues = dynamic(() => import('@/components/home-components/OurValues'))
const LatestNews = dynamic(() => import('@/components/news-components/LatestNews'))

export const generateMetadata = metadataGenerators.home

export default function Home() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      {/* <Preloader /> */}
      <Hero />
      <SelectedProjects />
      <WhoWeAre />
      <AboutUs />
      <HoverGallery />
      {/* <VideoSection /> */}
      {/* <TeamOfExperts /> */}
      {/* <OurValues /> */}
      {/* <LatestNews className="px-4!" /> */}
    </Suspense>
  )
}

// <div className="min-w-80 max-h-120 max-md:max-h-100 overflow-hidden rounded-2xl">
//   <video src="/videos/projects/yellow-residence/yr-sneak-peak.mp4" poster="/images/poster.png" autoPlay loop muted playsInline />
// </div>
