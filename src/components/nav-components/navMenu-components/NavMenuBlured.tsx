'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, memo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navigation } from '@/config/navigation.ui.json'
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
  }: {
    item: any
    isActive: boolean
    isHovered: boolean
    onHover: (index: number) => void
    onClose: () => void
  }) => {
    return (
      <div onClick={onClose} onMouseEnter={() => onHover(item.index)} className="relative flex flex-col">
        {isHovered && (
          <motion.div layoutId="nav-blurIndicator" className="absolute inset-0 w-full h-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <div className="w-full h-full bg-main/25 blur-xs" />
          </motion.div>
        )}

        <Link href={item.slug || '#'} className={`text-xl rtl:text-end ${isActive ? '' : 'opacity-50 hover:opacity-100'}`}>
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

export default function NavMenuBlured({
  showDropdown,
  handleClose,
  setShowGetInTouch,
}: {
  showDropdown: boolean
  handleClose: () => void
  setShowGetInTouch: (value: boolean) => void
}) {
  let pathname = usePathname()
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <AnimatePresence mode="popLayout">
      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex flex-col pt-4"
        >
          <CloseTextBtn onClick={handleClose} className="ltr:ms-auto rtl:me-auto rtl:mb-8" />

          <div onMouseLeave={() => setHoveredIndex(null)} className="flex flex-col">
            {navigation.map((item, index) => (
              <NavItem
                key={item.name}
                item={{ ...item, index }}
                isActive={pathname === item.slug}
                isHovered={hoveredIndex === index}
                onHover={setHoveredIndex}
                onClose={handleClose}
              />
            ))}
          </div>

          <AnimText
            as={'button'}
            delay={0.7}
            onClick={() => setShowGetInTouch(true)}
            className="text-text/60 hover:text-text text-lg uppercase transition-colors me-auto mt-4 cursor-pointer"
          >
            <LetterSwap staggerDuration={0.05}>
              <TText tKey="nav.getInTouch" />
            </LetterSwap>
          </AnimText>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
