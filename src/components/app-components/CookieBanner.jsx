'use client'

import { useContext, useEffect, useState } from 'react'
import { CookieContext } from '@/contexts/CookieContext'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function CookieBanner() {
  const { consent, acceptAll, acceptOnlyNecessary, initialized } = useContext(CookieContext)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!initialized) return
    const needsConsent = consent && !consent.analytics && !consent.marketing
    setVisible(needsConsent)
  }, [initialized, consent])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      className="fixed bottom-6 left-6 right-6 max-w-7xl mx-auto rounded-lg bg-main/75 text-sm shadow-lg text-black p-4 z-50"
    >
      <div className="h-full flex max-md:flex-col justify-between gap-4">
        <div>
          <strong className="block">We use cookies</strong>
          <p className="mt-1">
            We use essential cookies to make the site work, and optional cookies to analyze traffic and provide marketing features. You can
            accept all or only essential cookies.
          </p>
        </div>

        <div className="h-full flex md:flex-col justify-center items-center gap-2">
          <MainBtn
            onClick={() => {
              acceptAll()
              setVisible(false)
            }}
            size="sm"
            className="text-nowrap"
          >
            Accept all
          </MainBtn>

          <MainBtn
            onClick={() => {
              acceptOnlyNecessary()
              setVisible(false)
            }}
            size="sm"
            className="text-nowrap"
          >
            Only necessary
          </MainBtn>
        </div>
      </div>
    </div>
  )
}
