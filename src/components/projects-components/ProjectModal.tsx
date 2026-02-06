'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { SoftLine } from '@/components/ui/effects/Lines'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'

export default function ProjectModal({ closeModal, selectedProject, dark = true }: { closeModal: () => void; selectedProject: any; dark?: boolean }) {
  let { t } = useTranslation()

  let translationKey = selectedProject ? `db.projects.${selectedProject.id}` : ''
  let t_name = selectedProject ? t(`${translationKey}.name`) : ''
  let title = t_name && t_name !== `${translationKey}.name` ? t_name : selectedProject?.name

  let t_description = selectedProject ? t(`${translationKey}.description`) : ''
  let t_shortDesc = selectedProject ? t(`${translationKey}.shortDesc`) : ''

  let rawDescription = selectedProject?.description || selectedProject?.shortDesc
  let fallbackDescription = Array.isArray(rawDescription) ? rawDescription.join(' ') : rawDescription

  let description = fallbackDescription || 'A remarkable project by Urbnlanes Developments.'

  if (selectedProject) {
    if (t_description !== `${translationKey}.description`) description = t_description
    else if (t_shortDesc !== `${translationKey}.shortDesc`) description = t_shortDesc
  }

  useEffect(() => {
    let handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal])

  useBodyScrollLock(selectedProject)

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
          className="z-70 fixed inset-0 flex justify-center items-center bg-bg/30 backdrop-blur-2xl"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.5, opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ scale: 0.5, opacity: 0, y: 10, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, filter: { duration: 0.3, delay: 0.2 } }}
            className={`relative w-[98dvw] h-[88dvh] max-md:overflow-y-scroll overflow-y-hidden flex max-md:flex-col gap-8 shadow-2xl border rounded-2xl p-4 ${dark ? 'bg-bg text-text shadow-bg' : 'bg-text text-bg shadow-text'}`}
          >
            <div style={{ scrollbarWidth: 'none' }} className="md:w-1/3 md:overflow-y-auto flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                  <CloseBtn onClick={closeModal} />
                  <MainBtn href={selectedProject.brochure} size="sm" tKey="modal.brochure" look="mono" className="px-4! py-2.5!" />
                </div>

                <div className="flex flex-col">
                  <AnimText as="h3" delay={0.3} className="font-sec text-[3vw] max-md:text-[8vw] text-center leading-14 rtl:leading-18">
                    {title}
                  </AnimText>

                  <SoftLine className="m-2!" />

                  <span className="opacity-50 text-xs text-center normal-case tracking-wide">
                    {selectedProject.location?.city ? t(`locations.${selectedProject.location.city}`) : t('locations.New Cairo')},{' '}
                    {selectedProject.location?.country ? t(`locations.${selectedProject.location.country}`) : t('locations.Egypt')}
                  </span>

                  <span className="opacity-50 text-xs text-center normal-case tracking-wide">
                    {selectedProject.status ? t(`common.${selectedProject.status.toLowerCase().replace(/\s+/g, '')}`) : ''}
                  </span>
                </div>

                <div className="max-md:text-center mt-4">
                  <p className="opacity-75 font-mono text-sm text-balance leading-relaxed">{description}</p>
                </div>

                {selectedProject.partners && selectedProject.partners.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-xs tracking-widest mb-1">{t('modal.partners')}</h4>
                    <div className="flex justify-center md:justify-start gap-4">
                      {selectedProject.partners.map((partner: any, idx: number) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          {partner.logo && (
                            <div className="relative w-12 h-12 overflow-hidden rounded-lg p-px">
                              <ImageIn
                                src={partner.logo}
                                alt={partner.name}
                                className={`object-contain! ${dark ? '' : 'invert'} p-1`}
                                divClassName="bg-main/25!"
                              />
                            </div>
                          )}

                          <span className="text-xs text-center">{partner.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.amenities && selectedProject.amenities.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-xs tracking-widest mb-1">{t('modal.amenities')}</h4>
                    <div className="gap-2 grid grid-cols-2">
                      {selectedProject.amenities.map((amenity: any) => (
                        <div key={amenity.id} className="flex border border-current/50! rounded-lg p-1.5">
                          <span className="text-xs normal-case">{t(`amenities.${amenity.name}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.overview && (
                  <div className="border border-current/50! rounded-lg p-4">
                    <h4 className="text-xs tracking-widest mb-1">{t('modal.overview')}</h4>
                    <div className="flex flex-col">
                      {Object.entries(selectedProject.overview).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="capitalize">{key}:</span>
                          <span className="font-mono">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <MainBtn to={`/projects/${selectedProject.id}`} size="sm" tKey="modal.viewFullProject" look="mono" />
            </div>

            <div style={{ scrollbarWidth: 'none' }} className="md:h-[94dvh] md:overflow-y-auto flex-1 space-y-4 rounded-lg">
              {selectedProject.gallery.map((img: string, idx: number) => (
                <div key={idx} className="relative w-full h-[60dvh] overflow-hidden rounded-lg">
                  <ImageIn duration={0.3} delay={0} src={img} alt={`${title} - Image ${idx + 1}`} sizes="(max-width: 768px) 95vw, 60vw" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
