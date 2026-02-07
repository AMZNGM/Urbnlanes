'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { Briefcase, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { SoftLine, MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import ApplicationForm from './ApplicationForm'

export default function CareerModal({ closeModal, selectedRole, dark = true }: { closeModal: () => void; selectedRole: any; dark?: boolean }) {
  let { t } = useTranslation()
  let benefits = (t(`careers.roles.${selectedRole?.id}.benefits`, { returnObjects: true }) as string[]) || []

  useKeyboardShortcuts({
    onEscape: () => {
      closeModal()
    },
  })

  useBodyScrollLock(selectedRole)

  return (
    <AnimatePresence>
      {selectedRole && (
        <motion.div
          onClick={closeModal}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-70 fixed inset-0 flex justify-center items-center bg-bg/30 backdrop-blur-lg px-4 max-md:px-2"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.5, opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ scale: 0.5, opacity: 0, y: 10, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, filter: { duration: 0.7, delay: 0.2 } }}
            className={`relative w-full max-w-5xl h-[90dvh] max-md:overflow-y-auto overflow-y-hidden flex max-md:flex-col-reverse gap-4 border rounded-lg max-md:p-4 p-6  ${
              dark ? 'bg-bg text-text shadow-bg' : 'bg-text text-bg shadow-text'
            }`}
          >
            {/* Left Side */}
            <div style={{ scrollbarWidth: 'none' }} className="md:overflow-y-auto flex-1 border rounded-lg p-4">
              <div className="mb-8">
                <h3 className="font-sec text-2xl mb-1">
                  <TText tKey="careers.applyNow" />
                </h3>

                <p className="opacity-50 text-xs normal-case tracking-wider">
                  <TText tKey="careers.joinDesc" />
                </p>
              </div>

              <ApplicationForm role={`careers.roles.${selectedRole.id}.title`} />
            </div>

            {/* Right Side */}
            <div style={{ scrollbarWidth: 'none' }} className="md:w-2/5 md:overflow-y-auto flex flex-col gap-6">
              <div className="space-y-4">
                <CloseBtn onClick={closeModal} className="w-fit" />

                <AnimText as="h2" delay={0.3} className="font-sec text-4xl md:text-5xl">
                  <TText tKey={`careers.roles.${selectedRole.id}.title`} />
                </AnimText>

                <div className="flex flex-col gap-4 opacity-60 font-mono text-xs">
                  <div className="flex items-center gap-1">
                    <Briefcase size={14} /> Full-time
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} /> {selectedRole.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} /> Posted Recently
                  </div>
                </div>
              </div>

              <SoftLine className="my-2!" />

              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="opacity-50 font-mono text-[10px] uppercase tracking-widest">
                    <TText tKey="careers.aboutRole" />
                  </h4>
                  <p className="opacity-80 text-sm normal-case text-balance leading-relaxed">
                    <TText tKey={`careers.roles.${selectedRole.id}.about`} />
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="opacity-50 font-mono text-[10px] uppercase tracking-widest">
                    <TText tKey="careers.whatWeOffer" />
                  </h4>
                  <ul className="space-y-2">
                    {benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 opacity-70 text-sm normal-case">
                        <CheckCircle2 size={14} className="text-main mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <MotionLine delay={0.6} className="opacity-30 mt-auto" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
