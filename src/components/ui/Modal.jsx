'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import ArrowIcon from '@/components/ui/icons/ArrowIcon'

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
            initial={{ scale: 0.5, opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ scale: 0.5, opacity: 0, y: 10, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, filter: { duration: 0.3, delay: 0.2 } }}
            className="relative w-[95vw] max-md:h-[98vh] max-md:overflow-y-scroll bg-black shadow-2xl shadow-bg border border-text/20 rounded-2xl"
          >
            <div className="flex max-md:flex-col gap-8 p-4">
              <div className="md:w-1/3 flex flex-col justify-between gap-8">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <CloseBtn onClick={closeModal} className="top-0! right-0! relative bg-text! hover:bg-main! border-main text-bg! p-2!" />

                    <MainBtn href={selectedProject.brochure} size="sm">
                      brochure <ArrowIcon className="w-3 fill-bg -rotate-40" />
                    </MainBtn>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-sec text-[3vw] max-md:text-[8vw] text-center leading-14">{selectedProject.title}</h3>
                    <div className="w-full h-px bg-linear-to-r from-text/10 via-main to-text/10 my-2" />

                    <span className="text-main text-xs text-center normal-case tracking-wide">
                      {selectedProject.location?.city || 'New Cairo'}, {selectedProject.location?.country || 'Egypt'}
                    </span>
                    <span className="text-main text-xs text-center normal-case tracking-wide">{selectedProject.status}</span>
                  </div>

                  <div className="text-center">
                    {/* <h4 className="text-main text-xs tracking-widest mb-2">Description</h4> */}
                    <p className="font-mono text-text/80 text-sm text-balance leading-relaxed">{selectedProject.description}</p>
                  </div>
                </div>

                <MainBtn to={`/projects/${selectedProject.id}`} size="sm">
                  View Full Project <ArrowIcon className="w-3 fill-bg -rotate-40" />
                </MainBtn>
              </div>

              <div className="md:h-[80vh] overflow-y-auto space-y-4 rounded-xl">
                {selectedProject.gallery.map((img, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-xl">
                    <Image
                      src={img}
                      alt={`${selectedProject.title} - Image ${idx + 1}`}
                      width={1200}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
