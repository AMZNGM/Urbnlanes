import { motion, AnimatePresence } from 'motion/react'
import { NavbarData } from '@/types/nav'
import { useTranslation } from '@/translations/useTranslation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'
import MenuBtn from '@/components/nav-components/MenuBtn'

export default function MobileDropdown({ navbarData }: { navbarData: NavbarData }) {
  const { t } = useTranslation()
  const { navigations, visibleLabel, setVisibleLabel, activeSubIndex, setActiveSubIndex, handleNavigation, handleSubItemClick, isClient } =
    navbarData
  const currentMainItem = visibleLabel !== null ? navigations[visibleLabel] : null
  const subItems = currentMainItem?.children || []
  const activeItem = activeSubIndex !== null ? subItems[activeSubIndex] : null
  const childItems = activeItem?.children || []

  return (
    <AnimatePresence mode="wait">
      {/* Grandchildren level */}
      {activeSubIndex !== null && childItems.length > 0 ? (
        <motion.div
          key="grandchildren"
          initial={{
            opacity: 0,
            x: typeof window !== 'undefined' && window.getComputedStyle(document.documentElement).direction === 'rtl' ? '-100%' : '100%',
          }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.4, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full bg-bg"
        >
          <div className="relative w-full h-34 max-sm:h-24 flex justify-between items-center border-text/15 border-b">
            <RippleEffect
              onClick={() => setActiveSubIndex(null)}
              className="w-full h-full flex items-center gap-6 hover:bg-text/15 transition-colors ps-4 cursor-pointer"
            >
              <ChevronLeft size={20} className="rtl:rotate-180" />
              <span className="z-10">{isClient ? t(activeItem?.name || '') : activeItem?.name}</span>
            </RippleEffect>

            <MenuBtn navbarData={navbarData} className="w-[35%] h-full hover:bg-text/15 border-main/15 border-s transition-colors" />
          </div>

          <ul className="size-full flex flex-col">
            {childItems.map((item, index) => (
              <li key={index} className="hover:bg-text/10 border-text/10 border-b">
                <button
                  type="button"
                  onClick={() => handleNavigation(item.slug || '')}
                  className="w-full flex items-center font-medium text-sm p-6 cursor-pointer"
                >
                  <span className="z-10">{isClient ? t(item.name || '') : item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : (
        /* Children level */
        <motion.div
          key="children"
          initial={{
            opacity: 0,
            x: typeof window !== 'undefined' && window.getComputedStyle(document.documentElement).direction === 'rtl' ? '-100%' : '100%',
          }}
          animate={{
            visibility: visibleLabel !== null ? 'visible' : 'hidden',
            opacity: visibleLabel !== null ? 1 : 0,
            x: visibleLabel !== null ? 0 : '-100%',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.4, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full bg-bg"
        >
          <div className="relative w-full h-34 max-sm:h-24 flex justify-between items-center border-text/15 border-b">
            <RippleEffect
              onClick={() => setVisibleLabel(null)}
              className="w-full h-full flex items-center gap-6 hover:bg-text/15 transition-colors ps-4 cursor-pointer"
            >
              <ChevronLeft size={20} className="rtl:rotate-180" />
              <span className="z-10">{isClient ? t(currentMainItem?.name || '') : currentMainItem?.name}</span>
            </RippleEffect>

            <MenuBtn navbarData={navbarData} className="w-[35%] h-full hover:bg-text/15 border-main/15 border-s transition-colors" />
          </div>

          <ul className="size-full flex flex-col">
            {subItems.map((item, index) => (
              <li key={index} className="group hover:bg-text/10 border-text/10 border-b">
                <button
                  type="button"
                  onClick={() => handleSubItemClick(item)}
                  className="w-full flex justify-between items-center font-medium text-sm p-6 cursor-pointer"
                >
                  <span className="z-10">{isClient ? t(item.name || '') : item.name}</span>
                  {item.children && item.children.length > 0 && (
                    <ChevronRight size={20} className="rtl:rotate-180 group-hover:rotate-360 duration-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
