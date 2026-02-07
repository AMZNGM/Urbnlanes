import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'

import AboutHero from '@/components/about-components/AboutHero'
const WhoWeAre = dynamic(() => import('@/components/shared/WhoWeAre'))
import ArtToArchitecture from '@/components/about-components/ArtToArchitecture'
import TeamOfExperts from '@/components/about-components/TeamOfExperts'
const OurStory = dynamic(() => import('@/components/about-components/OurStory'))
import BehindTheFigures from '@/components/about-components/BehindTheFigures'
import HoldingCompany from '@/components/about-components/HoldingCompany'
import OurNetwork from '@/components/about-components/OurNetwork'
import OurCoreValues from '@/components/about-components/OurCoreValues'

export const generateMetadata = metadataGenerators.about

export default function AboutPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <div className="top-0 sticky">
        <AboutHero />
      </div>
      <WhoWeAre withOutImage />
      <ArtToArchitecture />
      <TeamOfExperts />
      <OurStory />
      <BehindTheFigures />
      <HoldingCompany />
      <OurNetwork />
      <OurCoreValues />
    </Suspense>
  )
}
