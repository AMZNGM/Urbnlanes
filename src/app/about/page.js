import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'

import SectionHero from '@/components/hero-components/sectionHero'
const TextPanel = dynamic(() => import('@/components/ui/TextPanel'))
const VideoSection = dynamic(() => import('@/components/VideoSection'))

export const generateMetadata = metadataGenerators.about

export default function AboutPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <SectionHero title="aboutUrbnlanes" image="/images/projects/yellow-residence/yr-gallery-11.webp" video="/videos/one-year-1.mp4" />
      <TextPanel title="common.aboutUs" para="db.whoweare.description2" />

      {/* <HoldingCompany /> */}

      <VideoSection src="/videos/map.mp 4" marquee={false} />
      <TextPanel
        title="db.whoweare.artToArchitecture.title"
        para="db.whoweare.artToArchitecture.description"
        image="/images/projects/yellow-residence/yr-gallery-8.avif"
        className="bg-black! text-text"
        paraClassName="opacity-100 text-xl"
      />
    </Suspense>
  )
}
