'use client'

import { motion, AnimatePresence } from 'motion/react'
import CookieModal from '@/components/nav-components/dock-components/CookieModal'
import LanguageToggle from '@/components/nav-components/dock-components/LanguageToggle'
import ScrollProgress from '@/components/nav-components/dock-components/ScrollProgress'
import GlobalSearch from '@/components/nav-components/dock-components/GlobalSearch'
import ScrollToTopBtn from '@/components/nav-components/dock-components/ScrollToTopBtn'

export default function Dock({
  className,
  isScrolled100vh,
  showSearch,
  showCookies,
  setShowCookies,
  globalSearch,
  isNavOpen,
}: {
  className?: string
  isScrolled100vh: boolean
  showSearch: boolean
  showCookies: boolean
  setShowCookies: (value: boolean) => void
  globalSearch: any
  isNavOpen: boolean
}) {
  let isCompact = showSearch || showCookies || !isScrolled100vh || isNavOpen

  return (
    <section dir="ltr" id="dock" className={`relative ${className}`}>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 160, damping: 24, mass: 0.6 }}
        className={`relative h-full flex justify-between items-center gap-1 backdrop-blur-2xl rounded-lg overflow-hidden pointer-events-auto ${showSearch || showCookies ? 'bg-bg/50 p-8 max-md:p-4' : 'bg-main/25 ms-auto'}`}
      >
        <AnimatePresence>
          {!showSearch && !isNavOpen && (
            <CookieModal key="cookie" showCookies={showCookies} setShowCookies={setShowCookies} isScrolled100vh={isScrolled100vh} />
          )}
          {!showSearch && isScrolled100vh && !isCompact && <LanguageToggle key="lang" />}
          {!isCompact && <ScrollProgress key="progress" className="max-md:hidden" />}
          <GlobalSearch {...globalSearch} className={`${showCookies ? 'hidden' : ''}`} />
          {!isCompact && <ScrollToTopBtn key="top" />}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
