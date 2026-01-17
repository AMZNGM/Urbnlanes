'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useHero } from '@/hooks/useHero'
import { LoadingOscillate } from '@/components/loading-components/LoadingAnimations'
import HeroVideoToggle from '@/components/hero-components/HeroVideoToggle'
import BreathingText from '@/components/ui/text/BreathingText'

export default function SectionHero({ title = '', image = '/images/poster.png', video = '/videos/one-year-1.mp4' }) {
  const { isVideoMode, setIsVideoMode, handleAnimationStart, isLoading, handleMediaLoad, isMobile, t } = useHero()

  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-black text-text">
      {isLoading && <LoadingOscillate />}

      {!isMobile && <HeroVideoToggle isVideoMode={isVideoMode} setIsVideoMode={setIsVideoMode} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={isVideoMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          onAnimationStart={handleAnimationStart}
          className="absolute inset-0"
        >
          {!isMobile && isVideoMode && video ? (
            <video src={video} autoPlay muted loop playsInline className="w-full h-full object-cover" onLoadedData={handleMediaLoad} />
          ) : (
            <Image
              src={image}
              alt={title || 'Background image'}
              fill
              priority
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 100vw"
              className="object-cover"
              onLoad={handleMediaLoad}
            />
          )}
          <div className="z-10 absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div
        data-scroll
        data-scroll-speed="0.2"
        className="z-10 relative w-full h-full flex justify-center items-end duration-300 p-4 max-md:py-32"
      >
        <BreathingText as="div" repeatDelay={2} className="w-full text-[10dvw] text-center text-nowrap">
          {t(`common.${title}`)}
        </BreathingText>
      </div>
    </section>
  )
}
