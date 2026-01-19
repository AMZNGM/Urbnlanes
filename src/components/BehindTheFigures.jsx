'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import SplitText from '@/components/ui/text/SplitText'
import NumberTicker from '@/components/ui/NumberTicker'

export default function BehindTheFigures() {
  const { t } = useTranslation()
  const figures = t('db.whoweare.behindthefigures')
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
        className="space-y-4 bg-main/25 shadow rounded-2xl text-center p-4"
      >
        <SplitText className="font-light text-[9dvw] text-black max-md:text-5xl tracking-tight mb-4">{figures[0].title}</SplitText>

        <SplitText as="p" className="font-light text-black/80 text-2xl md:text-3xl">
          {figures[0].tagline}
        </SplitText>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="w-32 h-px bg-black mx-auto"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl font-light text-black/60 text-base md:text-lg leading-relaxed mx-auto pt-2"
        >
          {figures[0].description}
        </motion.p>

        <div ref={containerRef} className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {figures.slice(1).map((figure, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.2 * index,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="group relative"
            >
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="relative bg-main/25 rounded-2xl p-4">
                <div className="mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + 0.2 * index,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    className="font-extralight text-7xl md:text-8xl leading-none tracking-tighter mb-3"
                  >
                    <NumberTicker value={figure.number} prefix={figure.prefix} suffix={figure.suffix} />
                  </motion.div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.6 + 0.2 * index,
                    }}
                    className="w-full h-1 bg-linear-to-r from-transparent via-main to-transparent origin-center"
                  />
                </div>

                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + 0.2 * index }}
                  className="font-medium max-md:text-xl text-2xl leading-tight tracking-tight mb-4"
                >
                  {figure.label}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1 + 0.2 * index }}
                  className="font-light text-bg max-md:text-sm leading-relaxed"
                >
                  {figure.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
