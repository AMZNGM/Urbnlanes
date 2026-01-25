'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useHero } from '@/hooks/useHero'
import { LoadingOscillate } from '@/components/loading-components/LoadingAnimations'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import HeroVideoToggle from '@/components/hero-components/HeroVideoToggle'
import BreathingText from '@/components/ui/text/BreathingText'

export default function SectionHero({
  title = '',
  para = '',
  image = '/images/poster.png',
  video = '/videos/one-year-1.mp4',
}: {
  title?: string
  para?: string
  image?: string
  video?: string
}) {
  const { isVideoMode, setIsVideoMode, handleAnimationStart, isLoading, handleMediaLoad, isMobile, t } = useHero()

  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-black text-text">
      {isLoading && <LoadingOscillate />}

      {!isMobile && <HeroVideoToggle isVideoMode={isVideoMode} setIsVideoMode={setIsVideoMode} />}

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
          {!isMobile && isVideoMode && video ? (
            <video
              src={video}
              poster={image}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              onLoadedData={handleMediaLoad}
            />
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
        className="z-10 relative w-full h-full flex flex-col justify-end items-center duration-300 p-4 max-md:py-20"
      >
        <motion.div initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 0.9 }}>
          <BreathingText as="div" repeatDelay={2} className="w-full text-[10dvw] text-center text-nowrap ltr:leading-none max-md:pb-6">
            {t(`${title}`)}
          </BreathingText>
        </motion.div>

        <AnimText
          as={'p'}
          delay={0.9}
          className="max-w-5xl text-text/90 max-md:text-xs text-sm text-center normal-case text-balance leading-relaxed tracking-wider"
        >
          <TText tKey={para} />
        </AnimText>
      </div>
    </section>
  )
}
