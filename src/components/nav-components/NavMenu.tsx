'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { navigation } from '@/config/navigation.ui.json'
import { Menu } from 'lucide-react'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import MainBtn from '@/components/ui/buttons/MainBtn'
import LetterSwap from '@/components/ui/text/LetterSwap'

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
              <LetterSwap text={<Menu size={20} className="z-10 mx-4 my-1" />} />
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
                <AnimText
                  key="close"
                  delay={0.1}
                  onClick={onClose}
                  className="font-mono text-sm rtl:leading-5 tracking-wider ms-auto cursor-pointer select-none"
                >
                  <TText tKey="common.close" />
                </AnimText>

                <div className="flex flex-col mb-8">
                  {navigation.map((item) => (
                    <div key={item.name} onClick={onClose} className="flex flex-col">
                      <MainBtn
                        to={item.slug || '#'}
                        size="sm"
                        look="mono"
                        className={`bg-transparent! justify-start px-0! ${pathname === item.slug ? 'text-text' : 'text-text/60 hover:text-text'}`}
                      >
                        <AnimText delay={0.2}>
                          <TText tKey={item.name} />
                        </AnimText>
                      </MainBtn>
                    </div>
                  ))}
                </div>

                <MainBtn onClick={onOpenGetInTouch} size="sm" look="mono" className="bg-transparent! p-0!">
                  <AnimText delay={0.3}>
                    <TText tKey="nav.getInTouch" />
                  </AnimText>
                </MainBtn>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}
