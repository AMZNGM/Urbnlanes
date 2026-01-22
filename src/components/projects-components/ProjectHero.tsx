'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Project } from '@/types/project'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/text/AnimText'

export default function ProjectHero({ project }: { project: Project }) {
  if (!project) return null

  return (
    <section className="relative w-full h-[80dvh] overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="z-0 absolute inset-0">
        <Image
          src={project.gallery?.[0] || '/images/placeholder.webp'}
          alt={project.name}
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="z-10 relative h-full flex flex-col justify-end pb-24 container">
        <div className="max-w-4xl">
          <AnimIn delay={0.2}>
            {project.logo && (
              <div className="relative w-48 h-24 mb-8">
                <Image src={project.logo} alt={`${project.name} logo`} fill className="object-contain object-left" />
              </div>
            )}
          </AnimIn>

          <AnimText as="h1" className="font-sec text-text text-6xl md:text-8xl lg:text-9xl ltr:leading-[0.9] rtl:leading-tight mb-6">
            {project.name}
          </AnimText>

          {project.tagline && (
            <AnimIn delay={0.4}>
              <p className="max-w-2xl font-light text-text/80 text-xl md:text-2xl leading-relaxed">{project.tagline}</p>
            </AnimIn>
          )}
        </div>
      </div>
    </section>
  )
}
