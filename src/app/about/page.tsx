import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'

import SectionHero from '@/components/hero-components/sectionHero'
const TextPanel = dynamic(() => import('@/components/shared/TextPanel'))
const OurCoreValues = dynamic(() => import('@/components/about-components/OurCoreValues'))
const SisterCompanies = dynamic(() => import('@/components/about-components/SisterCompanies'))
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
      <TextPanel tKey="common.aboutUs" paraTKey="db.whoweare.description2" />
      <OurCoreValues />
      <SisterCompanies />
      <HoldingCompany />
      <OurStory />
      <BehindTheFigures />
      <TextPanel
        tKey="db.whoweare.artToArchitecture.title"
        paraTKey="db.whoweare.artToArchitecture.description"
        image="/images/projects/yellow-residence/yr-gallery-8.avif"
        className="bg-black! text-text"
        paraClassName="opacity-100 text-xl"
      />
      <ImageIn src="/images/map.webp" alt="Map" className="object-contain! scale-100! pt-24 max-md:pt-0" divClassName="h-100! bg-text max-md:-mb-10" />
      <Newsletter dark={false} />
    </Suspense>
  )
}
