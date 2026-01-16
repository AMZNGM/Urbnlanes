'use client'

import { motion, AnimatePresence } from 'motion/react'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function HeroContent({ currentSlide, currentIndex, prefersReducedMotion }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`content-${currentIndex}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="z-40 relative max-w-5xl"
      >
        <h1 className="font-sec font-light text-[4dvw] max-md:text-[9dvw] leading-relaxed md:leading-20 tracking-tight">
          {currentSlide.title}
        </h1>

        <p className="max-w-2xl text-text/90 text-sm normal-case text-balance leading-relaxed">{currentSlide.description}</p>

        <MainBtn href={currentSlide.buttonHref} className="z-40 relative mt-6">
          {currentSlide.buttonText}
        </MainBtn>
      </motion.div>
    </AnimatePresence>
  )
}
