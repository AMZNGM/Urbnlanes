'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { LoadingOscillate } from '@/components/loading-components/LoadingAnimations'

export default function HeroBackground({
  currentSlide,
  currentIndex,
  isVideoMode,
  isMobile,
  prefersReducedMotion,
  videoRef,
  slidesCount,
  isLoading,
  handleMediaLoad,
  handleAnimationStart,
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        role="group"
        aria-roledescription="slide"
        aria-label={`${currentIndex + 1} of ${slidesCount}`}
        key={`${currentSlide.id || currentIndex}-${isVideoMode && !isMobile ? 'video' : 'image'}`}
        initial={{ opacity: 0, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)' }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        onAnimationStart={handleAnimationStart}
        className="absolute inset-0"
      >
        {isLoading && <LoadingOscillate />}

        {!isMobile && isVideoMode && currentSlide.video ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              key={currentSlide.video}
              src={currentSlide.video}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              onLoadedData={handleMediaLoad}
              onCanPlayThrough={(e) => e.target.play()}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* <div className="z-10 absolute inset-0 bg-black/40" /> */}
            <div className="z-10 absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
          </div>
        ) : (
          currentSlide.image && (
            <div className="relative w-full h-full">
              <Image
                src={currentSlide.image}
                alt={currentSlide.title || ''}
                fill
                priority={currentIndex === 0}
                onLoad={handleMediaLoad}
                className="object-cover"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 100vw"
              />
              {/* <div className="z-10 absolute inset-0 bg-black/30" /> */}
              <div className="z-10 absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
            </div>
          )
        )}
      </motion.div>
    </AnimatePresence>
  )
}
