'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { SoftLine } from '@/components/ui/effects/Lines'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import ArrowIcon from '@/components/ui/icons/ArrowIcon'

export default function Modal({
  closeModal,
  selectedProject,
  dark = true,
}: {
  closeModal: () => void
  selectedProject: any
  dark?: boolean
}) {
  const { t } = useTranslation()

  const translationKey = selectedProject ? `db.projects.${selectedProject.id}` : ''
  const t_name = selectedProject ? t(`${translationKey}.name`) : ''
  const title = t_name && t_name !== `${translationKey}.name` ? t_name : selectedProject?.name

  const t_description = selectedProject ? t(`${translationKey}.description`) : ''
  const t_shortDesc = selectedProject ? t(`${translationKey}.shortDesc`) : ''

  const rawDescription = selectedProject?.description || selectedProject?.shortDesc
  const fallbackDescription = Array.isArray(rawDescription) ? rawDescription.join(' ') : rawDescription

  let description = fallbackDescription || 'A remarkable project by Urbnlanes Developments.'

  if (selectedProject) {
    if (t_description !== `${translationKey}.description`) description = t_description
    else if (t_shortDesc !== `${translationKey}.shortDesc`) description = t_shortDesc
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal])

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
            className={`relative w-[95dvw] h-[98dvh] max-md:overflow-y-scroll flex max-md:flex-col gap-8 shadow-2xl border rounded-2xl p-4 ${dark ? 'bg-black text-text shadow-black border-text/20' : 'bg-text text-black shadow-text border-black/20'}`}
          >
            <div style={{ scrollbarWidth: 'none' }} className="md:w-1/3 md:overflow-y-auto flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <CloseBtn
                    onClick={closeModal}
                    className={`top-0! right-0! relative p-2! ${dark ? 'bg-text! text-bg!' : 'bg-black! text-text!'}`}
                  />
                  <MainBtn
                    href={selectedProject.brochure}
                    size="sm"
                    icon={ArrowIcon}
                    tKey="modal.brochure"
                    look="dark"
                    className={`${dark ? 'bg-text text-black!' : ''}`}
                  />
                </div>

                <div className="flex flex-col">
                  <AnimText as="h3" delay={0.3} className="font-sec text-[3vw] max-md:text-[8vw] text-center leading-14">
                    {title}
                  </AnimText>

                  <SoftLine />

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
                  <div className="mt-6">
                    <h4 className="text-xs uppercase tracking-widest mb-3">{t('modal.partners')}</h4>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      {selectedProject.partners.map((partner: any, idx: number) => (
                        <div key={idx} className="group/partner flex flex-col items-center gap-2">
                          {partner.logo && (
                            <div className="relative w-12 h-12 overflow-hidden bg-black border-2 border-text/15 group-hover/partner:border-text/50 rounded-lg transition-colors p-px">
                              <ImageIn src={partner.logo} alt={partner.name} className="object-contain!" />
                            </div>
                          )}

                          <span className="text-[10px] text-center">{partner.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.amenities && selectedProject.amenities.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-xs uppercase tracking-widest mb-3">{t('modal.amenities')}</h4>
                    <div className="gap-3 grid grid-cols-2">
                      {selectedProject.amenities.map((amenity: any) => (
                        <div
                          key={amenity.id}
                          className="group/amenities flex items-center gap-2 bg-current/2 hover:bg-current/4 border-2 border-current/15 hover:border-current/50 rounded-lg transition-all p-2"
                        >
                          <span className="opacity-75 group-hover/amenities:opacity-100 text-[10px] transition-opacity">
                            {t(`amenities.${amenity.name}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.overview && (
                  <div className="bg-current/2 hover:bg-current/4 border-2 border-current/15 hover:border-current/50 rounded-xl transition-colors mt-6 p-4">
                    <h4 className="text-xs uppercase tracking-widest mb-3">{t('modal.overview')}</h4>
                    <div className="flex flex-col gap-2">
                      {Object.entries(selectedProject.overview).map(([key, value]) => (
                        <div key={key} className="group/overview flex justify-between text-xs">
                          <span className="opacity-75 group-hover/overview:opacity-100 capitalize transition-opacity">{key}:</span>
                          <span className="opacity-75 group-hover/overview:opacity-100 font-mono transition-opacity">
                            {value as string}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <MainBtn
                to={`/projects/${selectedProject.id}`}
                size="sm"
                icon={ArrowIcon}
                tKey="modal.viewFullProject"
                look="dark"
                className={`${dark ? 'bg-text text-black!' : ''}`}
              />
            </div>

            <div style={{ scrollbarWidth: 'none' }} className="md:h-[94dvh] md:overflow-y-auto flex-1 space-y-4 rounded-xl">
              {selectedProject.gallery.map((img: string, idx: number) => (
                <div key={idx} className="relative w-full h-[60dvh] overflow-hidden rounded-xl">
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
