'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function HoverListGallery() {
  const vids = [
    '/videos/projects/abdullah-mubarak/am-main.mp4',
    '/videos/projects/abdullah-mubarak/am-main.mp4',
    '/videos/projects/abdullah-mubarak/am-main.mp4',
    '/videos/projects/abdullah-mubarak/am-main.mp4',
  ]
  const clientsNames = ['Client 1', 'Client 2', 'Client 3', 'Client 4']

  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-text uppercase p-4">
      <div className="relative w-full h-full flex flex-col justify-end gap-4">
        <p className="text-sm">Trusted Us</p>

        {/* VIDEO PREVIEW */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <AnimatePresence mode="wait">
            {activeIndex !== null && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.25 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full h-full overflow-hidden"
              >
                <motion.video src={vids[activeIndex]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CLIENT LIST */}
        <div className="z-20 relative w-[60%] max-md:w-full flex flex-wrap gap-3 mix-blend-difference">
          {clientsNames.map((name, index) => (
            <div
              key={name}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group relative cursor-pointer"
            >
              <h3 className="text-5xl">{name}</h3>

              {/* underline */}
              <span className="-bottom-1 left-0 absolute w-full h-0.5 bg-text scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
