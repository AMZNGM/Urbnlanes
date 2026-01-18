'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import SplitText from '@/components/ui/text/SplitText'

function NumberTicker({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix
      }
    })
  }, [springValue, prefix, suffix])

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}

const stats = [
  {
    number: 3,
    prefix: '',
    suffix: '',
    label: 'Pioneering Decades',
    description:
      'Three decades of steadfast commitment, a journey marked by learning, growth, and consistently delivering on our promises to the people and places we serve.',
  },
  {
    number: 100,
    prefix: '+',
    suffix: '',
    label: 'Projects Developed',
    description:
      'A century of completed projects, each one a testament to our promise to enhance the urban fabric and create homes, workspaces, and gathering points for diverse communities.',
  },
  {
    number: 20,
    prefix: '+',
    suffix: '',
    label: 'Towers on Ground',
    description:
      'More than 20 striking towers that stand as beacons of innovation and architectural artistry, providing modern, inspiring spaces for people to live, work, and thrive.',
  },
  {
    number: 38,
    prefix: '+',
    suffix: '',
    label: 'Years of Dedication',
    description:
      'Over 38 years of accumulated knowledge, experience, and trust, ensuring every development is built on a foundation of integrity and long-term vision.',
  },
]

export default function BehindTheFigures() {
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
        <SplitText className="font-light text-[9dvw] text-black max-md:text-5xl tracking-tight mb-4">Behind the Figures</SplitText>

        <SplitText as="p" className="font-light text-black/80 text-2xl md:text-3xl">
          Urbnlanes in numbers
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
          The dedication, passion, and years of diligence are best reflected in the enduring impact of the legacy we share with our sister
          company, First Group. These figures speak to a profound investment in human potential and architectural excellence:
        </motion.p>

        <div ref={containerRef} className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
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
                {/* Number Ticker */}
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
                    className="font-extralight text-black text-7xl md:text-8xl leading-none tracking-tighter mb-3"
                  >
                    <NumberTicker value={stat.number} prefix={stat.prefix} suffix={stat.suffix} />
                  </motion.div>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.6 + 0.2 * index,
                    }}
                    style={{ transformOrigin: 'left' }}
                    className="w-20 h-0.5 bg-black"
                  />
                </div>

                {/* Label */}
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + 0.2 * index }}
                  className="font-medium text-black text-xl md:text-2xl leading-tight tracking-tight mb-4"
                >
                  {stat.label}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1 + 0.2 * index }}
                  className="font-light text-black/70 text-sm md:text-base leading-relaxed"
                >
                  {stat.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
