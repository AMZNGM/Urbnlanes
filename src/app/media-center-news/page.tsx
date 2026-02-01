import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

const MediaCenter3dHero = dynamic(() => import('@/components/media-center-components/MediaCenter3dHero'))
const MediaCenterNewsFeed = dynamic(() => import('@/components/media-center-components/MediaCenterNewsFeed'))

export const generateMetadata = metadataGenerators.mediaCenterNews

export default function MediaCenterNewsPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <div className="top-0 sticky">
        <MediaCenter3dHero />
      </div>

      <MediaCenterNewsFeed />
    </Suspense>
  )
}
