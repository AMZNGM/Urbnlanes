import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'

import SectionHero from '@/components/hero-components/sectionHero'
const TextPanel = dynamic(() => import('@/components/shared/TextPanel'))
import LineHeading from '@/components/shared/LineHeading'
const OurCoreValues = dynamic(() => import('@/components/about-components/OurCoreValues'))
const OurHeritagAndNetwork = dynamic(() => import('@/components/about-components/OurHeritagAndNetwork'))
const HoldingCompany = dynamic(() => import('@/components/about-components/HoldingCompany'))
const OurStory = dynamic(() => import('@/components/about-components/OurStory'))
const BehindTheFigures = dynamic(() => import('@/components/about-components/BehindTheFigures'))
import ImageIn from '@/components/ui/unstyled/ImageIn'
const Newsletter = dynamic(() => import('@/components/shared/Newsletter'))

export const generateMetadata = metadataGenerators.about

export default function AboutPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <SectionHero title="common.aboutUrbnlanes" image="/images/projects/yellow-residence/yr-gallery-11.webp" video="/videos/one-year-1.mp4" />
      <div className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-12">
        <LineHeading tKey="common.aboutUs" sideParaTKey="db.whoweare.description2" />
      </div>

      <OurCoreValues />
      <OurHeritagAndNetwork />
      <HoldingCompany />
      <OurStory />
      <BehindTheFigures />
      <TextPanel
        tKey="db.whoweare.artToArchitecture.title"
        paraTKey="db.whoweare.artToArchitecture.description"
        image="/images/projects/yellow-residence/yr-gallery-8.avif"
        className="bg-black! text-text"
      />
      <ImageIn src="/images/map.webp" alt="Map" className="object-contain! scale-100! pt-24 max-md:pt-0" divClassName="h-100! bg-text max-md:-mb-10" />
      <Newsletter dark={false} />
    </Suspense>
  )
}
