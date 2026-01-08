'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import LoadingSkeleton from '@/components/loading-components/LoadingSkeleton'
import Footer from '@/components/footer-components/Footer'

export default function FooterWrapper() {
  const pathname = usePathname()

  if (pathname === '/not-found') return null

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Footer />
    </Suspense>
  )
}
