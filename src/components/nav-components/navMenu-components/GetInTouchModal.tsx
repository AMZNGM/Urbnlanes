'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { Globe, MapPin, Share2 } from 'lucide-react'
import { MotionLine } from '@/components/ui/effects/Lines'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import MainBtn from '@/components/ui/buttons/MainBtn'
import CloseTextBtn from '@/components/ui/buttons/CloseTextBtn'

export default function GetInTouchModal({ showGetInTouch, setShowGetInTouch }: { showGetInTouch: boolean; setShowGetInTouch: (value: boolean) => void }) {
  let offices = (db as any).contact?.offices || []
  let socialMedia = (db as any).contact?.socialMedia || {}
  let allCards = [
    ...offices.map((office: any, index: number) => ({
      id: `office-${office.city}`,
      title: (
        <>
          <MapPin size={16} /> {office.city}
        </>
      ),
      content: (
        <div className="space-y-2 text-sm">
          <p className="opacity-80 capitalize">{office.address}</p>
          <a href={`tel:${office.phone}`} className="block opacity-60 hover:opacity-100 font-mono text-xs capitalize transition-opacity">
            {office.phone}
          </a>
          <a href={`mailto:${office.email}`} className="block opacity-60 hover:opacity-100 font-mono text-xs capitalize transition-opacity">
            {office.email}
          </a>
        </div>
      ),
    })),
    {
      id: 'headquarters',
      title: (
        <>
          <MapPin size={16} /> Headquarters
        </>
      ),
      content: (
        <div className="space-y-2 text-sm">
          <p className="opacity-80 capitalize leading-relaxed">{(db as any).contact?.headquarters?.address}</p>
          <a
            href={`tel:${(db as any).contact?.headquarters?.phone}`}
            className="block opacity-60 hover:opacity-100 font-mono text-xs capitalize transition-opacity"
          >
            {(db as any).contact?.headquarters?.phone}
          </a>
          <a
            href={`mailto:${(db as any).contact?.headquarters?.email}`}
            className="block opacity-60 hover:opacity-100 font-mono text-xs capitalize transition-opacity"
          >
            {(db as any).contact?.headquarters?.email}
          </a>
        </div>
      ),
    },
    {
      id: 'social-media',
      title: (
        <>
          <Share2 size={16} /> Social Media
        </>
      ),
      content: (
        <div className="flex flex-wrap">
          {Object.entries(socialMedia as Record<string, string>).map(([platform, url]) => (
            <MainBtn
              key={platform}
              href={url}
              size="sm"
              look="mono"
              className="w-full justify-start bg-transparent! text-text/60! hover:text-text! capitalize px-0!"
            >
              {platform}
            </MainBtn>
          ))}
        </div>
      ),
    },
  ]
  let [formData, setFormData] = useState({ name: '', email: '', message: '' })
  let [isSubmitting, setIsSubmitting] = useState(false)
  let [submitted, setSubmitted] = useState(false)

  let handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  useBodyScrollLock(showGetInTouch)

  return (
    <motion.div
      onClick={() => setShowGetInTouch(false)}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0 0 0 0)' }}
      exit={{ clipPath: 'inset(0 0 100%  0)' }}
      transition={{ duration: 0.5, ease: [0.45, 0, 0.55, 1], delay: 0.15 }}
      className="z-100 fixed inset-0 w-dvw h-dvh flex justify-center items-center bg-bg backdrop-blur-2xl p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="relative w-full [&::-webkit-scrollbar]:w-2 overflow-x-hidden overflow-y-auto flex flex-col gap-8 bg-bg/50 [&::-webkit-scrollbar-thumb:hover]:bg-main/50 [&::-webkit-scrollbar-thumb]:bg-main/30 [&::-webkit-scrollbar-track]:bg-transparent backdrop-blur-2xl rounded-lg px-8 max-md:px-4 py-12"
      >
        <div className="flex justify-between items-center">
          <div className="flex max-md:flex-col gap-6 max-md:gap-2">
            <div className="space-x-2 font-mono text-sm tracking-wider">
              <span className="opacity-60">
                <TText tKey="common.hotline" />:
              </span>
              <span className="font-bold">{db.metadata.company.hotline}</span>
            </div>

            <div className="font-mono text-sm tracking-wider">
              <span className="opacity-60">
                <TText tKey="footer.taxreg" />
              </span>
              <span className="font-bold">{db.metadata.company.taxreg}</span>
            </div>
          </div>

          <CloseTextBtn onClick={() => setShowGetInTouch(false)} delay={0.2} />
        </div>

        <div className="gap-12 grid md:grid-cols-2 mb-4">
          {allCards.map((card) => (
            <div key={card.id} className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 font-mono text-sm tracking-wider">{card.title}</h3>
              <div>{card.content}</div>
              <MotionLine className="opacity-50 mt-auto" />
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="space-y-8">
          <MotionLine className="opacity-50 mb-8" />

          <h3 className="font-mono text-lg tracking-wider mb-1">
            <TText tKey="nav.getInTouch" />
          </h3>

          <p className="opacity-60 text-sm normal-case">
            <TText tKey="common.getintouchdesc" />
          </p>

          {submitted ? (
            <div className="h-40 flex flex-col justify-center items-center space-y-2 text-center">
              <div className="flex items-center gap-2 text-green-500">
                <Globe size={24} />
                <span className="text-lg">
                  <TText tKey="common.success" />
                </span>
              </div>

              <p className="text-text/60 text-sm">
                <TText tKey="newsletter.messages.success" />
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="gap-2 grid md:grid-cols-2">
                {(['name', 'email', 'message'] as const).map((field) => (
                  <div key={field} className="last:col-span-full">
                    <label className="opacity-60 font-mono text-xs normal-case tracking-wider">{field.charAt(0).toUpperCase() + field.slice(1)}</label>

                    {field === 'message' ? (
                      <textarea
                        required
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full bg-bg/5 border focus:border-main! rounded-lg outline-none transition-colors mb-2 px-4 py-3 resize-none placeholder-main/30"
                        placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
                        rows={6}
                      />
                    ) : (
                      <input
                        required
                        name={field}
                        type={field === 'email' ? 'email' : 'text'}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full bg-bg/5 border focus:border-main! rounded-lg outline-none transition-colors mb-2 px-4 py-3 placeholder-main/30"
                        placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <MainBtn disabled={isSubmitting} type="submit" look="wideMono" size="sm">
                  {isSubmitting ? <TText tKey="common.loading" /> : 'Send Message'}
                </MainBtn>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
