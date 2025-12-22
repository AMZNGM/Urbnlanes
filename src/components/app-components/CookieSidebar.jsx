'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { CookieContext } from '@/contexts/CookieContext'
import { Settings, ChevronDown, Shield, Activity, Target, User } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import MainBtn from '@/components/ui/buttons/MainBtn'

const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
  <label className={`relative inline-flex items-center cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} disabled={disabled} />
    <span className={`w-10 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-main' : 'bg-text/20'}`} />
    <span
      className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
        checked ? 'translate-x-4' : 'translate-x-0'
      }`}
    />
  </label>
)

const CookieCategory = ({ title, description, icon: Icon, checked, onChange, disabled = false, details = null }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <li className="hover:bg-text/5 border border-text/10 rounded-lg duration-300 cursor-pointer p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-4">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-main" />
            <p className={`text-sm font-medium ${showDetails ? 'text-main' : ''}`}>{title}</p>
            {details && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDetails(!showDetails)
                }}
                className="text-text/60 hover:text-main transition-colors"
                aria-label="Show details"
              >
                <ChevronDown className={`w-4 h-4 cursor-pointer transition-transform ${showDetails ? 'rotate-180 text-main' : ''}`} />
              </button>
            )}
          </div>
          <p className="text-xs opacity-70 mt-1 lowercase">{description}</p>

          {showDetails && details && (
            <div className="mt-3 p-3 bg-text/5 text-xs lowercase">
              <p className="font-medium mb-2">Cookies used:</p>
              <ul className="space-y-1">
                {details.cookies?.map((cookie, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="font-mono">{cookie.name}</span>
                    <span className="opacity-70">{cookie.purpose}</span>
                  </li>
                ))}
              </ul>
              {details.retention && (
                <p className="mt-2 opacity-70">
                  <strong>Retention:</strong> {details.retention}
                </p>
              )}
            </div>
          )}
        </div>

        {disabled ? (
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-70">Always On</span>
            <input type="checkbox" checked disabled className="accent-current cursor-not-allowed" />
          </div>
        ) : (
          <ToggleSwitch checked={checked} onChange={onChange} disabled={disabled} />
        )}
      </div>
    </li>
  )
}

export default function CookieSidebar() {
  const buttonRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { consent, setCategory, acceptAll, acceptOnlyNecessary } = useContext(CookieContext)
  const [local, setLocal] = useState({ analytics: false, marketing: false, preferences: false })

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
    const onKey = (e) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const toggle = () => setOpen((v) => !v)

  const handleSave = async () => {
    try {
      setCategory('analytics', local.analytics)
      setCategory('marketing', local.marketing)
      setCategory('preferences', local.preferences)
      setOpen(false)
      buttonRef.current?.focus()
    } catch (error) {
      console.error('Failed to save preferences:', error)
    }
  }

  const handleAcceptAll = () => {
    acceptAll()
    setCategory('consentDate', new Date().toISOString())
    setOpen(false)
    buttonRef.current?.focus()
  }

  const handleRejectAll = () => {
    setCategory('analytics', false)
    setCategory('marketing', false)
    setCategory('preferences', false)
    setCategory('consentDate', new Date().toISOString())
    setOpen(false)
    buttonRef.current?.focus()
  }

  const cookieCategories = [
    {
      title: 'Strictly Necessary Cookies',
      description: 'Required for core site features (security, network management, accessibility). These are always on.',
      icon: Shield,
      checked: true,
      disabled: true,
      details: {
        cookies: [
          { name: 'site_consent_v1', purpose: 'Consent preferences' },
          { name: 'session_id', purpose: 'Session management' },
        ],
        retention: 'Session / 1 year',
      },
    },
    {
      title: 'Analytics Cookies',
      description: 'Help us understand site usage and improve speed and reliability (e.g., aggregate analytics).',
      icon: Activity,
      checked: local.analytics,
      onChange: (e) => setLocal((s) => ({ ...s, analytics: e.target.checked })),
      details: {
        cookies: [
          { name: '_ga', purpose: 'Google Analytics' },
          { name: '_gid', purpose: 'Google Analytics' },
        ],
        retention: '2 years',
      },
    },
    {
      title: 'Marketing Cookies',
      description: 'Used to deliver content and ads more relevant to you and your interests.',
      icon: Target,
      checked: local.marketing,
      onChange: (e) => setLocal((s) => ({ ...s, marketing: e.target.checked })),
      details: {
        cookies: [
          { name: '_fbp', purpose: 'Facebook Pixel' },
          { name: 'ads_preferences', purpose: 'Ad personalization' },
        ],
        retention: '3 months',
      },
    },
    {
      title: 'Preferences Cookies',
      description: 'Enable enhanced features and personalization, such as remembering choices and preferences.',
      icon: User,
      checked: local.preferences,
      onChange: (e) => setLocal((s) => ({ ...s, preferences: e.target.checked })),
      details: {
        cookies: [
          { name: 'user_preferences', purpose: 'User settings' },
          { name: 'language', purpose: 'Language preference' },
        ],
        retention: '1 year',
      },
    },
  ]

  return (
    <AnimatePresence>
      <motion.button
        key="cookie-settings-button"
        ref={buttonRef}
        aria-expanded={open}
        aria-controls="cookie-sidebar"
        title="Cookie preferences"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.2, stiffness: 100 }}
        onClick={toggle}
        className="w-10 h-10 fixed bottom-4 left-4 flex justify-center items-center rounded-full shadow-lg bg-bg text-main hover:text-bg hover:bg-main transition-colors cursor-pointer z-50"
      >
        <Settings />
      </motion.button>

      {open && (
        <motion.div
          key="cookie-sidebar-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50"
          onClick={() => setOpen(false)}
        >
          <motion.aside
            key="cookie-sidebar"
            id="cookie-sidebar"
            role="dialog"
            aria-label="Cookie preferences"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 h-full max-w-md bg-bg shadow-2xl flex flex-col z-50"
          >
            <header className="flex justify-between items-center px-5 py-4 border-b border-text/10">
              <div className="flex items-center gap-2">
                <Settings size={20} className="text-main" />
                <h3 className="text-xl font-semibold">Privacy Preferences Center</h3>
              </div>
              <CloseBtn onClick={() => setOpen(false)} className="top-2!" />
            </header>

            <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1">
              <section className="text-xs bg-text/5 opacity-75 rounded-lg p-4">
                <p>
                  When you use the Urbnlanes website, certain information may be stored or retrieved in your browser, mainly through
                  cookies. This data can relate to your device, settings, or general usage and helps the site work as intended. It usually
                  doesn't directly identify you, but it enables a more tailored experience.
                </p>
              </section>

              <section>
                <h3 className="text-base mb-4">Manage Consent Preferences</h3>
                <ul className="space-y-4">
                  {cookieCategories.map((category, index) => (
                    <CookieCategory key={index} {...category} />
                  ))}
                </ul>
              </section>
            </div>

            <footer className="border-t border-text/10 p-4">
              <div className="flex gap-2">
                <MainBtn onClick={handleSave} size="sm" className="bg-main hover:bg-main/75 text-nowrap">
                  Save preferences
                </MainBtn>
                <MainBtn onClick={handleAcceptAll} size="sm" className="bg-main hover:bg-main/75 text-nowrap">
                  Accept all
                </MainBtn>
                <MainBtn onClick={handleRejectAll} size="sm" className="bg-main hover:bg-main/75 text-nowrap">
                  Reject all
                </MainBtn>
              </div>
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
