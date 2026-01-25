'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Project } from '@/types/project'
import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import * as Icons from 'lucide-react'

export default function ProjectAmenities({ project }: { project: Project }) {
  const [hoveredAmenity, setHoveredAmenity] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (project.amenities?.length || 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [project.amenities?.length])

  if (!project || !project.amenities?.length) return null

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-12">
      <AnimText as={'h2'} delay={0.9} className="font-sec font-medium text-xs tracking-widest">
        <TText tKey="modal.amenities" />
      </AnimText>

      <MotionLine delay={0.7} />

      <AnimText as={'p'} delay={0.9} className="font-sec font-light rtl:text-xs">
        <TText tKey="common.amenitiesDesc" />
      </AnimText>

      <div className="gap-4 grid md:grid-cols-2 mt-16 max-md:mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={hoveredAmenity || currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-md:hidden relative overflow-hidden bg-bg rounded-2xl"
          >
            <Image
              src={project.gallery?.[currentIndex % project.gallery.length] || ''}
              alt="Image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 object-cover opacity-75 rounded-2xl"
            />

            {project.amenities.map((amenity, index) => (
              <div
                key={amenity.id}
                className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-500 ${hoveredAmenity === amenity.id || (hoveredAmenity === null && index === currentIndex) ? 'opacity-100' : 'opacity-0! pointer-events-none'}`}
              >
                <p className="bg-main/50 backdrop-blur-3xl rounded-2xl text-text normal-case text-balance leading-relaxed p-4">
                  <TText tKey={`db.projects.amenities.${amenity.id}.description`} />
                </p>
              </div>
            ))}

            <div className="right-0 bottom-0 left-0 absolute flex gap-2 bg-bg p-4">
              {project.amenities.map((amenity, index) => (
                <div key={amenity.id} className="h-1 flex-1 bg-text/25 rounded-full transition-all duration-1000">
                  <div
                    className={`h-full bg-main transition-all duration-500 ease-in-out ${hoveredAmenity === amenity.id || (hoveredAmenity === null && index === currentIndex) ? 'w-full' : 'w-0'}`}
                  />
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
                onMouseEnter={() => setHoveredAmenity(amenity.id)}
                onMouseLeave={() => setHoveredAmenity(null)}
                className="relative overflow-hidden flex flex-col justify-center items-center gap-4 bg-main/25 rounded-2xl text-center p-4 cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-main/25 mix-blend-difference transition-all duration-700 ease-in-out ${hoveredAmenity === amenity.id || (hoveredAmenity === null && index === currentIndex) ? 'w-full' : 'w-0'}`}
                />

                <IconComponent size={32} />
                <h3 className="font-medium text-sm">
                  <TText tKey={`db.projects.amenities.${amenity.id}.name`} />
                </h3>
                <p className="md:hidden bg-main/25 opacity-90 rounded-2xl text-sm normal-case text-balance leading-relaxed p-4">
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
