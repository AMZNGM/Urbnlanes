'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Dot } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function NavDropdown({ label, childrens, isActive, childOpen, setChildOpen }) {
  const { t } = useTranslation()

  return (
    <div aria-label="Dropdown" className="relative w-full h-full z-50">
      <button className="relative w-full h-full cursor-pointer">{label}</button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fixed left-0 right-0 bg-bg border-b border-text/25 shadow-lg"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="max-w-7xl mx-auto space-y-8 py-8">
              {childrens.map((child, index) => (
                <div key={index} className="flex justify-between" onMouseEnter={() => setChildOpen(index)}>
                  {child.children ? (
                    <motion.h3
                      className="group/name relative w-1/3 h-fit flex items-center text-lg font-semibold text-text/75 hover:text-text transition-colors cursor-pointer py-4"
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <span className="text-xs text-text/75 group-hover/name:text-main transition-colors p-2">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {t(child.name)}

                      <motion.span
                        className="ml-2"
                        animate={{ rotate: childOpen === index ? 90 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <ChevronRight size={20} />
                      </motion.span>
                    </motion.h3>
                  ) : (
                    <Link href={child.slug} className="group/name relative w-full h-fit text-lg font-semibold text-text/75">
                      <RippleEffect className="w-full py-3">
                        <motion.div
                          whileHover={{ x: 6 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="flex items-center"
                        >
                          <span className="text-xs text-text/75 group-hover/name:text-main transition-colors p-2">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {t(child.name)}
                        </motion.div>
                      </RippleEffect>
                    </Link>
                  )}

                  <AnimatePresence mode="wait">
                    {child.children && childOpen === index && (
                      <motion.div
                        key={index}
                        className="w-2/3 flex flex-col gap-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        {child.children.map((grandchild, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: idx * 0.04,
                              ease: 'easeOut',
                            }}
                          >
                            <Link href={grandchild.slug} className="w-full inline-flex">
                              <RippleEffect className="w-full inline-flex py-4 text-text/75 hover:text-main transition-colors cursor-pointer">
                                <Dot />
                                {t(grandchild.name)}
                              </RippleEffect>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
