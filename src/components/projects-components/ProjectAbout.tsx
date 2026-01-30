'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Project } from '@/types/project'
import { Download } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import BreathingText from '@/components/ui/text/BreathingText'

export default function ProjectAbout({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0)
  if (!project) return null

  const about = [
    { labelKey: 'projectAbout.status', valueKey: `common.${project.status}` },
    { labelKey: 'projectAbout.city', valueKey: `locations.${project.location?.city}` },
    { labelKey: 'projectAbout.country', valueKey: `locations.${project.location?.country}` },
    { labelKey: 'projectAbout.category', valueKey: `filters.${project.category?.[0]}` },
  ].filter((d) => d.valueKey)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % about.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [about.length])

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-bg px-18 max-md:px-4 py-24 max-md:py-12">
      <div className={`max-w-6xl mx-auto ${project.shortDesc || project.description || project.brochure ? 'grid lg:grid-cols-3 gap-12' : 'space-y-12'}`}>
        <div className={`space-y-8 col-span-1 max-lg:col-span-3 ${project.shortDesc || project.description || project.brochure ? '' : `hidden`}`}>
          {(project.shortDesc || project.description || project.brochure) && (
            <div>
              <AnimText delay={0.5} className="font-mono text-4xl rtl:leading-14 tracking-widest">
                <TText tKey={`nav.about`} />
              </AnimText>

              <AnimText delay={0.7} className="font-mono text-4xl rtl:leading-14 tracking-widest">
                <TText tKey={`db.projects.${project.id}.name`} />
              </AnimText>
            </div>
          )}

          <div className="space-y-6 font-light text-bg text-lg normal-case leading-relaxed">
            {project.shortDesc && (
              <AnimText as={'p'} delay={0.3}>
                <TText tKey={`db.projects.${project.id}.shortDesc`} />
              </AnimText>
            )}

            {Array.isArray(project.description) && (
              <div className="space-y-4">
                {project.description.map((desc: string, index: number) => (
                  <AnimText key={index} as={'p'} delay={0.5 + index * 0.1}>
                    <TText tKey={`db.projects.${project.id}.description`} />
                  </AnimText>
                ))}
              </div>
            )}

            {project.brochure && (
              <AnimIn delay={0.6} className="w-fit flex items-center gap-2 border rounded-2xl mt-8 p-2">
                <Download size={16} />
                <MainBtn href={project.brochure} tKey="modal.brochure" className="inline-flex items-center gap-2" />
              </AnimIn>
            )}
          </div>
        </div>

        <AnimIn className="relative max-lg:h-100 min-h-120 overflow-hidden col-span-2 max-lg:col-span-3 bg-main/25 rounded-2xl">
          {project.gallery && project.gallery[0] && <ImageIn src={project.gallery[project.gallery.length - 1]} alt="image" />}

          {project.gallery &&
            about.map((_, index) => (
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
          {about.map((detail, index) => (
            <div key={index} className="relative h-20 flex flex-col justify-center items-center gap-2">
              <AnimIn delay={0.1 * index} className="font-bold text-xs tracking-wider">
                <BreathingText fromFW="'wght' 400, 'slnt' 10">
                  <TText tKey={detail.labelKey} />
                </BreathingText>
              </AnimIn>

              <AnimIn delay={0.3 * index} className="font-bold max-md:text-xs text-sm">
                <BreathingText fromFW="'wght' 400, 'slnt' 10">
                  <TText tKey={detail.valueKey} />
                </BreathingText>
              </AnimIn>
            </div>
          ))}

          <motion.div
            className="absolute inset-0 bg-main/25 rounded-2xl mix-blend-difference"
            initial={{ width: '0%' }}
            animate={{ width: `${((activeIndex + 1) / about.length) * 100}%` }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </AnimIn>
      </div>
    </section>
  )
}
