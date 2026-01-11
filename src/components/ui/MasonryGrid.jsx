'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

export default function MasonryGrid({ projects, openModal }) {
  return (
    <div className="gap-2 columns-1 md:columns-2 lg:columns-3 xl:columns-5">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          onClick={() => openModal(project)}
          initial={{ opacity: 0.5, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: index * 0.05 }}
          className={`${project.height} relative group cursor-pointer overflow-hidden rounded-xl mb-2`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <motion.div className="bottom-4 left-4 absolute overflow-hidden bg-black/25 md:opacity-0 group-hover:opacity-100 backdrop-blur-xl rounded-2xl transition-all md:translate-x-8 md:translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 duration-500 p-4">
            <h3 className="font-mono">{project.title || 'Project name'}</h3>
            <span className="font-mono text-xs normal-case tracking-wide">
              {project.location?.city || 'New Cairo'}, {project.location?.country || 'Egypt'}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
