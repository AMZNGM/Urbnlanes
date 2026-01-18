'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import SplitText from '@/components/ui/text/SplitText'

export default function OurStory() {
  const { t } = useTranslation()
  const storySteps = t('db.whoweare.storySteps')
  const containerRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: 'x',
    offset: ['start start', 'end end'],
  })
  const scrollX = useTransform(scrollXProgress, [0, 1], ['0%', '100%'])

  const handlePrev = () => {
    if (activeStep > 0) {
      let prevIndex = activeStep - 1
      if (prevIndex >= 0) {
        setActiveStep(prevIndex)
        scrollToStep(prevIndex)
      }
    }
  }

  const handleNext = () => {
    if (activeStep < storySteps.length - 1) {
      let nextIndex = activeStep + 1
      if (nextIndex < storySteps.length) {
        setActiveStep(nextIndex)
        scrollToStep(nextIndex)
      }
    }
  }

  const hasPrevValidStep = () => {
    let prevIndex = activeStep - 1
    return prevIndex >= 0
  }

  const hasNextValidStep = () => {
    let nextIndex = activeStep + 1
    return nextIndex < storySteps.length
  }

  const scrollToStep = (index) => {
    const container = containerRef.current
    if (container) {
      const cardWidth = container.scrollWidth / storySteps.length
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth',
      })
      setTimeout(() => setActiveStep(index), 300)
    }
  }

  return (
    <div className="relative w-dvw overflow-hidden bg-black text-text p-4 py-12">
      <Image
        src="/images/projects/east-sabah/es-gallery-7.avif"
        alt="Background Image"
        fill
        sizes="100dvw"
        className="absolute inset-0 object-cover opacity-40"
      />

      <div className="relative container">
        <div className="flex justify-between items-center">
          <SplitText splitBy="char" className="text-3xl tracking-wide">
            {t('common.ourStory')}
          </SplitText>

          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={!hasPrevValidStep()}
              className="bg-text/25 hover:bg-text/50 disabled:bg-text/10 backdrop-blur-md border rounded-full rtl:rotate-180 hover:scale-110 transition-all duration-300 p-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={!hasNextValidStep()}
              className="bg-text/25 hover:bg-text/50 disabled:bg-text/10 backdrop-blur-md border rounded-full rtl:rotate-180 hover:scale-110 transition-all duration-300 p-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative h-px bg-main mt-18">
          <motion.div
            style={{
              width: scrollX,
            }}
            className="absolute h-full bg-text"
          />
        </div>

        {/* Cards */}
        <div
          ref={containerRef}
          onScroll={(e) => {
            const container = e.target
            const scrollPosition = container.scrollLeft
            const cardWidth = container.scrollWidth / storySteps.length
            const newActiveStep = Math.round(scrollPosition / cardWidth)
            setActiveStep(newActiveStep)
          }}
          style={{ scrollbarWidth: 'none' }}
          className="overflow-x-scroll flex gap-18 max-md:gap-8"
        >
          {storySteps.map((step, index) => (
            <motion.div
              key={step.title || `empty-${index}`}
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                if (step.title) {
                  setActiveStep(index)
                  scrollToStep(index)
                }
              }}
              className={`group relative min-w-sm ${step.title ? 'cursor-pointer' : ''}`}
            >
              {step.title ? (
                <>
                  <div
                    className={`w-6 h-6 rotate-45 ms-2 -translate-y-4 backdrop-blur-2xl border transition-all duration-300 cursor-pointer group-hover:bg-text/20 ${index <= activeStep ? 'bg-text/20' : 'bg-black/25'}`}
                  />

                  <div className="font-light text-xl mb-2">{step.year}</div>

                  <div
                    className={`relative space-y-4 shadow-2xl backdrop-blur-2xl border rounded-2xl hover:bg-text/8 transition-all duration-300 p-8 ${index === activeStep ? 'bg-text/10 text-text' : 'bg-black/25 text-main'}`}
                  >
                    <h3 className="text-2xl">{step.title}</h3>

                    <p className="opacity-90 text-sm text-balance leading-relaxed">{step.description}</p>

                    <svg fill="none" viewBox="0 0 200 18" className="w-full h-full mt-12 pe-32">
                      <motion.path
                        d="M0 12H200M200 12L190 18M200 12L190 6"
                        stroke="currentColor"
                        strokeWidth="0.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, pathOffset: 1 }}
                        whileInView={{
                          pathLength: 1,
                          pathOffset: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.5,
                          ease: 'easeInOut',
                          delay: 0.2 + index * 0.1,
                        }}
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
