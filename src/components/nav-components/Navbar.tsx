'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useGlobalSearch } from '@/hooks/useGlobalSearch'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import Dock from '@/components/nav-components/dock-components/Dock'
import NavLogo from '@/components/nav-components/NavLogo'
import NavMenu from '@/components/nav-components/navMenu-components/NavMenu'

export default function Navbar() {
  let isMobile = useIsMobile()
  let isScrolled100vh = useScrollPosition(0.1)
  let globalSearch = useGlobalSearch()
  let { showSearch } = globalSearch
  let [showCookies, setShowCookies] = useState(false)
  let [showDropdown, setShowDropdown] = useState(false)
  let [menuType, setMenuType] = useState<'blurred' | 'modal'>('blurred')

  let toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  let handleClose = () => {
    setShowDropdown(false)
    setMenuType((prev) => (prev === 'blurred' ? 'modal' : 'blurred'))
  }

  useKeyboardShortcuts({
    onEscape: () => {
      handleClose()
      setShowCookies(false)
      globalSearch.setShowSearch(false)
    },
    onSearchToggle: () => {
      handleClose()
      setShowCookies(false)
      globalSearch.setShowSearch(!showSearch)
    },
  })

  return (
    <motion.header
      dir="ltr"
      layout={isMobile ? true : false}
      className={`z-60 fixed top-0 left-1/2 -translate-x-1/2 px-2 sm:px-4 py-4 sm:py-2 w-dvw ${isScrolled100vh ? 'max-sm:w-auto' : ''}`}
    >
      <motion.div
        animate={{ y: isScrolled100vh ? '0%' : '-100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="max-sm:hidden top-0 right-0 left-0 fixed h-15 backdrop-blur-2xl"
      />

      <div className="flex justify-between items-start gap-2">
        <Dock
          isScrolled100vh={isScrolled100vh}
          showSearch={showSearch}
          showCookies={showCookies}
          setShowCookies={setShowCookies}
          globalSearch={globalSearch}
          isNavOpen={showDropdown}
          className={`sm:ms-auto ${showDropdown ? 'hidden' : ''}`}
        />

        <NavLogo
          className={`z-10 sm:order-first ${showDropdown || showSearch || showCookies ? 'max-2xl:invisible' : ''} ${isScrolled100vh ? 'max-sm:hidden' : ''}`}
        />

        <NavMenu
          showDropdown={showDropdown}
          menuType={menuType}
          handleClose={handleClose}
          toggleDropdown={toggleDropdown}
          isScrolled100vh={isScrolled100vh}
          className={`${showSearch || showCookies ? 'max-sm:hidden' : ''}`}
        />
      </div>
    </motion.header>
  )
}
