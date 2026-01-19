'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Dot } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function NavDropdown({ label, childrens, isActive, childOpen, setChildOpen }) {
  const { t } = useTranslation()

  return (
    <div aria-label="Dropdown" className="z-50 relative w-full h-full">
      <button className="relative w-full h-full text-sm uppercase cursor-pointer">{label}</button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="right-0 left-0 fixed bg-bg shadow-lg border-text/25 border-b"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="max-w-7xl space-y-8 mx-auto py-8">
              {childrens.map((child, index) => (
                <div key={index} className="flex justify-between" onMouseEnter={() => setChildOpen(index)}>
                  {child.children ? (
                    <motion.h3
                      className="group/name relative w-1/3 h-fit flex items-center font-medium text-text/75 hover:text-text text-lg transition-colors py-4 cursor-pointer"
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <span className="text-text/75 group-hover/name:text-main text-xs transition-colors p-2">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {t(child.name)}

                      <ChevronRight
                        size={20}
                        className={`rtl:ms-2 ltr:ml-2 duration-300 ease-out ${childOpen === index ? 'rotate-90' : ''}`}
                      />
                    </motion.h3>
                  ) : (
                    <Link
                      href={child.slug}
                      className="group/name relative w-full h-fit font-medium text-text/75 hover:text-text text-lg transition-colors cursor-pointer"
                    >
                      <RippleEffect className="w-full py-3">
                        <motion.div
                          whileHover={{ x: 6 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="flex items-center"
                        >
                          <span className="text-text/75 group-hover/name:text-main text-xs transition-colors p-2">
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
                            <Link href={grandchild.slug} className="inline-flex w-full">
                              <RippleEffect className="inline-flex w-full text-text/75 hover:text-main transition-colors py-4 cursor-pointer">
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
