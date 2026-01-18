import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'

import SectionHero from '@/components/hero-components/sectionHero'
const TextPanel = dynamic(() => import('@/components/ui/TextPanel'))
const OurCoreValues = dynamic(() => import('@/components/OurCoreValues'))
const SisterCompanies = dynamic(() => import('@/components/SisterCompanies'))
const HoldingCompany = dynamic(() => import('@/components/HoldingCompany'))
const OurStory = dynamic(() => import('@/components/OurStory'))
const Newsletter = dynamic(() => import('@/components/Newsletter'))
const VideoSection = dynamic(() => import('@/components/VideoSection'))

export const generateMetadata = metadataGenerators.about

export default function AboutPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <SectionHero title="aboutUrbnlanes" image="/images/projects/yellow-residence/yr-gallery-11.webp" video="/videos/one-year-1.mp4" />
      <TextPanel title="common.aboutUs" para="db.whoweare.description2" />
      <OurCoreValues />
      <SisterCompanies />
      <HoldingCompany />
      <OurStory />
      <div className="bg-text! py-4">
        <TextPanel image="/images/map.webp" imageClassName="opacity-100 object-contain! container" />
        <Newsletter withLine={false} className="bg-text text-black! container" />
      </div>
      <TextPanel
        title="db.whoweare.artToArchitecture.title"
        para="db.whoweare.artToArchitecture.description"
        image="/images/projects/yellow-residence/yr-gallery-8.avif"
        className="bg-black! text-text"
        paraClassName="opacity-100 text-xl"
      />
      <VideoSection src="/videos/map.mp4" marquee={false} />
    </Suspense>
  )
}
