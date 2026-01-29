'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import BreathingText from '@/components/ui/text/BreathingText'
import LineHeading from '@/components/shared/LineHeading'

export default function ProjectsImpact() {
  let impacts = [
    { text: 'common.ourImpact', value: '36+' },
    { text: 'db.whoweare.statistics[1].title', value: '100+' },
    { text: 'db.whoweare.behindthefigures[3].label', value: '20+' },
    { text: 'common.inKuwait', value: '18' },
  ]

  let container = useRef<HTMLDivElement>(null)
  let { scrollYProgress } = useScroll({ target: container, offset: ['start 80%', 'end start'] })
  let y = useTransform(scrollYProgress, [0, 1], [0, 473])

  return (
    <section className="relative w-dvw bg-text text-black px-18 max-md:px-4 py-4">
      {/* <LineHeading tKey="common.ourImpact" /> */}

      <div className="h-full gap-4 grid md:grid-cols-2 py-8">
        <div className="h-full gap-4 max-md:order-last grid grid-cols-2 max-md:py-18">
          {db.whoweare.kuwaitProjects.map((project, index) => (
            <AnimIn
              data-scroll
              data-scroll-speed="0.2"
              key={index}
              delay={0.03 * index}
              className={`group bg-main/25 hover:bg-main/35 ${index % 2 === 0 ? 'text-left' : 'text-right'} rounded-lg font-mono tracking-wide transition-colors p-4`}
            >
              <AnimText as={'p'} delay={0.3} className="opacity-80 group-hover:opacity-100 text-sm transition-opacity duration-200">
                <TText tKey={`db.whoweare.kuwaitProjects.${index}`} />
              </AnimText>
            </AnimIn>
          ))}
        </div>

        <section className="relative w-full h-full overflow-hidden bg-text text-black">
          <AnimIn className="h-full gap-4 grid grid-cols-2 bg-main/25 rounded-2xl text-center p-4">
            <div ref={container} className="relative h-full gap-2 grid">
              {impacts.map((impact, index) => (
                <AnimIn key={index} delay={index * 0.1} className="group gap-4 grid bg-main/25 hover:bg-main/50 rounded-2xl transition-colors duration-500 p-8">
                  <div className="font-bold text-main group-hover:text-black/75 text-4xl transition-colors duration-500">{impact.value}</div>

                  <p className="opacity-75 text-sm">
                    <TText tKey={impact.text} />
                  </p>
                </AnimIn>
              ))}
            </div>

            <motion.div style={{ y: y }}>
              <BreathingText
                as="h3"
                className="bg-main/25 hover:bg-main/50 rounded-2xl group-hover:text-black/75 text-2xl transition-colors duration-500 py-14"
              >
                <TText tKey="common.ourImpact" />
              </BreathingText>
            </motion.div>
          </AnimIn>
        </section>
      </div>
    </section>
  )
}
