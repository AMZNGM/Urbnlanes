import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import PartnersHero from '@/components/partners-components/PartnersHero'
const TextPanel = dynamic(() => import('@/components/shared/TextPanel'))
const PartnersParallaxPanels = dynamic(() => import('@/components/partners-components/PartnersParallaxPanels'))
const PartnershipStats = dynamic(() => import('@/components/partners-components/PartnershipStats'))
const PartnersFilters = dynamic(() => import('@/components/partners-components/PartnersFilters'))
const PartnersCTA = dynamic(() => import('@/components/partners-components/PartnersCTA'))
const LatestNews = dynamic(() => import('@/components/news-components/LatestNews'))

export const generateMetadata = metadataGenerators.partnersAssociates

export default function PartnersAssociatesPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <PartnersHero />
      <TextPanel tKey="partners.partnersTitle" paraTKey="partners.partnersDesc2" />
      <PartnersParallaxPanels />
      <PartnershipStats />
      <PartnersFilters />
      <PartnersCTA />
      <LatestNews />
    </Suspense>
  )
}
