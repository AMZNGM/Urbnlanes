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
const Newsletter = dynamic(() => import('@/components/shared/Newsletter'))

export const generateMetadata = metadataGenerators.partnersAssociates

export default function PartnersAssociatesPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <PartnersHero />
      <TextPanel tKey="common.partnersTitle" paraTKey="common.partnersDesc2" />
      <PartnersParallaxPanels />
      <PartnershipStats />
      <PartnersFilters />
      <PartnersCTA />
      <LatestNews line={false} />
      <Newsletter />
    </Suspense>
  )
}
