'use client'

import Link from 'next/link'
import { useState, memo } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { navigation } from '@/config/navigation.ui.json'
import { Logs, X } from 'lucide-react'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import LetterSwap from '@/components/ui/text/LetterSwap'
import CloseTextBtn from '@/components/ui/buttons/CloseTextBtn'

const NavItem = memo(
  ({
    item,
    isActive,
    isHovered,
    onHover,
    onClose,
    pathname,
  }: {
    item: any
    isActive: boolean
    isHovered: boolean
    onHover: (index: number) => void
    onClose: () => void
    pathname: string
  }) => {
    return (
      <div onClick={onClose} onMouseEnter={() => onHover(item.index)} className="relative flex flex-col">
        {/* {isHovered && (
          <motion.div
            layoutId="nav-indicator"
            className="top-1/2 -left-4 absolute w-1.5 h-1.5 bg-main rounded-full -translate-y-1/2"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )} */}

        {/* {isHovered && (
          <motion.div
            layoutId="nav-indicator2"
            className="top-1/2 -left-28 absolute w-1/3 h-0.5 -translate-y-1/2"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-full h-full bg-main rotate-9" />
            <div className="w-full h-full bg-main -rotate-9" />
          </motion.div>
        )} */}

        {isHovered && (
          <motion.div layoutId="nav-indicator3" className="absolute inset-0 w-full h-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <div className="w-full h-full bg-main/25 blur-xs" />
          </motion.div>
        )}

        <Link href={item.slug || '#'} className={`text-xl rtl:text-end ${pathname === item.slug ? '' : 'opacity-50 hover:opacity-100'}`}>
          <AnimText delay={0.02 * item.index + 0.5}>
            <LetterSwap staggerDuration={0.05} className="rtl:leading-8">
              <TText tKey={item.name} />
            </LetterSwap>
          </AnimText>
        </Link>
      </div>
    )
  }
)
NavItem.displayName = 'NavItem'

export default function NavMenu({
  className,
  isOpen,
  onClose,
  toggleDropdown,
  onOpenGetInTouch,
}: {
  className?: string
  isOpen: boolean
  onClose: () => void
  toggleDropdown: () => void
  onOpenGetInTouch: () => void
}) {
  let pathname = usePathname()
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useBodyScrollLock(isOpen)

  return (
    <section id="nav-menu">
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        animate={{ width: isOpen ? 'auto' : '100%' }}
        transition={{ type: 'spring', stiffness: 160, damping: 24, mass: 0.6 }}
        className={`overflow-hidden backdrop-blur-2xl rounded-xl pointer-events-auto ${isOpen ? 'bg-bg/50 md:min-w-sm max-md:min-w-xs p-8 max-md:p-4' : 'bg-main/25 w-fit p-2 max-md:p-1'} ${className}`}
      >
        <motion.div layout={isOpen} transition={{ type: 'spring', stiffness: 160, damping: 24, mass: 0.6 }}>
          {/* toggle btn */}
          {!isOpen && (
            <motion.div
              key="open"
              title="Nav Menu"
              aria-label="Nav Menu"
              onClick={toggleDropdown}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-lg cursor-pointer shrink-0"
            >
              <LetterSwap text={<Logs size={20} className="z-10 mx-4 my-1" />} />
            </motion.div>
          )}

          {/* Panel content */}
          <AnimatePresence mode="popLayout">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex flex-col pt-4"
              >
                <CloseTextBtn onClick={onClose} className="ltr:ms-auto rtl:me-auto rtl:mb-8" />

                <div onMouseLeave={() => setHoveredIndex(null)} className="flex flex-col">
                  {navigation.map((item, index) => (
                    <NavItem
                      key={item.name}
                      item={{ ...item, index }}
                      isActive={pathname === item.slug}
                      isHovered={hoveredIndex === index}
                      onHover={setHoveredIndex}
                      onClose={onClose}
                      pathname={pathname}
                    />
                  ))}
                </div>

                <AnimText
                  as={'button'}
                  delay={0.7}
                  onClick={onOpenGetInTouch}
                  className="text-text/60 hover:text-text text-lg uppercase transition-colors me-auto mt-4 cursor-pointer"
                >
                  <LetterSwap staggerDuration={0.05}>
                    <TText tKey="nav.getInTouch" />
                  </LetterSwap>
                </AnimText>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}
