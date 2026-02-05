'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Dot } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function HoverListGallery() {
  let [activeIndex, setActiveIndex] = useState<number | null>(null)
  let Projects = [
    {
      name: 'db.projects.west-abdullah-mubarak-city.name',
      video: '/videos/projects/abdullah-mubarak/am-main.mp4',
    },
    {
      name: 'db.projects.abu-el-banat-tower.name',
      video: '/videos/projects/abu-el-banat-tower/banat-main.mp4',
    },
    {
      name: 'db.projects.dalal-complex.name',
      video: '/videos/projects/dalal-complex/dalal-complex-main-1.mp4',
    },
    {
      name: 'db.projects.east-lane.name',
      video: '/videos/projects/east-lane/el-main-1.mp4',
    },
    {
      name: 'db.projects.story-branded-residences.name',
      video: '/videos/projects/story-branded-residences/sbr-main.mp4',
    },
    {
      name: 'db.projects.enjazat-tower.name',
      video: '/videos/projects/enjazat-tower/enjazat-main-1.mp4',
    },
    {
      name: 'db.projects.misk-hotel.name',
      video: '/videos/projects/misk-hotel/misk-main-1.mp4',
    },
    {
      name: 'db.projects.mutlaa-city.name',
      video: '/videos/projects/mutlaa/mutlaa-main-1.mp4',
    },
    {
      name: 'db.projects.omniyat-gardens.name',
      video: '/videos/projects/omniyat-gardens/omniyat-main-1.mp4',
    },
  ]

  return (
    <section className="max-md:hidden relative w-full h-full overflow-hidden">
      <div className="relative h-full flex flex-col justify-center items-end gap-3 p-4">
        {Projects.map((project, index) => (
          <AnimIn
            key={project.name}
            delay={index * 0.1}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className="group relative cursor-pointer"
          >
            <div className="relative flex items-center text-text group-hover:text-text text-2xl transition-colors duration-300 px-2">
              <TText tKey={project.name} />
              <Dot />
            </div>
            <span className="bottom-0 ltr:-left-1 rtl:left-2 absolute w-full h-8 bg-text rounded-2xl scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-300 mix-blend-difference" />
          </AnimIn>
        ))}
      </div>

      <div className="z-30 absolute inset-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.25 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
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
