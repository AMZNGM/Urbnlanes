import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import SectionHero from '@/components/hero-components/SectionHero'
const PartnersAbout = dynamic(() => import('@/components/partners-components/PartnersAbout'))
const PartnersFilters = dynamic(() => import('@/components/partners-components/PartnersFilters'))
const PartnersParallaxPanels = dynamic(() => import('@/components/partners-components/PartnersParallaxPanels'))
import PartnersCTA from '@/components/partners-components/PartnersCTA'
import LatestNews from '@/components/news-components/LatestNews'

export const generateMetadata = metadataGenerators.partnersAssociates

export default function PartnersAssociatesPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <div className="top-0 sticky">
        <SectionHero image="/images/projects/yellow-residence/yr-gallery-4.avif" tKey="nav.partners" tKeyPara="partners.partnersDesc" />
      </div>
      <PartnersAbout />
      <PartnersFilters />
      <PartnersParallaxPanels />
      <PartnersCTA />
      <LatestNews dark className="pb-28" />
    </Suspense>
  )
}
