import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import PartnersHero from '@/components/partners-components/PartnersHero'
const PartnersAbout = dynamic(() => import('@/components/partners-components/PartnersAbout'))
const PartnersParallaxPanels = dynamic(() => import('@/components/partners-components/PartnersParallaxPanels'))
const PartnersFilters = dynamic(() => import('@/components/partners-components/PartnersFilters'))
import PartnersCTA from '@/components/partners-components/PartnersCTA'
import LatestNews from '@/components/news-components/LatestNews'

export const generateMetadata = metadataGenerators.partnersAssociates

export default function PartnersAssociatesPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <PartnersHero />
      <PartnersAbout />
      <PartnersParallaxPanels />
      <PartnersFilters />
      <PartnersCTA />
      <LatestNews />
    </Suspense>
  )
}
