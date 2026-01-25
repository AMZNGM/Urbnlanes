'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function ProjectsImpact() {
  const impacts = [
    { text: 'common.ourImpact', value: '36+' },
    { text: 'db.whoweare.statistics[1].title', value: '100+' },
    { text: 'db.whoweare.behindthefigures[3].label', value: '20+' },
    { text: 'common.inKuwait', value: '18' },
  ]

  let container = useRef<HTMLDivElement>(null)
  let { scrollYProgress } = useScroll({ target: container, offset: ['start 80%', 'end start'] })
  let y = useTransform(scrollYProgress, [0, 1], [0, 480])

  return (
    <section className="relative w-full h-full overflow-hidden bg-text text-black">
      <AnimIn className="h-full gap-4 grid grid-cols-2 bg-main/25 rounded-2xl text-center p-4">
        <div ref={container} className="relative h-full gap-2 grid">
          {impacts.map((impact, index) => (
            <AnimIn
              key={index}
              delay={index * 0.1}
              className="gap-4 grid bg-main/25 hover:bg-main/50 rounded-2xl transition-colors duration-200 p-8"
            >
              <div className="font-bold text-main text-4xl">{impact.value}</div>

              <p className="opacity-75 text-sm">
                <TText tKey={impact.text} />
              </p>
            </AnimIn>
          ))}
        </div>

        <motion.div style={{ y: y }}>
          <AnimText
            as="h3"
            className="bg-main/25 hover:bg-main/50 rounded-2xl font-sec font-medium text-2xl transition-colors duration-200 py-14"
          >
            <TText tKey="common.ourImpact" />
          </AnimText>
        </motion.div>
      </AnimIn>
    </section>
  )
}
