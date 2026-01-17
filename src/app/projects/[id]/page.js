// import { useParams } from 'next/navigation'
import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'

import { metadataGenerators } from '@/lib/seo-helpers'
export const generateMetadata = metadataGenerators.mediaCenterNews()

const MaskImages = dynamic(() => import('@/components/MaskImages'))

export default function ProjectPage() {
  // const params = useParams()

  return (
    <Suspense fallback={<LoadingLogo />}>
      {/* <div className="relative h-[150vh]">
        <MaskImages />
      </div> */}
    </Suspense>
  )
}
