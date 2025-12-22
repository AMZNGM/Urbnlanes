import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import RippleEffect from '@/components/ui/effects/RippleEffect'
import MenuBtn from '@/components/nav-components/MenuBtn'

export default function MobileDropdown({ navbarData }) {
  const { t } = useTranslation()

  const { navigations, visibleLabel, setVisibleLabel, activeSubIndex, setActiveSubIndex, handleNavigation, handleSubItemClick, isClient } =
    navbarData
  const currentMainItem = navigations[visibleLabel]
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
          <div className="relative w-full h-34 max-sm:h-24 flex justify-between items-center border-b border-text/15">
            <RippleEffect
              onClick={() => setActiveSubIndex(null)}
              className="w-full h-full flex items-center cursor-pointer gap-6 ps-4 hover:bg-text/15 transition-colors"
            >
              <ChevronLeft size={20} className="rtl:rotate-180" />
              <span className="z-10">{isClient ? t(activeItem?.name) : activeItem?.name}</span>
            </RippleEffect>

            <MenuBtn navbarData={navbarData} className="border-s border-main/15 w-[35%] h-full hover:bg-text/15 transition-colors" />
          </div>

          <ul className="size-full flex flex-col">
            {childItems.map((item, index) => (
              <li key={index} className="border-b border-text/10 hover:bg-text/10">
                <button
                  type="button"
                  onClick={() => handleNavigation(item.slug)}
                  className="w-full flex items-center cursor-pointer text-sm font-medium uppercase p-6"
                >
                  <span className="z-10">{isClient ? t(item.name) : item.name}</span>
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
            opacity: visibleLabel !== null ? 1 : 0,
            x: visibleLabel !== null ? 0 : '-100%',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.4, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full bg-bg"
        >
          <div className="relative w-full h-34 max-sm:h-24 flex justify-between items-center border-b border-text/15">
            <RippleEffect
              onClick={() => setVisibleLabel(null)}
              className="w-full h-full flex items-center cursor-pointer gap-6 ps-4 hover:bg-text/15 transition-colors"
            >
              <ChevronLeft size={20} className="rtl:rotate-180" />
              <span className="z-10">{isClient ? t(currentMainItem?.name) : currentMainItem?.name}</span>
            </RippleEffect>

            <MenuBtn navbarData={navbarData} className="border-s border-main/15 w-[35%] h-full hover:bg-text/15 transition-colors" />
          </div>

          <ul className="size-full flex flex-col">
            {subItems.map((item, index) => (
              <li key={index} className="group border-b border-text/10 hover:bg-text/10">
                <button
                  type="button"
                  onClick={() => handleSubItemClick(item)}
                  className="w-full flex justify-between items-center cursor-pointer text-sm font-medium uppercase p-6"
                >
                  <span className="z-10">{isClient ? t(item.name) : item.name}</span>
                  {item.children?.length > 0 && <ChevronRight size={20} className="group-hover:rotate-360 duration-500 rtl:rotate-180" />}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
