'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useContext, useEffect, useState } from 'react'
import { CookieContext } from '@/contexts/CookieContext'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function CookieBanner() {
  let context = useContext(CookieContext)
  if (!context) return null

  let { consent, acceptAll, initialized } = context
  let [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!initialized) return
    let needsConsent = consent && !consent.consentDate
    setVisible(needsConsent)
  }, [initialized, consent])

  let openCookieSidebar = () => {
    let event = new CustomEvent('openCookieSidebar')
    window.dispatchEvent(event)
    setVisible(false)
  }

  let handleAcceptAll = () => {
    acceptAll()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent banner"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', duration: 0.2, stiffness: 100 }}
          className="right-6 bottom-6 left-6 z-50 fixed max-w-7xl bg-text/75 shadow-lg rounded-lg text-black text-sm mx-auto p-4"
        >
          <div className="h-full flex max-md:flex-col justify-between gap-4">
            <div>
              <strong className="block">We use cookies</strong>
              <p className="mt-1">
                We use essential cookies to make the site work, and optional cookies to analyze traffic and provide marketing features. You can accept all or
                customize your preferences.
              </p>
            </div>

            <div className="flex justify-center items-center gap-2">
              <MainBtn onClick={handleAcceptAll} size="sm" look="outline" className="text-nowrap">
                Accept all
              </MainBtn>

              <MainBtn onClick={openCookieSidebar} size="sm" look="outline" className="text-nowrap">
                Customize
              </MainBtn>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
