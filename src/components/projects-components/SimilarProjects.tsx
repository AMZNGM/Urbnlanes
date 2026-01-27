'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Project } from '@/types/project'
import { MotionLine } from '@/components/ui/effects/Lines'
import { Dot } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import ArrowBtn from '@/components/ui/buttons/ArrowBtn'
import LineHeading from '@/components/shared/LineHeading'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function SimilarProjects({ currentProject, allProjects }: { currentProject: Project; allProjects: Project[] }) {
  let scrollContainerRef = useRef<HTMLDivElement>(null)

  let similarProjects = allProjects.filter(
    (project) => project.id !== currentProject.id && project.category.some((cat) => currentProject.category.includes(cat))
  )

  if (!currentProject || !allProjects?.length || similarProjects.length === 0) return null

  let scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' })
    }
  }

  let scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-12">
      <LineHeading tKey="common.similarProjects" paraTKey="common.similarProjectsDesc" />

      <div className="flex justify-end gap-4">
        <ArrowBtn onClick={scrollLeft} direction="left" />
        <ArrowBtn onClick={scrollRight} direction="right" />
      </div>

      <div className="relative mt-8">
        <div ref={scrollContainerRef} style={{ scrollbarWidth: 'none' }} className="overflow-x-auto">
          <div className="min-w-max flex gap-4 md:gap-5 lg:gap-6">
            {similarProjects.slice(0, 8).map((project, index) => (
              <AnimIn key={project.id} delay={0.1 * index} className="group w-88 h-100 shrink-0">
                <RippleEffect className="relative w-full h-full overflow-hidden flex flex-col rounded-2xl">
                  <Link
                    href={`/projects/${project.id}`}
                    className="h-full overflow-hidden flex flex-col bg-main/25 hover:bg-main/35 rounded-2xl transition-colors duration-500 ease-out"
                  >
                    <ImageIn
                      src={project.gallery?.[0] || '/images/placeholder.webp'}
                      alt={project.name}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="group-hover:scale-110 transition-transform duration-700 ease-out"
                      divClassName="relative overflow-hidden h-48! sm:h-52! lg:h-56!"
                      hasOverlay
                    />

                    <div className="flex flex-col flex-1 space-y-3 px-5 sm:px-6 py-6 sm:py-7">
                      <AnimIn className="flex items-center text-xs">
                        {project.category[0] && <p className="font-mono font-bold tracking-wider">{<TText tKey={`filters.${project.category[0]}`} />}</p>}
                        <Dot className="w-4 h-4 opacity-50" />
                        {project.category[1] && <p className="font-mono font-bold tracking-wider">{<TText tKey={`filters.${project.category[1]}`} />}</p>}
                      </AnimIn>

                      {project.name && (
                        <AnimText as={'h3'} delay={0.2} className="text-xl sm:text-2xl line-clamp-1 leading-tight">
                          <TText tKey={`db.projects.${project.id}.name`} />
                        </AnimText>
                      )}

                      {project.description && (
                        <AnimText as={'p'} delay={0.5} className="text-sm normal-case line-clamp-2 leading-relaxed">
                          <TText tKey={`db.projects.${project.id}.description[0]`} />
                        </AnimText>
                      )}

                      <div className="mt-auto">
                        <div className="w-0 group-hover:w-full h-0.5 bg-main/50 transition-all duration-500 ease-out" />
                      </div>
                    </div>
                  </Link>
                </RippleEffect>
              </AnimIn>
            ))}
          </div>
        </div>

        <div className="top-0 right-0 bottom-0 z-10 absolute w-8 bg-linear-to-l from-text to-transparent pointer-events-none" />
      </div>

      <AnimIn delay={0.6} className="text-center my-12 md:my-16 lg:my-18">
        <MainBtn to="/projects" tKey="common.viewAllProjects" />
      </AnimIn>

      <MotionLine delay={1} />
    </section>
  )
}
