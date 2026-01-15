'use client'

import { motion } from 'motion/react'

export default function HeroIndicators({ slides, currentIndex, goToSlide, progressScale }) {
  return (
    <>
      {/* Desktop Progress Indicators */}
      <div className="flex gap-3 max-md:gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="group relative h-11 flex flex-1 items-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          >
            <div className="relative w-full h-0.5 overflow-hidden bg-text/30">
              {/* Background hover effect */}
              <div className="absolute inset-0 bg-text/50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

              {/* Active progress bar */}
              {index === currentIndex && (
                <motion.div className="absolute inset-0 bg-text ltr:origin-left rtl:origin-right" style={{ scaleX: progressScale }} />
              )}

              {/* Completed slides */}
              {index < currentIndex && <div className="absolute inset-0 bg-text" />}
            </div>
          </button>
        ))}
      </div>

      {/* Mobile Dots */}
      <div className="md:hidden bottom-8 left-1/2 z-30 absolute flex items-center gap-1 transition-all -translate-x-1/2 duration-300">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="w-10 h-10 flex justify-center items-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-text w-8 h-2' : 'bg-text/50 w-2 h-2 hover:bg-text/75'
              }`}
            />
          </button>
        ))}
      </div>
    </>
  )
}
