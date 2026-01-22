'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Project } from '@/types/project'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/text/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function ProjectDetails({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0)
  if (!project) return null

  const details = [
    { labelKey: 'details.status', valueKey: `common.${project.status}` },
    { labelKey: 'details.city', valueKey: `locations.${project.location?.city}` },
    { labelKey: 'details.country', valueKey: `locations.${project.location?.country}` },
    { labelKey: 'details.category', valueKey: `common.${project.category}` },
  ].filter((d) => d.valueKey)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % details.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [details.length])

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-24">
      <div className="gap-12 grid lg:grid-cols-3">
        <div className="space-y-8 col-span-1 max-lg:col-span-3">
          <AnimText delay={0.9} className="font-sec text-4xl uppercase rtl:leading-14 tracking-widest">
            <TText tKey={`modal.overview`} />
          </AnimText>

          <div className="space-y-6 font-light text-bg text-lg normal-case leading-relaxed">
            {project.description && (
              <AnimText as={'p'} delay={0.5}>
                <TText tKey={`db.projects.${project.id}.description`} />
              </AnimText>
            )}

            {project.description2 && (
              <AnimText as={'p'} delay={0.7}>
                <TText tKey={`db.projects.${project.id}.description2`} />
              </AnimText>
            )}
          </div>
        </div>

        <AnimIn className="relative h-120 max-lg:h-100 overflow-hidden col-span-2 max-lg:col-span-3 bg-main/25 rounded-2xl">
          {project.gallery && project.gallery[0] && <ImageIn src={project.gallery[project.gallery.length - 1]} alt="image" />}

          {project.gallery &&
            details.map((_, index) => (
              <motion.div
                key={index}
                initial={{ x: '100%' }}
                animate={activeIndex === index ? { x: 0 } : { x: '-100%' }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
                className="absolute inset-0 overflow-hidden rounded-2xl"
              >
                {project.gallery && project.gallery[index + 1] && (
                  <ImageIn src={project.gallery[project.gallery.length - (index + 2)]} alt={`image-${index + 1}`} />
                )}
              </motion.div>
            ))}
        </AnimIn>

        <AnimIn className="relative grid grid-cols-4 col-span-3 bg-main/25 rounded-2xl text-center">
          {details.map((detail, index) => (
            <div key={index} className="relative p-4">
              <AnimText delay={0.1 * index} className="font-medium text-xs tracking-wider">
                <TText tKey={detail.labelKey} />
              </AnimText>

              <AnimText delay={0.3 * index} className="max-md:text-xs text-sm">
                <TText tKey={detail.valueKey} />
              </AnimText>
            </div>
          ))}

          <motion.div
            className="absolute inset-0 bg-main/25 rounded-2xl mix-blend-difference"
            initial={{ width: '0%' }}
            animate={{ width: `${((activeIndex + 1) / details.length) * 100}%` }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </AnimIn>
      </div>
    </section>
  )
}
