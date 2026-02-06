'use client'

import { motion, MotionValue } from 'motion/react'
import { HeroSlide } from '@/types/hero'

export default function HeroIndicators({
  slides,
  currentIndex,
  goToSlide,
  progressScale,
}: {
  slides: HeroSlide[]
  currentIndex: number
  goToSlide: (index: number) => void
  progressScale: MotionValue<number>
}) {
  return (
    <div className="right-4 bottom-5 left-4 z-50 absolute md:max-w-10 flex flex-col gap-3 max-md:gap-2">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === currentIndex ? 'true' : undefined}
          onClick={() => goToSlide(index)}
          className="group relative flex flex-1 items-center focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-4 cursor-pointer"
        >
          <div className="relative w-full h-0.5 overflow-hidden bg-text/30">
            <div className="absolute inset-0 bg-text/50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            {index === currentIndex && <motion.div style={{ scaleX: progressScale }} className="absolute inset-0 bg-text ltr:origin-left rtl:origin-right" />}
            {index < currentIndex && <div className="absolute inset-0 bg-text" />}
          </div>
        </button>
      ))}
    </div>
  )
}
