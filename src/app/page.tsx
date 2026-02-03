import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import Preloader from '@/components/loading-components/Preloader'
import Hero from '@/components/hero-components/Hero'
const WhoWeAre = dynamic(() => import('@/components/home-components/WhoWeAre'))
const AboutUs = dynamic(() => import('@/components/home-components/AboutUs'))
const TeamOfExperts = dynamic(() => import('@/components/home-components/TeamOfExperts'))
const VideoSection = dynamic(() => import('@/components/shared/VideoSection'))
const SelectedProjects = dynamic(() => import('@/components/home-components/SelectedProjects'))
const Updates = dynamic(() => import('@/components/latestUpdates-components/Updates'))
const OurValues = dynamic(() => import('@/components/home-components/OurValues'))
const LatestNews = dynamic(() => import('@/components/news-components/LatestNews'))

export const generateMetadata = metadataGenerators.home

export default function Home() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      {/* <Preloader /> */}
      <Hero />
      <SelectedProjects />
      <AboutUs />
      {/* <VideoSection /> */}
      {/* <Updates /> */}
      {/* <WhoWeAre /> */}
      {/* <TeamOfExperts /> */}
      {/* <OurValues /> */}
      {/* <LatestNews className="px-4!" /> */}
    </Suspense>
  )
}
