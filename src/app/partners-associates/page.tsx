'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

const PartnersHero = dynamic(() => import('@/components/partners-components/PartnersHero'))
const TextPanel = dynamic(() => import('@/components/shared/TextPanel'))
const PartnersParallaxPanels = dynamic(() => import('@/components/partners-components/PartnersParallaxPanels'))
const PartnersCategoryTabs = dynamic(() => import('@/components/partners-components/PartnersCategoryTabs'))
const SisterCompanies = dynamic(() => import('@/components/partners-components/SisterCompanies'))
const ProjectPartners = dynamic(() => import('@/components/partners-components/ProjectPartners'))
const PartnershipStats = dynamic(() => import('@/components/partners-components/PartnershipStats'))
const PartnersCTA = dynamic(() => import('@/components/partners-components/PartnersCTA'))
const LatestNews = dynamic(() => import('@/components/news-components/LatestNews'))

export default function PartnersAssociatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sister' | 'project'>('all')

  return (
    <Suspense fallback={<LoadingLogo />}>
      <PartnersHero />
      <TextPanel title="common.partnersTitle" para="common.partnersDesc2" />
      <PartnersParallaxPanels />
      <PartnershipStats />
      <PartnersCategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      {(selectedCategory === 'all' || selectedCategory === 'sister') && <SisterCompanies />}
      {(selectedCategory === 'all' || selectedCategory === 'project') && <ProjectPartners />}
      <PartnersCTA />
      <LatestNews withHeading={false} />
    </Suspense>
  )
}
