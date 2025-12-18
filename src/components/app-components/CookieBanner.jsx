'use client'

import React, { useContext, useEffect, useState } from 'react'
import { CookieContext } from '@/contexts/CookieContext'

export default function CookieBanner() {
  const { consent, acceptAll, acceptOnlyNecessary, initialized } = useContext(CookieContext)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // show banner if not initialized or user hasn't explicitly chosen non-default
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
      className="fixed bottom-6 left-6 right-6 z-50 rounded-lg bg-white/95 p-4 shadow-lg text-sm text-black"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <strong className="block">We use cookies</strong>
          <p className="mt-1">
            We use essential cookies to make the site work, and optional cookies to analyze traffic and provide marketing features. You can
            accept all or only essential cookies.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="rounded bg-main px-3 py-2 text-white"
            onClick={() => {
              acceptAll()
              setVisible(false)
            }}
          >
            Accept all
          </button>

          <button
            className="rounded border px-3 py-2"
            onClick={() => {
              acceptOnlyNecessary()
              setVisible(false)
            }}
          >
            Only necessary
          </button>
        </div>
      </div>
    </div>
  )
}
