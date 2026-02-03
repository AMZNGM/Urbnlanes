'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useGlobalSearch } from '@/hooks/useGlobalSearch'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import Dock from '@/components/nav-components/dock-components/Dock'
import NavLogo from '@/components/nav-components/NavLogo'
import NavMenu from '@/components/nav-components/NavMenu'
import GetInTouchModal from '@/components/nav-components/GetInTouchModal'

export default function Navbar() {
  let isMobile = useIsMobile()
  let isScrolled100vh = useScrollPosition(0.1)
  let globalSearch = useGlobalSearch()
  let { showSearch } = globalSearch
  let [showCookies, setShowCookies] = useState(false)
  let [showDropdown, setShowDropdown] = useState(false)
  let [showGetInTouch, setShowGetInTouch] = useState(false)

  useKeyboardShortcuts({
    onEscape: () => {
      setShowDropdown(false)
      setShowCookies(false)
      globalSearch.setShowSearch(false)
      setShowGetInTouch(false)
    },
    onSearchToggle: () => {
      setShowDropdown(false)
      setShowCookies(false)
      setShowGetInTouch(false)
      globalSearch.setShowSearch(!showSearch)
    },
  })

  return (
    <>
      <motion.header
        layout={isMobile ? true : false}
        dir="ltr"
        className={`top-0 left-1/2 z-60 fixed -translate-x-1/2 ${isScrolled100vh ? 'max-md:w-auto md:w-dvw' : 'w-dvw'}`}
      >
        <div className="flex justify-between gap-4 max-md:gap-2 rounded-xl p-2 md:px-4 md:py-2">
          {!showDropdown && (
            <Dock
              isScrolled100vh={isScrolled100vh}
              showSearch={showSearch}
              showCookies={showCookies}
              setShowCookies={setShowCookies}
              globalSearch={globalSearch}
              isNavOpen={showDropdown}
              className="md:ms-auto"
            />
          )}

          {!showSearch && !showCookies && <NavLogo className={`md:order-first ${showDropdown || showSearch ? 'max-2xl:invisible' : ''}`} />}

          {!showSearch && !showCookies && (
            <NavMenu
              isOpen={showDropdown}
              onClose={() => setShowDropdown(false)}
              toggleDropdown={() => setShowDropdown((prev) => !prev)}
              onOpenGetInTouch={() => {
                setShowDropdown(false)
                setShowGetInTouch(true)
              }}
            />
          )}
        </div>
      </motion.header>

      <AnimatePresence>{showGetInTouch && <GetInTouchModal isOpen={showGetInTouch} onClose={() => setShowGetInTouch(false)} />}</AnimatePresence>
    </>
  )
}
