'use client'

import { motion, AnimatePresence } from 'motion/react'
import CloseBtn from './buttons/CloseBtn'
import Image from 'next/image'

export default function Modal({ closeModal, selectedProject }) {
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          onClick={closeModal}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-2xl"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            initial={{ scale: 0.5, opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ scale: 0.5, opacity: 0, y: 10, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, filter: { duration: 0.3, delay: 0.2 } }}
            className="relative w-[95vw] h-[90vh] max-md:h-[98vh] bg-black shadow-2xl shadow-bg border border-text/10 rounded-2xl"
          >
            <div className="flex max-md:flex-col gap-8 p-4">
              <div className="md:w-1/2 flex flex-col gap-8">
                <CloseBtn onClick={closeModal} className="top-0! right-0! relative" />

                <div>
                  <h3 className="font-[var(--font-sec)] text-[var(--color-text)] text-5xl mb-4">{selectedProject.title}</h3>
                  <div className="flex items-center gap-4 text-[var(--color-main)] mb-6">
                    <span className="font-[var(--font-main)] text-lg">{selectedProject.category}</span>
                    <span className="w-2 h-2 bg-[var(--color-main)] rounded-full"></span>
                    <span className="font-[var(--font-main)] text-lg">{selectedProject.year}</span>
                  </div>
                  <div className="w-16 h-0.5 bg-[var(--color-main)]/60"></div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-[var(--font-main)] text-[var(--color-main)] text-sm uppercase tracking-widest mb-2">Description</h4>
                    <p className="font-[var(--font-main)] text-[var(--color-text)]/80 text-lg leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-[var(--font-main)] text-[var(--color-main)] text-sm uppercase tracking-widest mb-2">Client</h4>
                    <p className="font-[var(--font-main)] text-[var(--color-text)] text-lg">{selectedProject.client}</p>
                  </div>
                </div>

                {/* View Project Button */}
                <a
                  href={`/projects/${selectedProject.id}`}
                  className="group inline-flex items-center gap-3 bg-[var(--color-main)]/20 hover:bg-[var(--color-main)]/30 backdrop-blur-sm border border-[var(--color-main)]/40 rounded-sm font-[var(--font-main)] text-[var(--color-text)] text-sm uppercase tracking-widest transition-all duration-300 px-8 py-4"
                >
                  <span>View Full Project</span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="h-[80vh] overflow-y-auto space-y-4 rounded-xl">
                {selectedProject.gallery.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.5, opacity: 0, y: 10, filter: 'blur(10px)' }}
                    animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ scale: 0.5, opacity: 0, y: 10, filter: 'blur(10px)' }}
                    transition={{ duration: 0.3, filter: { duration: 0.3, delay: idx * 0.2 } }}
                    className="relative overflow-hidden rounded-xl"
                  >
                    <Image
                      src={img}
                      alt={`${selectedProject.title} - Image ${idx + 1}`}
                      width={1200}
                      height={100}
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
