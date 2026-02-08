import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import SectionHero from '@/components/hero-components/SectionHero'
const TeamList = dynamic(() => import('@/components/team-components/TeamList'))
import TeamOfExperts from '@/components/about-components/TeamOfExperts'

export const generateMetadata = metadataGenerators.team

export default function TeamPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <div className="top-0 sticky">
        <SectionHero image="/images/projects/levels-tower/levels-gallery-5.avif" tKey="nav.team" />
      </div>
      <TeamList dark />
      <TeamOfExperts dark />
    </Suspense>
  )
}
