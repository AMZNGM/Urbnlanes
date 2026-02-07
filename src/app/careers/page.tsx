import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import SectionHero from '@/components/hero-components/SectionHero'
import CareersAbout from '@/components/careers-components/CareersAbout'
const CareersList = dynamic(() => import('@/components/careers-components/CareersList'))

export const generateMetadata = metadataGenerators.careers

export default function CareersPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <div className="top-0 sticky">
        <SectionHero image="/images/projects/levels-tower/levels-main.webp" tKey="nav.careers" />
      </div>

      <CareersAbout dark />
      <CareersList dark />
    </Suspense>
  )
}
