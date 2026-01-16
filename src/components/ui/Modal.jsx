'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import ArrowIcon from '@/components/ui/icons/ArrowIcon'

export default function Modal({ closeModal, selectedProject }) {
  const { t } = useTranslation()

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
            className="relative w-[95vw] max-md:h-[98dvh] max-md:overflow-y-scroll bg-black shadow-2xl shadow-bg border border-text/20 rounded-2xl"
          >
            <div className="flex max-md:flex-col gap-8 p-4">
              <div className="md:w-1/3 overflow-y-auto flex flex-col justify-between gap-8">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <CloseBtn onClick={closeModal} className="top-0! right-0! relative bg-text! hover:bg-main! border-main text-bg! p-2!" />

                    <MainBtn href={selectedProject.brochure} size="sm" target="_blank" rel="noopener noreferrer" icon={ArrowIcon}>
                      {t('modal.brochure')}
                    </MainBtn>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-sec text-[3vw] max-md:text-[8vw] text-center leading-14">{selectedProject.title}</h3>
                    <div className="w-full h-px bg-linear-to-r from-text/10 via-main to-text/10 my-2" />

                    <span className="text-main text-xs text-center normal-case tracking-wide">
                      {selectedProject.location?.city ? t(`locations.${selectedProject.location.city}`) : t('locations.New Cairo')},{' '}
                      {selectedProject.location?.country ? t(`locations.${selectedProject.location.country}`) : t('locations.Egypt')}
                    </span>

                    <span className="text-main text-xs text-center normal-case tracking-wide">
                      {selectedProject.status ? t(`common.${selectedProject.status.toLowerCase().replace(/\s+/g, '')}`) : ''}
                    </span>
                  </div>

                  <div className="max-md:text-center mt-4">
                    <p className="font-mono text-text/80 text-sm text-balance leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {selectedProject.partners && selectedProject.partners.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-xs uppercase tracking-widest mb-3">{t('modal.partners')}</h4>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {selectedProject.partners.map((partner, idx) => (
                          <div key={idx} className="group/partner flex flex-col items-center gap-2">
                            {partner.logo && (
                              <div className="relative w-12 h-12 overflow-hidden bg-text/5 border-2 border-text/15 group-hover/partner:border-text/50 rounded-lg transition-colors p-2">
                                <Image src={partner.logo} alt={partner.name} fill className="object-contain p-1" />
                              </div>
                            )}

                            <span className="text-[10px] text-main group-hover/partner:text-text text-center transition-colors">
                              {partner.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.amenities && selectedProject.amenities.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-xs uppercase tracking-widest mb-3">{t('modal.amenities')}</h4>
                      <div className="gap-3 grid grid-cols-2">
                        {selectedProject.amenities.map((amenity) => (
                          <div
                            key={amenity.id}
                            className="group/amenities flex items-center gap-2 bg-text/5 hover:bg-main/10 border-2 border-text/15 hover:border-text/50 rounded-lg transition-colors p-2"
                          >
                            <span className="text-[10px] text-text/80 group-hover/amenities:text-text transition-colors">
                              {t(`amenities.${amenity.name}`)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.overview && (
                    <div className="bg-main/5 hover:bg-main/10 border-2 border-text/15 hover:border-text/50 rounded-xl transition-colors mt-6 p-4">
                      <h4 className="text-xs uppercase tracking-widest mb-3">{t('modal.overview')}</h4>
                      <div className="flex flex-col gap-2">
                        {Object.entries(selectedProject.overview).map(([key, value]) => (
                          <div key={key} className="group/overview flex justify-between text-xs">
                            <span className="text-text/80 group-hover/overview:text-text capitalize transition-colors">{key}:</span>
                            <span className="font-mono text-text/80 group-hover/overview:text-text transition-colors">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <MainBtn to={`/projects/${selectedProject.id}`} size="sm" icon={ArrowIcon}>
                  {t('modal.viewFullProject')}
                </MainBtn>
              </div>

              <div className="md:h-[94dvh] overflow-y-auto flex-1 space-y-4 rounded-xl">
                {selectedProject.gallery.map((img, idx) => (
                  <div key={idx} className="relative w-full h-[60dvh] overflow-hidden rounded-xl">
                    <Image
                      src={img}
                      alt={`${selectedProject.title} - Image ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 95vw, 60vw"
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
