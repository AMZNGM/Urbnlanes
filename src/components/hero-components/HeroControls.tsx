'use client'

import { Dispatch, SetStateAction } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { HeroSlide } from '@/types/hero'
import TText from '@/translations/TText'

export default function HeroControls({
  slides,
  currentIndex,
  currentSlide,
  goToNext,
  goToPrev,
  showNextSlide,
  setShowNextSlide,
  showPrevSlide,
  setShowPrevSlide,
  prefersReducedMotion,
}: {
  slides: HeroSlide[]
  currentIndex: number
  currentSlide: HeroSlide
  goToNext: () => void
  goToPrev: () => void
  showNextSlide: boolean
  setShowNextSlide: Dispatch<SetStateAction<boolean>>
  showPrevSlide: boolean
  setShowPrevSlide: Dispatch<SetStateAction<boolean>>
  prefersReducedMotion: boolean | null
}) {
  return (
    <section className="z-20">
      {/* Next slide hover area */}
      <button
        aria-label="Next project"
        onClick={goToNext}
        onMouseEnter={() => setShowNextSlide(true)}
        onMouseLeave={() => setShowNextSlide(false)}
        className="rtl:hidden top-0 right-12 bottom-1/2 z-20 absolute w-1/3 flex justify-end items-end focus:outline-none cursor-pointer"
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
              className="max-md:hidden max-w-md bg-bg/25 backdrop-blur-2xl rounded-lg uppercase tracking-wider p-4 select-none"
            >
              <p className="font-mono text-text/60 text-xs">
                <TText tKey="common.nextProject" />
              </p>

              <h3>{slides[(currentIndex + 1) % slides.length]?.title || ''}</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Previous slide hover area */}
      <button
        aria-label="Previous project"
        onClick={goToPrev}
        onMouseEnter={() => setShowPrevSlide(true)}
        onMouseLeave={() => setShowPrevSlide(false)}
        className="rtl:hidden top-0 bottom-1/2 left-12 z-20 absolute w-1/3 flex justify-start items-end focus:outline-none cursor-pointer"
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
              className="max-md:hidden max-w-md bg-bg/25 backdrop-blur-2xl rounded-lg uppercase tracking-wider p-4 select-none"
            >
              <p className="font-mono text-text/60 text-xs">
                <TText tKey="common.previousProject" />
              </p>
              <h3>{slides[(currentIndex - 1 + slides.length) % slides.length]?.title || ''}</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* center hover area - see current project */}
      {/* <button
        aria-label="See current project"
        onClick={() => (window.location.href = currentSlide.buttonHref)}
        className="z-10 absolute inset-0 w-1/3 mx-auto cursor-pointer"
      ></button> */}
    </section>
  )
}
