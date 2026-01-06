import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import LoadingSkeleton from '@/components/loading-components/LoadingSkeleton'
import Hero from '@/components/Hero'

export const metadata = metadataGenerators.home()

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <Hero />
        <div className="h-screen" />
      </Suspense>
    </>
  )
}
