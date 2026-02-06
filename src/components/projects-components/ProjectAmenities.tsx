'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Project } from '@/types/project'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import * as Icons from 'lucide-react'

export default function ProjectAmenities({ project }: { project: Project }) {
  let [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  if (!project || !project.amenities?.length) return null

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (project.amenities?.length || 1))
    }, 4000)
  }

  useEffect(() => {
    resetInterval()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [project.amenities?.length])

  useEffect(() => {
    resetInterval()
  }, [currentIndex])

  return (
    <section className="relative w-dvw overflow-hidden bg-text font-mono text-bg px-4 max-md:px-2 py-32">
      <div className="max-w-md font-black text-center normal-case text-balance mx-auto">
        <AnimText className="text-6xl">
          <TText tKey="modal.amenities" />
        </AnimText>
        <AnimText className="text-2xl">
          <TText tKey="common.amenitiesDesc" />
        </AnimText>
      </div>

      <div className="max-w-5xl gap-4 grid md:grid-cols-2 mx-auto mt-16 max-md:mt-12">
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} className="max-md:hidden relative h-140 overflow-hidden bg-bg rounded-lg">
            <Image
              src={project.gallery?.[5] || project.gallery?.[0] || ''}
              alt="Image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 object-cover opacity-75 rounded-lg"
            />

            {project.amenities.map((amenity, index) => (
              <motion.div
                key={amenity.id}
                initial={{ scale: 1.2, opacity: 0, rotate: -5, x: -100 }}
                animate={{ scale: 1, opacity: 1, rotate: 0, x: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotate: 5, x: 200 }}
                transition={{ type: 'spring', ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`absolute inset-0 flex justify-center items-center p-4 ${index === currentIndex ? 'opacity-100' : 'opacity-0! pointer-events-none'}`}
              >
                <p className="bg-main/95 rounded-lg text-text normal-case text-balance leading-relaxed p-4">
                  <TText tKey={`db.projects.amenities.${amenity.id}.description`} />
                </p>
              </motion.div>
            ))}

            <div className="right-0 bottom-0 left-0 absolute flex gap-2 bg-bg p-4">
              {project.amenities.map((amenity, index) => (
                <div
                  key={amenity.id}
                  onClick={() => setCurrentIndex(index)}
                  className="h-1 flex-1 bg-text/25 rounded-full transition-all duration-1000 cursor-pointer"
                >
                  <div className={`h-full bg-main transition-all duration-500 ease-in-out ${index === currentIndex ? 'w-full' : 'w-0'}`} />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="gap-4 max-lg:gap-2 grid md:grid-cols-3 lg:grid-cols-4">
          {project.amenities.map((amenity, index) => {
            const IconComponent = (Icons as any)[amenity.icon] || Icons.Sparkles
            return (
              <AnimIn
                key={amenity.id}
                delay={0.1 * index}
                onClick={() => setCurrentIndex(index)}
                className="relative overflow-hidden flex flex-col justify-center items-center gap-4 bg-main/25 hover:bg-main/50 rounded-lg text-center transition-colors duration-200 p-4 cursor-pointer"
              >
                <div
                  className={`max-md:hidden absolute inset-0 bg-main/25 mix-blend-difference transition-all duration-700 ease-in-out ${index === currentIndex ? 'w-full' : 'w-0'}`}
                />

                <IconComponent size={32} />
                <h3 className="font-medium text-sm">
                  <TText tKey={`db.projects.amenities.${amenity.id}.name`} />
                </h3>
                <p className="md:hidden bg-main/25 opacity-90 rounded-lg text-sm normal-case text-balance leading-relaxed p-4">
                  <TText tKey={`db.projects.amenities.${amenity.id}.description`} />
                </p>
              </AnimIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
