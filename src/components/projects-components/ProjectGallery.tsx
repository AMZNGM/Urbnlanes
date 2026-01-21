'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from '@/translations/useTranslation'
import { Project } from '@/types/project'

export default function ProjectGallery({ project }: { project: Project }) {
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!project || !project.gallery?.length) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (project.gallery?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (project.gallery?.length || 1)) % (project.gallery?.length || 1))
  }

  return (
    <section className="relative w-full bg-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-8"
        >
          <h2 className="font-bold text-white text-3xl mb-4">{t('projects.gallery')}</h2>
        </motion.div>

        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevImage}
              disabled={currentImageIndex === 0}
              className="bg-white/10 hover:bg-white/20 disabled:opacity-50 backdrop-blur-md rounded-full transition-all duration-300 p-3 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="text-white/80 text-sm">
              {currentImageIndex + 1} / {project.gallery.length}
            </div>

            <button
              onClick={nextImage}
              disabled={currentImageIndex === project.gallery.length - 1}
              className="bg-white/10 hover:bg-white/20 disabled:opacity-50 backdrop-blur-md rounded-full transition-all duration-300 p-3 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="relative h-[60dvh] md:h-[70dvh] overflow-hidden rounded-2xl">
            <Image
              src={project.gallery[currentImageIndex]}
              alt={`${project.name} - Image ${currentImageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
