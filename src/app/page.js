import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import LoadingSkeleton from '@/components/loading-components/LoadingSkeleton'
import ProgressCarousel from '@/components/ProgressCarousel'
import WhoWeAre from '@/components/WhoWeAre'
import OurValues from '@/components/OurValues'
import SelectedProjects from '@/components/SelectedProjects'

export const metadata = metadataGenerators.home()

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <ProgressCarousel />
        <WhoWeAre />
        <OurValues />
        <SelectedProjects />

        {/* <div className="top-0 right-0 bottom-0 left-0 absolute bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(102,51,238,1)_100%)]" />{' '} */}
      </Suspense>
    </>
  )
}
