'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function MarkedProjects() {
  let markedProjects = db.projects.filter((p) => ['east-lane', 'levels-business-tower', 'noi', 'mid-lane', 'yellow-lane'].includes(p.id))

  let containerRef = useRef(null)
  let { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.8', 'end 0.9'] })
  let getCardPosition = (index: number) => {
    let positions = [
      { col: 'lg:col-start-1 lg:col-span-2', row: 0 },
      { col: 'lg:col-start-2 lg:col-span-4', row: 0 },
      { col: 'lg:col-start-4 lg:col-span-3', row: 0 },
      { col: 'lg:col-start-2 lg:col-span-3 md:col-span-2', row: 1 },
      { col: 'lg:col-start-4 lg:col-span-2', row: 1 },
    ]
    return positions[index] || { col: '', row: 0 }
  }

  return (
    <section className="relative w-dvw overflow-x-hidden bg-text text-bg px-18 max-md:px-4">
      <AnimText
        as={'h2'}
        delay={0.3}
        data-scroll
        data-scroll-speed="0.1"
        className="font-bold text-[11dvw] text-bg max-md:rtl:leading-18 md:leading-40! md:rtl:leading-70!"
      >
        <TText tKey="common.markedProjects" />
      </AnimText>

      <div ref={containerRef} className="relative gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 py-8">
        {markedProjects.map((project, index) => {
          let position = getCardPosition(index)
          let totalCards = markedProjects.length // Calculate individual card progress based on index
          let cardProgress = useTransform(scrollYProgress, [index / totalCards, (index + 1) / totalCards], [0, 1]) // Stacked position (center of viewport)
          let x = useSpring(useTransform(cardProgress, [0, 1], [`${-50 * ((index % 3) - 1)}%`, '0%']), { stiffness: 100, damping: 20 }) // Center horizontally when stacked
          let y = useSpring(useTransform(cardProgress, [0, 1], [`${-50 * Math.floor(index / 3)}%`, '0%']), { stiffness: 100, damping: 20 }) // Center vertically when stacked
          let scale = useSpring(useTransform(cardProgress, [0, 0.5, 1], [0.8, 0.95, 1]), { stiffness: 100, damping: 20 }) // Scale from stacked to final position
          let rotate = useSpring(useTransform(cardProgress, [0, 1], [index * 2 - 4, 0]), { stiffness: 100, damping: 20 })

          return (
            <motion.div key={project.id} style={{ x, y, scale, rotate }} className={`relative rounded-2xl overflow-hidden cursor-pointer ${position.col}`}>
              <ImageIn
                src={project.gallery?.[2] || '/images/poster.png'}
                alt={project.name}
                divClassName="h-96! rounded-2xl! overflow-hidden!"
                className="scale-100!"
              />
              <div className="bottom-0 left-0 absolute w-full space-y-4 bg-main/25 backdrop-blur-2xl text-text text-center p-4">
                <h4 className="font-sec font-bold text-xl">{<TText tKey={`db.projects.${project.id}.name`} />}</h4>
                <MainBtn href={`/projects/${project.id}`} tKey="common.viewProject" size="sm" className="w-full bg-text!" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
