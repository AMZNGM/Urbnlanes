import { motion, AnimatePresence } from 'motion/react'
import { HeroSlide } from '@/types/hero'
import MainBtn from '@/components/ui/buttons/MainBtn'

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
    <AnimatePresence mode="wait">
      <motion.div
        key={`content-${currentIndex}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="z-40 relative space-y-4 max-w-5xl"
      >
        <h1 className="font-sec max-md:text-5xl text-6xl leading-12 tracking-tight">{currentSlide.title}</h1>

        <p className="max-w-4xl text-text/90 text-lg normal-case md:text-balance leading-relaxed tracking-wider">
          {currentSlide.description}
        </p>

        <MainBtn href={currentSlide.buttonHref} className="z-40 relative mt-6 max-md:w-full">
          {currentSlide.buttonText}
        </MainBtn>
      </motion.div>
    </AnimatePresence>
  )
}
