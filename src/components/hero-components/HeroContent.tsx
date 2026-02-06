'use client'

import { motion, AnimatePresence } from 'motion/react'
import { HeroSlide } from '@/types/hero'

export default function HeroContent({
  currentSlide,
  currentIndex,
  prefersReducedMotion,
}: {
  currentSlide: HeroSlide
  currentIndex: number
  prefersReducedMotion: boolean | null
}) {
  return (
    <>
      <div className="right-2 bottom-0 max-md:bottom-12 max-md:left-2 absolute overflow-hidden max-md:text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 1, y: '100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 1, y: '100%' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.39, 0.24, 0.3, 1] }}
          >
            <h1 className="font-sec max-md:text-4xl text-5xl rtl:leading-22 tracking-tight">{currentSlide.title}</h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-md:hidden -right-70 bottom-1/2 absolute overflow-hidden text-center rotate-270 -translate-y-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 1, y: '100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 1, y: '100%' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.39, 0.24, 0.3, 1] }}
          >
            <p className="max-w-xl opacity-90 text-lg line-clamp-1 tracking-widest">{currentSlide.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
