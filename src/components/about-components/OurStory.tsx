'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import TText from '@/translations/TText'
import db from '@/database/urbnlanes-db.json'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ArrowBtn from '@/components/ui/buttons/ArrowBtn'

export default function OurStory() {
  let storySteps = db.whoweare.storySteps
  let containerRef = useRef<HTMLDivElement>(null)
  let [activeStep, setActiveStep] = useState(0)
  let { scrollXProgress } = useScroll({ container: containerRef })
  let scrollX = useTransform(scrollXProgress, [0, 1], ['0%', '100%'])

  let handlePrev = () => {
    if (activeStep > 0) {
      let prevIndex = activeStep - 1
      if (prevIndex >= 0) {
        setActiveStep(prevIndex)
        scrollToStep(prevIndex)
      }
    }
  }

  let handleNext = () => {
    if (activeStep < storySteps.length - 1) {
      let nextIndex = activeStep + 1
      if (nextIndex < storySteps.length) {
        setActiveStep(nextIndex)
        scrollToStep(nextIndex)
      }
    }
  }

  let scrollToStep = (index: number) => {
    let container = containerRef.current
    if (container) {
      let cardWidth = container.scrollWidth / storySteps.length
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth',
      })
      setTimeout(() => setActiveStep(index), 300)
    }
  }

  return (
    <section className="relative w-dvw overflow-hidden bg-black text-text p-4 py-12">
      <Image
        src="/images/projects/east-sabah/es-gallery-7.avif"
        alt="Background Image"
        fill
        sizes="20dvw"
        className="absolute inset-0 object-cover opacity-40"
      />

      <AnimIn className="relative md:px-18">
        <div className="flex justify-between items-center">
          <AnimText as="h4" delay={0.3} className="text-3xl leading-none tracking-wide">
            <TText tKey="common.ourStory" />
          </AnimText>

          <div className="flex rtl:flex-row-reverse gap-4">
            <ArrowBtn onClick={handlePrev} />
            <ArrowBtn onClick={handleNext} direction="right" />
          </div>
        </div>

        <div className="relative h-px bg-main mt-18">
          <motion.div style={{ width: scrollX }} className="absolute h-full bg-text" />
        </div>

        {/* Cards */}
        <div
          ref={containerRef}
          onScroll={(e) => {
            const container = e.currentTarget
            const scrollPosition = container.scrollLeft
            const cardWidth = container.scrollWidth / storySteps.length
            const newActiveStep = Math.round(scrollPosition / cardWidth)
            setActiveStep(newActiveStep)
          }}
          style={{ scrollbarWidth: 'none' }}
          className="overflow-x-scroll overflow-y-hidden flex gap-18 max-md:gap-8"
        >
          {storySteps.map((step, index) => (
            <div
              key={step.title || `empty-${index}`}
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

                  <div className="font-light text-xl mb-2">
                    <TText tKey={`db.whoweare.storySteps.${index}.year`} />
                  </div>

                  <AnimIn
                    delay={index * 0.2}
                    className={`relative space-y-4 backdrop-blur-2xl shadow-2xl border rounded-2xl hover:bg-text/8 transition-all duration-300 p-8 ${index === activeStep ? 'bg-text/10 text-text' : 'bg-black/25 text-main'}`}
                  >
                    <h3 className="text-2xl">
                      <TText tKey={`db.whoweare.storySteps.${index}.title`} />
                    </h3>

                    <p className="opacity-90 text-sm text-balance leading-relaxed">
                      <TText tKey={`db.whoweare.storySteps.${index}.description`} />
                    </p>

                    <svg fill="none" viewBox="0 0 200 18" className="w-full h-full rtl:rotate-180 mt-12 rtl:ps-32 ltr:pe-32">
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
                          delay: 0.5 + index * 0.1,
                        }}
                      />
                    </svg>
                  </AnimIn>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </AnimIn>
    </section>
  )
}
