import { metadataGenerators } from '@/lib/seo-helpers'
import { Suspense } from 'react'
import Hero from '@/components/Hero'

export const metadata = metadataGenerators.home()

function LoadingSkeleton() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-2 animate-pulse">
        <div className="bg-text/50 rounded-lg h-8 w-32"></div>
        <div className="bg-text/40 rounded-lg h-4 w-64"></div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <Hero />
      </Suspense>
    </>
  )
}
