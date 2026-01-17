import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'

import SectionHero from '@/components/hero-components/sectionHero'
const AboutUrbnlanes = dynamic(() => import('@/components/AboutUrbnlanes'))
const TeamOfExperts = dynamic(() => import('@/components/TeamOfExperts'))
const VideoSection = dynamic(() => import('@/components/VideoSection'))

export const generateMetadata = () => {
  return metadataGenerators.about()
}

export default function AboutPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <SectionHero title="aboutUrbnlanes" image="/images/projects/yellow-residence/yr-gallery-11.webp" video="/videos/one-year-1.mp4" />
      <AboutUrbnlanes />
      {/* <TeamOfExperts /> */}

      {/* <VideoSection src="/videos/map.mp 4" marquee={false} /> */}
    </Suspense>
  )
}
