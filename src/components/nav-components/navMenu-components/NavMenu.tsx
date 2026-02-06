'use client'

import { motion } from 'motion/react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import NavMenuToggle from '@/components/nav-components/navMenu-components/NavMenuToggle'
import NavMenuBlured from '@/components/nav-components/navMenu-components/NavMenuBlured'

export default function NavMenu({
  className,
  showDropdown,
  menuType,
  handleClose,
  toggleDropdown,
  isScrolled100vh,
  setShowGetInTouch,
}: {
  className?: string
  showDropdown: boolean
  menuType: 'blurred' | 'modal'
  handleClose: () => void
  toggleDropdown: () => void
  isScrolled100vh: boolean
  setShowGetInTouch: (value: boolean) => void
}) {
  useBodyScrollLock(showDropdown)

  return (
    <section id="nav-menu">
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        animate={{ width: showDropdown ? 'auto' : '100%' }}
        transition={{ type: 'spring', stiffness: 160, damping: 24, mass: 0.6 }}
        className={`overflow-hidden rounded-lg pointer-events-auto ${showDropdown && menuType === 'blurred' ? 'bg-bg/50 backdrop-blur-2xl md:min-w-sm max-md:min-w-xs p-8 max-md:p-4' : ''} ${className}`}
      >
        <motion.div layout={showDropdown} transition={{ type: 'spring', stiffness: 160, damping: 24, mass: 0.6 }}>
          {!showDropdown && <NavMenuToggle toggleDropdown={toggleDropdown} isScrolled100vh={isScrolled100vh} />}

          {showDropdown && menuType === 'blurred' && (
            <NavMenuBlured showDropdown={showDropdown} handleClose={handleClose} setShowGetInTouch={setShowGetInTouch} />
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
