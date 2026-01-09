'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import Footer from '@/components/footer-components/Footer'

export default function FooterWrapper() {
  const pathname = usePathname()

  if (pathname === '/not-found') return null

  return (
    <Suspense fallback={<LoadingLogo />}>
      <Footer />
    </Suspense>
  )
}
