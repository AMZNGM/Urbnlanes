'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

export default function SimilarProjects({ currentProject, allProjects }) {
  const { t } = useTranslation()

  if (!currentProject || !allProjects?.length) return null

  const similarProjects = allProjects.filter((project) => project.id !== currentProject.id && project.category === currentProject.category)

  return (
    <section className="relative w-full bg-black/80 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-8"
        >
          <h2 className="font-bold text-white text-3xl mb-4">{t('projects.similar')}</h2>
        </motion.div>

        <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
          {similarProjects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/projects/${project.id}`} className="block">
                <div className="relative overflow-hidden bg-white/10 backdrop-blur-md rounded-xl">
                  <Image
                    src={project.gallery?.[0] || '/images/placeholder.webp'}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-white mb-2">{project.name}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{project.tagline}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {similarProjects.length > 3 && (
          <div className="text-center mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 px-6 py-3"
            >
              <span className="font-medium text-white">{t('projects.viewAll')}</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
