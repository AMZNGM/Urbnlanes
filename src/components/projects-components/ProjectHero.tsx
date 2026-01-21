'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/translations/useTranslation'
import { Project } from '@/types/project'

export default function ProjectHero({ project }: { project: Project }) {
  const { t } = useTranslation()

  if (!project) return null

  return (
    <section className="relative w-dvw h-[60dvh] overflow-hidden">
      <Image
        src={project.gallery?.[0] || '/images/placeholder.webp'}
        alt={project.name}
        fill
        sizes="100dvw"
        className="absolute inset-0 object-cover"
        priority
      />

      <div className="z-10 relative h-full flex justify-center items-center bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="max-w-4xl text-white text-center mx-auto px-4 py-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-extralight text-4xl md:text-6xl lg:text-7xl tracking-tight mb-4"
          >
            {project.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl font-light text-lg md:text-xl leading-relaxed"
          >
            {project.tagline}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
