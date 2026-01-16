'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { Dot } from 'lucide-react'

export default function HoverListGallery() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(null)
  const ProjectsVids = [
    '/videos/projects/abdullah-mubarak/am-main.mp4',
    '/videos/projects/abu-el-banat-tower/banat-main.mp4',
    '/videos/projects/dalal-complex/dalal-complex-main-1.mp4',
    '/videos/projects/east-lane/el-main-1.mp4',
    '/videos/projects/east-sabah/es-main-1.mp4',
    '/videos/projects/enjazat-tower/enjazat-main-1.mp4',
    '/videos/projects/misk-hotel/misk-main-1.mp4',
    '/videos/projects/mutlaa/mutlaa-main-1.mp4',
    '/videos/projects/omniyat-gardens/omniyat-main-1.mp4',
  ]
  const ProjectsNames = [
    t('db.projects.west-abdullah-mubarak-city.name'),
    t('db.projects.abu-el-banat-tower.name'),
    t('db.projects.dalal-complex.name'),
    t('db.projects.east-lane.name'),
    t('db.projects.east-subah-al-ahmed-city.name'),
    t('db.projects.enjazat-tower.name'),
    t('db.projects.misk-hotel.name'),
    t('db.projects.mutlaa-city.name'),
    t('db.projects.omniyat-gardens.name'),
  ]

  return (
    <section className="max-md:hidden relative w-full h-full overflow-hidden">
      <div className="relative h-full flex flex-col justify-center items-end gap-3 p-4">
        {ProjectsNames.map((name, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className="group relative cursor-pointer"
          >
            <div className="relative flex items-center text-text group-hover:text-text text-2xl transition-colors animate-pulse duration-300 px-2">
              {name}
              <Dot />
            </div>

            <span className="bottom-0 ltr:-left-1 rtl:left-2 absolute w-full h-8 bg-text rounded-xl scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-300 mix-blend-difference" />
          </motion.div>
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
              <video
                src={ProjectsVids[activeIndex]}
                autoPlay
                muted
                loop
                playsInline
                type="video/mp4"
                poster="/images/poster.png"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
