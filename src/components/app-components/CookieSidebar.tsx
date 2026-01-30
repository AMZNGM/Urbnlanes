'use client'

import { useContext, useEffect, useState } from 'react'
import { CookieContext } from '@/contexts/CookieContext'
import { Settings, Shield, Activity, Target, User, Info, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import { MotionLine } from '@/components/ui/effects/Lines'
import AnimText from '@/components/ui/unstyled/AnimText'

const ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}) => (
  <label className={`relative inline-flex items-center cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} disabled={disabled} />
    <span className={`w-14 h-8 rounded-full transition-all duration-500 ${checked ? 'bg-main shadow-[0_0_20px_rgba(142,142,142,0.5)]' : 'bg-text/5'}`} />
    <span
      className={`absolute left-1.5 top-1.5 w-5 h-5 rounded-full bg-text shadow-lg transition-all duration-500 ease-out ${
        checked ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </label>
)

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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative flex items-start gap-6 bg-text/5 hover:bg-text/10 backdrop-blur-md border border-text/10 rounded-[2rem] transition-all duration-500 p-8"
    >
      <div
        className={`p-4 rounded-2xl ${
          checked ? 'bg-main text-bg shadow-[0_0_30px_rgba(142,142,142,0.3)]' : 'bg-text/10 text-text'
        } transition-all duration-500`}
      >
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-lg tracking-tight">{title}</h4>
          {disabled ? (
            <div className="flex items-center gap-2 font-black text-[10px] text-main/50 uppercase tracking-widest">
              <Lock size={12} />
              Required
            </div>
          ) : (
            <ToggleSwitch checked={checked} onChange={onChange!} disabled={disabled} />
          )}
        </div>
        <p className="opacity-50 font-medium text-xs leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export default function CookieSidebar() {
  let [open, setOpen] = useState(false)
  let context = useContext(CookieContext)
  if (!context) return null

  let { consent, setCategory, acceptAll } = context
  let [local, setLocal] = useState({ analytics: false, marketing: false, preferences: false })

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
      description: 'Foundational components for site architecture, security protocols, and session integrity.',
      icon: Shield,
      checked: true,
      disabled: true,
    },
    {
      title: 'Behavioral Analytics',
      description: 'Sophisticated data modeling to understand site flow and optimize structural performance.',
      icon: Activity,
      checked: local.analytics,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLocal((s) => ({ ...s, analytics: e.target.checked })),
    },
    {
      title: 'Targeted Growth',
      description: 'Strategic marketing integration to deliver relevant updates to your regional interests.',
      icon: Target,
      checked: local.marketing,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLocal((s) => ({ ...s, marketing: e.target.checked })),
    },
    {
      title: 'Personalized Flow',
      description: 'Advanced preference memory for a tailored navigation experience through our masterworks.',
      icon: User,
      checked: local.preferences,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLocal((s) => ({ ...s, preferences: e.target.checked })),
    },
  ]

  return (
    <AnimatePresence>
      <motion.button
        key="cookie-orb"
        layoutId="cookie-ui"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        onClick={() => setOpen(true)}
        className="group bottom-8 left-8 z-40 fixed w-16 h-16 overflow-hidden flex justify-center items-center bg-bg/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] backdrop-blur-[40px] border border-text/20 hover:border-main/50 rounded-full hover:scale-110 transition-all duration-700"
      >
        <div className="absolute inset-0 bg-main opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 group-hover:text-main transition-colors duration-700"
        >
          <Settings size={28} />
        </motion.div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-[2px] border-main rounded-full scale-110 group-hover:scale-100 transition-all duration-700" />
      </motion.button>

      {open && (
        <div key="modal-overlay" className="z-50 fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-[20px] p-4 md:p-8">
          <motion.div
            layoutId="cookie-ui"
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            transition={{ type: 'spring', damping: 30, stiffness: 150 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden flex md:flex-row flex-col bg-bg/80 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] backdrop-blur-[80px] border border-text/10 rounded-[4rem]"
          >
            {/* Left Panel - Branding */}
            <div className="md:w-1/3 flex flex-col justify-between bg-main/5 border-text/10 border-r p-12">
              <div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="mb-12">
                  <Shield size={48} className="text-main mb-6" />
                  <span className="font-black text-[10px] text-main uppercase tracking-[0.4em]">Privacy Protocol</span>
                </motion.div>
                <AnimText as="h3" delay={0.4} className="font-bold text-4xl leading-none tracking-tight mb-6">
                  Structural Consent
                </AnimText>
                <MotionLine delay={0.2} className="w-12 h-1 bg-main mb-6" />
                <p className="opacity-50 font-medium text-sm leading-relaxed">
                  Architecture is more than just buildings; it is the space between data and human experience. Control your structural footprint below.
                </p>
              </div>

              <div className="mt-12">
                <div className="flex items-center gap-3 bg-text/5 border border-text/10 rounded-2xl p-4">
                  <Info size={20} className="text-main shrink-0" />
                  <p className="opacity-60 font-bold text-[10px] uppercase leading-normal tracking-wider">Secure Transmission Active</p>
                </div>
              </div>
            </div>

            {/* Right Panel - Controls */}
            <div className="overflow-y-auto flex-1 p-12 custom-scrollbar">
              <header className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="font-bold text-2xl tracking-tight mb-2">Privacy Setup</h3>
                  <p className="opacity-50 font-bold text-xs uppercase tracking-widest">Version 2.0.4 | Urbnlanes Internal</p>
                </div>
                <CloseBtn onClick={() => setOpen(false)} className="scale-125 static!" />
              </header>

              <div className="gap-4 grid grid-cols-1 mb-12">
                {cookieCategories.map((cat, i) => (
                  <CookieCategory key={i} {...cat} />
                ))}
              </div>

              <footer className="flex sm:flex-row flex-col items-center gap-6 border-text/10 border-t pt-12">
                <MainBtn onClick={handleAcceptAll} fullWidth size="lg" className="h-16 text-lg tracking-widest">
                  Architecture Approved
                </MainBtn>
                <button
                  onClick={handleSave}
                  className="w-full sm:w-auto font-black text-text/50 hover:text-main text-sm uppercase tracking-[0.3em] whitespace-nowrap transition-all duration-500 px-12 py-5"
                >
                  Save Settings
                </button>
              </footer>
            </div>

            {/* Abstract Background Elements */}
            <div className="top-[-10%] right-[-10%] -z-10 absolute w-96 h-96 bg-main/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="bottom-[-10%] left-[20%] -z-10 absolute w-96 h-96 bg-main/5 blur-[120px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(240, 238, 233, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(142, 142, 142, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(142, 142, 142, 0.4);
        }
      `}</style>
    </AnimatePresence>
  )
}
