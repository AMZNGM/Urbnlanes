'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { SoftLine } from '@/components/ui/effects/Lines'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import TText from '@/translations/TText'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  Autobiography?: string
}

export default function TeamMemberModal({
  closeModal,
  selectedMember,
  dark = true,
}: {
  closeModal: () => void
  selectedMember: TeamMember | null
  dark?: boolean
}) {
  let { t } = useTranslation()

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

  useBodyScrollLock(!!selectedMember)

  return (
    <AnimatePresence>
      {selectedMember && (
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
            className={`relative w-[98dvw] h-[88dvh] max-md:overflow-y-scroll overflow-y-hidden flex max-md:flex-col gap-8 shadow-2xl border rounded-lg p-4 ${dark ? 'bg-bg text-text shadow-bg' : 'bg-text text-bg shadow-text'}`}
          >
            <div style={{ scrollbarWidth: 'none' }} className="md:w-1/3 h-full md:overflow-y-auto flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                  <CloseBtn onClick={closeModal} />
                  {selectedMember.Autobiography && (
                    <MainBtn href={selectedMember.Autobiography} size="sm" tKey="modal.autobiography" look="mono" className="px-4! py-2.5!" />
                  )}
                </div>

                <div className="flex flex-col">
                  <AnimText as="h3" delay={0.3} className="font-sec text-[3vw] max-md:text-[8vw] text-center leading-14 rtl:leading-18">
                    <TText tKey={`team.members.${selectedMember.id}.name`} />
                  </AnimText>

                  <SoftLine className="m-2!" />

                  <span className="opacity-50 font-mono text-xs text-center uppercase tracking-widest">
                    <TText tKey={`team.members.${selectedMember.id}.position`} />
                  </span>
                </div>

                <div className="h-full overflow-y-auto max-md:text-center mt-4">
                  <p className="opacity-75 font-mono text-sm text-balance leading-relaxed">
                    <TText tKey={`team.members.${selectedMember.id}.bio`} />
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <MainBtn onClick={closeModal} size="sm" tKey="common.close" look="mono" />
              </div>
            </div>

            <div style={{ scrollbarWidth: 'none' }} className="md:h-full md:overflow-y-auto flex-1 rounded-lg">
              <div className="relative w-full h-full min-h-[60dvh] overflow-hidden rounded-lg">
                <ImageIn
                  duration={0.5}
                  delay={0}
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="object-cover"
                  sizes="(max-width: 768px) 95vw, 60vw"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
