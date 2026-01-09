import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import LoadingScreen from '@/components/loading-components/loadingScreen'
import ProgressCarousel from '@/components/ProgressCarousel'
import WhoWeAre from '@/components/WhoWeAre'
import OurValues from '@/components/OurValues'
import TextScrollOpacity from '@/components/ui/TextScrollOpacity'
import SelectedProjects from '@/components/SelectedProjects'

export const metadata = metadataGenerators.home()

export default function Home() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <LoadingScreen />
      <ProgressCarousel />
      <WhoWeAre />
      <OurValues />
      <TextScrollOpacity />
      <SelectedProjects />
    </Suspense>
  )
}
