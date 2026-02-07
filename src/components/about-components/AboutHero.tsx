'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useHero } from '@/hooks/useHero'
import TText from '@/translations/TText'
import HeroVideoToggle from '@/components/hero-components/HeroVideoToggle'
import BreathingText from '@/components/ui/text/BreathingText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function AboutHero() {
  let { isVideoMode, setIsVideoMode, handleAnimationStart, isMobile } = useHero()

  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-bg text-text">
      {!isMobile && (
        <div className="top-12 -right-32 z-60 absolute w-full">
          <HeroVideoToggle isVideoMode={isVideoMode} setIsVideoMode={setIsVideoMode} />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={isVideoMode.toString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          onAnimationStart={handleAnimationStart}
          className="absolute inset-0"
        >
          {!isMobile && isVideoMode ? (
            <video
              src="/videos/one-year-1.mp4"
              poster="/images/projects/yellow-residence/yr-gallery-2.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIn src="/images/projects/yellow-residence/yr-gallery-3.webp" alt="Background image" priority sizes="100vw" className="scale-100!" />
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, ease: [0.41, 0.28, 0.72, 0.77] }}
        data-scroll
        data-scroll-speed="0.2"
        className="z-10 w-full h-full flex flex-col justify-end items-center"
      >
        <BreathingText as="div" repeatDelay={2} className="text-[10dvw] text-center text-nowrap ltr:leading-none max-md:pb-6">
          <TText tKey="common.aboutUrbnlanes" />
        </BreathingText>
      </motion.div>
    </section>
  )
}
