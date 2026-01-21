'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/translations/useTranslation'
import { Project } from '@/types/project'

export default function ProjectAmenities({ project }: { project: Project }) {
  const { t } = useTranslation()

  if (!project || !project.amenities?.length) return null

  return (
    <section className="relative w-full bg-black/80 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-8"
        >
          <h2 className="font-bold text-white text-3xl mb-4">{t('projects.amenities')}</h2>
        </motion.div>

        <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {project.amenities.map((amenity, index) => (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl text-center p-6"
            >
              <div className="text-4xl mb-4">{amenity.icon}</div>
              <h3 className="font-semibold text-white mb-2">{amenity.name}</h3>
              <p className="text-white/80 text-sm">{amenity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
