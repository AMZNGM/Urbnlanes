'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function HoverListGallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const ProjectsVids = [
    '/videos/projects/abdullah-mubarak/am-main-2.mp4',
    '/videos/projects/abu-el-banat-tower/banat-main-2.mp4',
    '/videos/projects/dalal-complex/dalal-complex-main.mp4',
    '/videos/projects/east-lane/el-main.mp4',
    '/videos/projects/east-sabah/es-main.mp4',
    '/videos/projects/enjazat-tower/enjazat-main.mp4',
    '/videos/projects/misk-hotel/misk-main.mp4',
    '/videos/projects/mutlaa/mutlaa-main.mp4',
    '/videos/projects/omniyat-gardens/omniyat-main.mp4',
    '/videos/projects/story-branded-residences/sbr-main.mp4',
  ]
  const ProjectsNames = [
    'Abdullah Mubarak',
    'Abu El Banat Tower',
    'Dalal Complex',
    'East Lane',
    'East Sabah',
    'Enjazat Tower',
    'Misk Hotel',
    'Mutlaa',
    'Omniyat Gardens',
    'Story Branded Residences',
  ]

  return (
    <section className="relative w-full h-full overflow-hidden flex flex-col justify-end gap-4">
      <div className="relative h-full flex flex-col justify-center items-end gap-2 text-text p-4 mix-blend-difference">
        {ProjectsNames.map((name, index) => (
          <div
            key={name}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className="group relative cursor-pointer"
          >
            <h3 className="relative text-2xl">{name}</h3>

            <span className="bottom-0 left-0 absolute w-full h-0.5 bg-text scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300" />
          </div>
        ))}
      </div>

      <div className="z-30 absolute inset-0 flex justify-center items-center pointer-events-none">
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.25 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full h-full overflow-hidden"
            >
              <motion.video src={ProjectsVids[activeIndex]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
