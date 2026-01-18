'use client'

import { useActionState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { subscribeToNewsletter } from '@/lib/newsletter'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import ShinyText from '@/components/ui/text/ShinyText'

const initialState = {
  success: false,
  message: '',
  errors: {},
}

export default function Newsletter({ className = '', withLine = true }) {
  const { t } = useTranslation()
  const [state, action, isPending] = useActionState(subscribeToNewsletter, initialState)

  return (
    <section className={`relative w-full overflow-hidden bg-black text-text px-4 py-12 ${className}`}>
      {withLine && <div className="w-full h-px bg-linear-to-r from-transparent via-current to-transparent mb-18" />}

      <div className="items-end gap-12 grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="overflow-hidden space-y-4"
        >
          <ShinyText tag="h2" speed={15} className="font-sec text-current! text-3xl leading-[0.9] tracking-tight">
            {t('newsletter.title')}
          </ShinyText>

          <p className="text-sm">{t('newsletter.description')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          className="relative"
        >
          <form action={action} className="group relative">
            <label htmlFor="newsletter-email" className="sr-only">
              {t('newsletter.emailLabel')}
            </label>
            <input
              type="email"
              id="newsletter-email"
              name="email"
              placeholder={t('newsletter.emailPlaceholder')}
              required
              disabled={isPending || state.success}
              className="w-full bg-transparent disabled:opacity-50 border-current/30 focus:border-current border-b focus:outline-none font-light text-current text-2xl md:text-3xl transition-colors py-6 pr-16 rtl:pr-0 rtl:pl-16 disabled:cursor-not-allowed placeholder-current/40"
            />

            <button
              type="submit"
              disabled={isPending || state.success}
              aria-label={t('newsletter.subscribe')}
              className="top-1/2 right-0 rtl:right-auto rtl:-left-6 absolute text-current/50 hover:text-current disabled:text-current/30 transition-colors -translate-y-1/2 duration-300 ps-8 rtl:ps-0 rtl:pe-8 cursor-pointer disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={32} />
              ) : state.success ? (
                <Check className="text-green-500" size={32} />
              ) : (
                <ArrowRight size={32} className="rtl:rotate-180 transition-transform" />
              )}
            </button>
          </form>

          <AnimatePresence>
            {state.message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute left-0 rtl:right-0 rtl:left-auto -bottom-8 text-sm ${
                  state.success ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {t(state.message)}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
