import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import SectionHero from '@/components/hero-components/SectionHero'
const ConstructionUpdatesContent = dynamic(() => import('@/components/construction-updates/ConstructionUpdatesContent'))

export const generateMetadata = metadataGenerators.careers

export default function Careers() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <div className="top-0 sticky">
        <SectionHero image="/images/projects/levels-tower/levels-gallery-7.avif" tKey="nav.constructionUpdates" />
      </div>
    </Suspense>
  )
}
