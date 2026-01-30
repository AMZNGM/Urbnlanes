'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useContext, useEffect, useState } from 'react'
import { CookieContext } from '@/contexts/CookieContext'
import { MotionLine } from '@/components/ui/effects/Lines'
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
      {!visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent banner"
          initial={{ scale: 0.5, y: '100%' }}
          animate={{ scale: 1, y: '0%' }}
          exit={{ scale: 0.5, x: '-120%' }}
          transition={{ type: 'spring', stiffness: 110, damping: 15 }}
          className="right-4 bottom-4 left-4 z-50 fixed max-w-2xl"
        >
          <div className="flex flex-col gap-4 bg-main/25 backdrop-blur-3xl rounded-2xl p-4">
            <h4 className="font-black text-text/75 tracking-[0.25em] -mb-2">Privacy Mandate "We use cookies"</h4>

            <p className="opacity-50 font-medium text-xs text-balance leading-relaxed">
              We use strategic digital components to ensure the structural integrity of your navigation. Accept our architecture to proceed with the
              masterworks.
            </p>

            <MotionLine delay={0.5} className="my-0!" />

            <div className="w-full flex max-md:flex-col justify-between items-center gap-4">
              <MainBtn onClick={handleAcceptAll} size="sm" look="mono" className="font-black! tracking-[0.4em] whitespace-nowrap px-12 py-6">
                Accept All
              </MainBtn>

              <MainBtn onClick={openCookieSidebar} size="sm" look="dark" className="font-black! text-main tracking-[0.4em] whitespace-nowrap px-12 py-6">
                Customize
              </MainBtn>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
