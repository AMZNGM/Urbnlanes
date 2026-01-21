'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/translations/useTranslation'
import { Project } from '@/types/project'

export default function ProjectLocation({ project }: { project: Project }) {
  const { t } = useTranslation()

  if (!project || !project.location) return null

  return (
    <section className="relative w-full bg-black/80 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-8"
        >
          <h2 className="font-bold text-white text-3xl mb-4">{t('projects.location')}</h2>
        </motion.div>

        <div className="gap-8 grid md:grid-cols-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
            <div className="relative w-full h-64 md:h-96 aspect-video overflow-hidden rounded-lg mb-6">
              <Image
                src={project.location.map}
                alt={`${project.name} Location`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white text-xl mb-2">{project.location.city}</h3>
              <p className="text-white/80">{project.location.country}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
