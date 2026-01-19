'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'

export default function ProjectPartners({ project }) {
  const { t } = useTranslation()

  if (!project || !project.partners?.length) return null

  return (
    <section className="relative w-full bg-black/80 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-8"
        >
          <h2 className="font-bold text-white text-3xl mb-4">{t('projects.partners')}</h2>
        </motion.div>

        <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {project.partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl text-center p-6"
            >
              <Image src={partner.logo} alt={partner.name} width={80} height={80} className="mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">{partner.name}</h3>
              <p className="text-white/80 text-sm">{partner.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
