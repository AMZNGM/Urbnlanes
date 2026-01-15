'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'

export default function HeroControls({
  slides,
  currentIndex,
  goToNext,
  goToPrev,
  showNextSlide,
  setShowNextSlide,
  showPrevSlide,
  setShowPrevSlide,
  prefersReducedMotion,
}) {
  const { t } = useTranslation()

  return (
    <>
      {/* Next slide hover area */}
      <button
        onClick={goToNext}
        onMouseEnter={() => setShowNextSlide(true)}
        onMouseLeave={() => setShowNextSlide(false)}
        aria-label="Next project"
        className="rtl:hidden max-md:hidden right-0 z-20 absolute inset-y-0 w-1/3 flex justify-end items-center focus:outline-none pr-12 cursor-pointer"
      >
        <AnimatePresence>
          {showNextSlide && (
            <motion.div
              initial={{ x: document.dir === 'ltr' ? '200%' : '-200%' }}
              animate={{ x: 0 }}
              exit={{ x: document.dir === 'ltr' ? '200%' : '-200%' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                type: 'spring',
                stiffness: 80,
                ease: 'easeInOut',
              }}
              className="max-w-md bg-black/25 opacity-75 rounded-2xl scale-80 p-6 select-none"
            >
              <p className="text-text/70 text-sm uppercase tracking-wider mb-2">{t('common.nextProject')}</p>
              <h3 className="font-medium text-2xl">{slides[(currentIndex + 1) % slides.length]?.title || ''}</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Previous slide hover area */}
      <button
        onClick={goToPrev}
        onMouseEnter={() => setShowPrevSlide(true)}
        onMouseLeave={() => setShowPrevSlide(false)}
        aria-label="Previous project"
        className="rtl:hidden max-md:hidden left-0 z-20 absolute inset-y-0 w-1/3 flex justify-start items-center focus:outline-none pl-12 cursor-pointer"
      >
        <AnimatePresence>
          {showPrevSlide && (
            <motion.div
              initial={{ x: document.dir === 'ltr' ? '-200%' : '200%' }}
              animate={{ x: 0 }}
              exit={{ x: document.dir === 'ltr' ? '-200%' : '200%' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                type: 'spring',
                stiffness: 80,
                ease: 'easeInOut',
              }}
              className="max-w-md bg-black/25 opacity-75 rounded-2xl scale-80 p-6 select-none"
            >
              <p className="text-text/70 text-sm uppercase tracking-wider mb-2">{t('common.previousProject')}</p>
              <h3 className="font-medium text-2xl">{slides[(currentIndex - 1 + slides.length) % slides.length]?.title || ''}</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  )
}
