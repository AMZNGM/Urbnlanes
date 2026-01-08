import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import LoadingSkeleton from '@/components/loading-components/LoadingSkeleton'
import LoadingScreen from '@/components/loading-components/loadingScreen'
import ProgressCarousel from '@/components/ProgressCarousel'
import WhoWeAre from '@/components/WhoWeAre'
import OurValues from '@/components/OurValues'
import SelectedProjects from '@/components/SelectedProjects'

export const metadata = metadataGenerators.home()

export default function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <LoadingScreen />
      <ProgressCarousel />
      <WhoWeAre />
      <OurValues />
      <SelectedProjects />
    </Suspense>
  )
}
