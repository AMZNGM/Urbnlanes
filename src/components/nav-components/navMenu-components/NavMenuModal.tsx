'use client'

import Link from 'next/link'
import { memo, useState } from 'react'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { navigation } from '@/config/navigation.ui.json'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import LetterSwap from '@/components/ui/text/LetterSwap'
import CloseTextBtn from '@/components/ui/buttons/CloseTextBtn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimIn from '@/components/ui/unstyled/AnimIn'

let NavItem = memo(
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
        {isHovered && (
          <motion.div layoutId="nav-indicator3" className="absolute inset-0 w-full h-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <div className="w-full h-full bg-main/25 blur-xs" />
          </motion.div>
        )}

        <Link
          href={item.slug || '#'}
          className={`text-7xl rtl:text-6xl max-md:text-4xl transition-opacity ${pathname === item.slug ? '' : 'opacity-50 hover:opacity-100'}`}
        >
          <AnimText delay={0.02 * item.index + 0.1}>
            <LetterSwap staggerDuration={0.05} className="rtl:leading-20">
              <TText tKey={item.name} />
            </LetterSwap>
          </AnimText>
        </Link>

        {/* {isActive && (
          <div className="top-1/2 right-0 left-0 absolute max-w-xs -translate-y-1/2">
            <motion.svg viewBox="0 0 2934 1100" fill="none" className="z-50 w-full h-full stroke-bg">
              <motion.path
                d="M37.1035 272.903C48.5398 297.935 89.6802 371.551 138.548 430.442C165.819 463.306 205.177 496.021 245.115 525.902C285.053 555.784 326.186 580.256 362.755 595.477C427.715 622.516 490.581 613.902 549.801 594.434C580.878 584.218 611.348 565.893 640.311 547.68C669.275 529.466 695.121 510.022 728.093 483.12C801.217 423.456 859.556 378.289 896.837 363.073C931.504 348.923 983.624 371.296 1077.37 431.883C1140.46 472.661 1230.98 539.954 1301.67 586.932C1372.36 633.911 1419.42 660.108 1464.37 678.962C1509.31 697.815 1550.71 708.532 1590.02 711.987C1629.33 715.443 1665.3 711.314 1700.75 703.255C1771.07 687.27 1834.72 655.575 1890.86 623.551C1941.98 594.394 1985.02 551.334 2025.7 515.821C2052.71 492.243 2082.66 481.447 2117.67 470.09C2136.33 464.036 2158.36 462.812 2235.99 462.229C2313.61 461.645 2446.56 463.124 2524.49 462.053C2602.41 460.982 2621.27 457.316 2657.41 445.263C2747.24 415.306 2809.51 387.829 2825.25 382.381C2832.31 381.043 2837.5 382.6 2847.86 393.847C2858.23 405.094 2873.62 425.984 2894.47 451.366"
                initial={{ pathLength: 0, strokeWidth: 0 }}
                animate={{ pathLength: 1, strokeWidth: 100 }}
                exit={{ pathLength: 0, strokeWidth: 0 }}
                transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1], delay: 1.5 }}
              />
            </motion.svg>
          </div>
        )} */}
      </div>
    )
  }
)
NavItem.displayName = 'NavItem'

export default function NavMenuModal({
  className,
  showDropdown,
  handleClose,
  setShowGetInTouch,
}: {
  className?: string
  showDropdown: boolean
  handleClose: () => void
  setShowGetInTouch: (value: boolean) => void
}) {
  let pathname = usePathname()
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useBodyScrollLock(showDropdown)

  return (
    <motion.div
      id="nav-menu-modal"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0 0 0 0)' }}
      exit={{ clipPath: 'inset(0 0 100%  0)' }}
      transition={{ duration: 0.5, ease: [0.45, 0, 0.55, 1], delay: 0.15 }}
      className={`z-100 fixed inset-0 w-dvw h-dvh flex flex-row-reverse max-md:flex-col gap-2 bg-bg /30 backdrop-blur-2xl p-4 ${className}`}
    >
      <div className="w-full h-full flex flex-col">
        <div className="relative w-full h-full flex justify-between items-start">
          <div onMouseLeave={() => setHoveredIndex(null)} className="flex flex-col grow">
            {navigation.map((item, index) => (
              <NavItem
                key={item.name}
                item={{ ...item, index }}
                isActive={pathname === item.slug}
                isHovered={hoveredIndex === index}
                onHover={setHoveredIndex}
                onClose={handleClose}
                pathname={pathname}
              />
            ))}
          </div>
          <CloseTextBtn onClick={handleClose} />
        </div>

        <div
          onClick={() => setShowGetInTouch(true)}
          className="opacity-60 hover:opacity-100 max-md:text-3xl rtl:text-7xl text-8xl transition-opacity cursor-pointer"
        >
          <AnimText delay={0.5}>
            <LetterSwap staggerDuration={0.05} className="rtl:leading-20">
              <TText tKey="nav.getInTouch" />
            </LetterSwap>
          </AnimText>
        </div>
      </div>

      <div className="w-full h-full gap-4 grid grid-cols-2">
        {db.projects.slice(0, 3).map((project, index) => (
          <AnimIn key={index} className="group relative overflow-hidden first:row-span-2 bg-main rounded-lg">
            <Link href={`/projects/${project.id}`} onClick={handleClose}>
              <ImageIn src={project.gallery[0]} alt={project.name} divClassName="absolute! inset-0 group-hover:scale-110 duration-500" />

              <motion.div
                initial={{ clipPath: 'inset(0 0 0 0)' }}
                animate={{ clipPath: 'inset(100% 0 0 0)' }}
                transition={{ duration: 0.5, ease: [0.45, 0, 0.55, 1], delay: 0.9 }}
                className="absolute inset-0"
              >
                <ImageIn src={project.gallery[1]} alt={project.name} />
              </motion.div>

              <div className="z-10 relative h-full flex flex-col justify-end p-4">
                <h2>{project.name}</h2>
                <p className="line-clamp-1">{project.tagline}</p>
              </div>
            </Link>
          </AnimIn>
        ))}
      </div>
    </motion.div>
  )
}
