'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

export default function ProjectDetails({ project }) {
  const { t } = useTranslation()

  if (!project) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
      className="w-full bg-black/80 backdrop-blur-md py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-bold text-white text-3xl mb-4">{t('projects.details')}</h2>

          <div className="gap-8 grid md:grid-cols-2 text-white/90">
            {project.status && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg mb-2">{t('projects.status')}</h3>
                <p className="text-white/80">{project.status}</p>
              </div>
            )}

            {project.location && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg mb-2">{t('projects.location')}</h3>
                <p className="text-white/80">
                  {project.location.city}, {project.location.country}
                </p>
              </div>
            )}

            {project.completion && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg mb-2">{t('projects.completion')}</h3>
                <p className="text-white/80">{project.completion}</p>
              </div>
            )}

            {project.category && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg mb-2">{t('projects.category')}</h3>
                <p className="text-white/80">{project.category}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
