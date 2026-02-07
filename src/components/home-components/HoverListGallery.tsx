'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Dot } from 'lucide-react'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function HoverListGallery() {
  let [activeIndex, setActiveIndex] = useState<number | null>(null)
  let Projects = db.projects
    .filter(
      (project: any) =>
        project.name !== 'NOI' &&
        project.videoGallery &&
        project.videoGallery.length > 0 &&
        project.videoGallery.some((video: string) => video.includes('.mp4'))
    )
    .map((project: any) => ({
      name: project.id,
      video: project.videoGallery.find((video: string) => video.includes('.mp4')),
    }))

  return (
    <section className="max-md:hidden relative w-full h-[70dvh] overflow-hidden">
      <div className="relative h-full flex flex-col justify-center items-end gap-3 p-4">
        {Projects.map((project: any, index: number) => (
          <AnimIn
            key={project.name}
            delay={index * 0.1}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className="group relative cursor-pointer"
          >
            <div className="relative flex items-center font-mono text-3xl px-2">
              <TText tKey={`db.projects.${project.name}.name`} />
              <Dot />
            </div>

            <span className="bottom-0 ltr:-left-1 rtl:left-2 absolute w-full h-8 bg-text rounded-lg scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-300 delay-200 mix-blend-difference" />
          </AnimIn>
        ))}
      </div>

      <div className="z-60 absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.25 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.51, 0.25, 0.37, 0.8],
              }}
              className="w-full h-full overflow-hidden"
            >
              <video src={Projects[activeIndex].video} autoPlay muted loop playsInline poster="/images/poster.png" className="w-full h-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
