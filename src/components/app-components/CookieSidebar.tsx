'use client'

import { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CookieContext } from '@/contexts/CookieContext'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { Settings, Shield, Activity, Target, User, Lock } from 'lucide-react'
import MainBtn from '@/components/ui/buttons/MainBtn'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import SwitchBtn from '@/components/ui/buttons/SwitchBtn'

const CookieCategory = ({
  title,
  description,
  icon: Icon,
  checked,
  onChange,
  disabled = false,
}: {
  title: string
  description: string
  icon: React.ElementType
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}) => {
  return (
    <div className="flex gap-2 bg-main/25 hover:bg-text/10 backdrop-blur-2xl rounded-2xl transition-all duration-300 p-2">
      <div className={`p-4 rounded-2xl transition-all duration-300 ${checked ? 'bg-main text-text ' : 'bg-text/10 text-bg'} `}>
        <Icon size={24} />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className={`font-bold text-lg tracking-tight ${checked ? 'text-text' : 'text-main'}`}>{title}</h4>

          {disabled ? (
            <div className="flex items-center gap-2 font-bold text-[10px] text-main tracking-widest">
              <Lock size={12} />
              Required
            </div>
          ) : (
            <SwitchBtn checked={checked} onChange={onChange!} />
          )}
        </div>

        <p className={`max-w-xl opacity-50 font-medium text-xs leading-relaxed ${checked ? 'text-text' : 'text-main'}`}>{description}</p>
      </div>
    </div>
  )
}

export default function CookieSidebar() {
  let [open, setOpen] = useState(false)
  let context = useContext(CookieContext)
  if (!context) return null
  let { consent, setCategory, acceptAll } = context
  let [local, setLocal] = useState({ analytics: false, marketing: false, preferences: false })

  useBodyScrollLock(open)

  useEffect(() => {
    if (consent) {
      setLocal({
        analytics: !!consent.analytics,
        marketing: !!consent.marketing,
        preferences: !!consent.preferences,
      })
    }
  }, [consent])

  useEffect(() => {
    const handleOpenSidebar = () => setOpen(true)
    window.addEventListener('openCookieSidebar', handleOpenSidebar)
    return () => window.removeEventListener('openCookieSidebar', handleOpenSidebar)
  }, [])

  let handleSave = () => {
    setCategory('analytics', local.analytics)
    setCategory('marketing', local.marketing)
    setCategory('preferences', local.preferences)
    setCategory('consentDate', new Date().toISOString())
    setOpen(false)
  }

  let handleAcceptAll = () => {
    acceptAll()
    setCategory('consentDate', new Date().toISOString())
    setOpen(false)
  }

  let cookieCategories = [
    {
      title: 'Structural Essential',
      description: 'Foundational components for site architecture, security protocols, and session integrity, These are always on.',
      icon: Shield,
      checked: true,
      disabled: true,
    },
    {
      title: 'Behavioral Analytics',
      description: 'Sophisticated data modeling to understand site flow and optimize structural performance.',
      icon: Activity,
      checked: local.analytics,
      onChange: (checked: boolean) => setLocal((s) => ({ ...s, analytics: checked })),
    },
    {
      title: 'Targeted Growth',
      description: 'Strategic marketing integration to deliver relevant updates to your regional interests.',
      icon: Target,
      checked: local.marketing,
      onChange: (checked: boolean) => setLocal((s) => ({ ...s, marketing: checked })),
    },
    {
      title: 'Personalized Flow',
      description: 'Advanced preference memory for a tailored navigation experience through our masterworks.',
      icon: User,
      checked: local.preferences,
      onChange: (checked: boolean) => setLocal((s) => ({ ...s, preferences: checked })),
    },
  ]

  return (
    <AnimatePresence>
      <motion.button
        key="cookie-orb"
        layoutId="cookie-ui"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="group bottom-0 left-0 z-40 fixed w-10 h-10 flex justify-center items-center bg-bg/50 hover:bg-main/50 backdrop-blur-2xl rounded-2xl text-text transition-colors duration-300 m-4 cursor-pointer"
      >
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <Settings size={24} />
        </motion.div>
      </motion.button>

      {open && (
        <div
          key="modal-overlay"
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/60 p-2"
        >
          <motion.div
            layoutId="cookie-ui"
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            transition={{ type: 'spring', damping: 30, stiffness: 150 }}
            className="max-w-3xl max-h-[90vh] overflow-x-hidden overflow-y-auto flex flex-col bg-main/25 backdrop-blur-3xl rounded-2xl p-4"
          >
            <header className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-2xl tracking-wide">Privacy Setup</h3>
              <CloseBtn onClick={() => setOpen(false)} />
            </header>

            <div className="space-y-2 mb-4">
              <p className="bg-main/15 opacity-50 rounded-2xl font-bold text-[10px] p-2">
                When you use the Urbnlanes website, certain information may be stored or retrieved in your browser, mainly through cookies. This data can relate
                to your device, settings, or general usage and helps the site work as intended. It usually doesn't directly identify you, but it enables a more
                tailored experience.
              </p>

              {cookieCategories.map((cat, i) => (
                <CookieCategory key={i} {...cat} />
              ))}
            </div>

            <footer className="w-full flex max-md:flex-col justify-between items-center gap-4">
              <MainBtn onClick={handleAcceptAll} size="sm" look="wideMono">
                Architecture Approved
              </MainBtn>

              <MainBtn onClick={handleSave} size="sm" look="wideMonoDark">
                Save Settings
              </MainBtn>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
