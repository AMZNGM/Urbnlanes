'use client'

import { useActionState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { subscribeToNewsletter } from '@/lib/newsletter'
import ShinyText from '@/components/ui/text/ShinyText'

const initialState = {
  success: false,
  message: '',
  errors: {},
}

export default function Newsletter() {
  const [state, action, isPending] = useActionState(subscribeToNewsletter, initialState)

  return (
    <section className="relative w-full overflow-hidden bg-black text-text px-4 py-24">
      <div className="w-full h-px bg-linear-to-r from-transparent via-main to-transparent mb-24" />

      <div className="items-end gap-12 grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="overflow-hidden space-y-2"
        >
          <ShinyText tag="h2" speed={15} className="font-sec text-3xl leading-[0.9] tracking-tight">
            Get news & updates from Urbnlanes
          </ShinyText>

          <p className="text-sm">
            Sign up and be the first to know about the latest developments and exciting news on how we are shaping the future!
          </p>
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
              Email Address
            </label>
            <input
              type="email"
              id="newsletter-email"
              name="email"
              placeholder="Your email"
              required
              disabled={isPending || state.success}
              className="w-full bg-transparent disabled:opacity-50 border-text/30 focus:border-text border-b focus:outline-none font-light text-text text-2xl md:text-3xl transition-colors py-6 pr-16 disabled:cursor-not-allowed placeholder-text/40"
            />

            <button
              type="submit"
              disabled={isPending || state.success}
              aria-label="Subscribe"
              className="top-1/2 right-0 absolute text-text/50 hover:text-text disabled:text-text/30 transition-colors -translate-y-1/2 duration-300 ps-8 cursor-pointer disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={32} />
              ) : state.success ? (
                <Check className="text-green-500" size={32} />
              ) : (
                <ArrowRight size={32} />
              )}
            </button>
          </form>

          <AnimatePresence>
            {state.message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute left-0 -bottom-8 text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}
              >
                {state.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
