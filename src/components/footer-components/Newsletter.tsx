'use client'

import { useActionState, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { subscribeToNewsletter } from '@/lib/newsletter'
import { ArrowRight, Check, Loader2, Mail } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import MainBtn from '@/components/ui/buttons/MainBtn'

interface FormState {
  success: boolean
  message: string
  errors?: Record<string, string>
}

const initialState: FormState = {
  success: false,
  message: '',
}

export default function Newsletter() {
  let isMobile = useIsMobile()
  let [isOpen, setIsOpen] = useState(isMobile)
  let [showMessage, setShowMessage] = useState(true)
  let [state, action, isPending] = useActionState(subscribeToNewsletter, initialState)

  useEffect(() => {
    setIsOpen(isMobile)
  }, [isMobile])

  let animationProps = {
    initial: { opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' },
    transition: { type: 'spring' as const, stiffness: 110, damping: 15 },
  }

  useEffect(() => {
    if (state.message) {
      let timer = setTimeout(() => setShowMessage(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [state.message])

  return (
    <section className="relative">
      <AnimIn blur center spring delay={0.7}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative hover:text-text text-sm text-start tracking-tight transition-colors cursor-pointer"
        >
          <TText tKey="newsletter.title" />
          <Mail size={28} />
          <ArrowRight size={20} className={`${isOpen ? 'rotate-90' : ''} transition-transform duration-500`} />
        </button>
      </AnimIn>

      <AnimatePresence>
        {isOpen && (
          <motion.div {...animationProps} className="top-full z-50 md:absolute md:w-1/3 bg-black/50 backdrop-blur-2xl rounded-2xl text-main max-md:mb-4 p-2">
            <form action={action}>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  className="w-full bg-black/50 border border-main/30 focus:border-main rounded-2xl focus:outline-none focus:ring-2 focus:ring-main/50 text-text transition-colors duration-300 px-4 py-3 placeholder-text/50"
                />

                <MainBtn type="submit" aria-label="Subscribe to newsletter" disabled={isPending || state.success} look="dark" className="w-full">
                  {isPending ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : state.success ? (
                    <Check className="text-green-500" size={20} />
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </MainBtn>
              </div>

              <p className="text-[10px] rtl:text-end text-balance mt-1 p-1">
                <TText tKey="newsletter.description" />
              </p>

              <AnimatePresence>
                {state.message && showMessage && (
                  <motion.p
                    {...animationProps}
                    className={`absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-black/75 w-full text-center ${state.success ? 'text-green-500' : 'text-red-500'}`}
                  >
                    <TText tKey={state.message} />
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
