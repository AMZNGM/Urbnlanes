'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'

export default function HeroBackground({ currentSlide, currentIndex, isVideoMode, isMobile, prefersReducedMotion, videoRef, slidesCount }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${currentSlide.id || currentIndex}-${isVideoMode && !isMobile ? 'video' : 'image'}`}
        initial={{ opacity: 0, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)' }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute inset-0"
        role="group"
        aria-roledescription="slide"
        aria-label={`${currentIndex + 1} of ${slidesCount}`}
      >
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
              className="absolute inset-0 w-full h-full object-cover"
              onCanPlayThrough={(e) => e.target.play()}
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
