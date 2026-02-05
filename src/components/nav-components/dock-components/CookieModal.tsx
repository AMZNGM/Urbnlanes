'use client'

import { useContext, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { CookieContext } from '@/lib/CookieContext'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { Settings, Shield, Activity, Target, User, Lock } from 'lucide-react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import LetterSwap from '@/components/ui/text/LetterSwap'
import MainBtn from '@/components/ui/buttons/MainBtn'
import SwitchBtn from '@/components/ui/buttons/SwitchBtn'
import CloseTextBtn from '@/components/ui/buttons/CloseTextBtn'

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
    <div className="flex gap-2 bg-bg/15 hover:bg-bg/10 rounded-2xl transition-all duration-300 p-2">
      <div className={`p-4 rounded-2xl transition-all duration-300 ${checked ? 'bg-main/25 text-text ' : 'bg-text/10 text-bg'} `}>
        <Icon size={24} />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className={` text-lg tracking-tight ${checked ? 'text-text' : 'text-main'}`}>{title}</h4>

          {disabled ? (
            <div className="flex items-center gap-2 text-[10px] text-main tracking-widest">
              <Lock size={12} />
              Required
            </div>
          ) : (
            <SwitchBtn checked={checked} onChange={onChange!} />
          )}
        </div>

        <p className={`max-w-xl normal-case opacity-50 font-medium text-xs leading-relaxed ${checked ? 'text-text' : 'text-main'}`}>{description}</p>
      </div>
    </div>
  )
}

export default function CookieModal({
  showCookies,
  setShowCookies,
  isScrolled100vh,
}: {
  showCookies: boolean
  setShowCookies: (value: boolean) => void
  isScrolled100vh: boolean
}) {
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
    const handleshowCookiesSidebar = () => setShowCookies(true)
    window.addEventListener('showCookiesCookieModal', handleshowCookiesSidebar)
    return () => window.removeEventListener('showCookiesCookieModal', handleshowCookiesSidebar)
  }, [])

  let handleSave = () => {
    setCategory('analytics', local.analytics)
    setCategory('marketing', local.marketing)
    setCategory('preferences', local.preferences)
    setCategory('consentDate', new Date().toISOString())
    setShowCookies(false)
  }

  let handleAcceptAll = () => {
    acceptAll()
    setCategory('consentDate', new Date().toISOString())
    setShowCookies(false)
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

  useBodyScrollLock(showCookies)

  return (
    <>
      {/* toggle btn */}
      {!showCookies && (
        <AnimIn
          blur
          center
          duration={0.3}
          delay={0.1}
          once={false}
          key="cookie-orb"
          layoutId="cookie-ui"
          title="Cookies Sidebar"
          aria-label="Cookies Sidebar"
          onClick={() => setShowCookies(true)}
          className={`rounded-lg cursor-pointer shrink-0 ${isScrolled100vh ? '' : 'hidden'}`}
        >
          <LetterSwap text={<Settings size={20} className="z-10 mx-3 my-2" />} />
        </AnimIn>
      )}

      {/* dropdown */}
      {showCookies && (
        <motion.div
          layout={showCookies}
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 100 }}
          transition={{ type: 'spring', stiffness: 160, damping: 24, mass: 0.6 }}
          className={`max-w-3xl flex flex-col pointer-events-auto overflow-y-auto ${showCookies ? 'max-md:w-[80dvw]! flex-1' : 'w-fit'}`}
        >
          <header className="flex justify-between items-center mb-8 max-md:mb-4">
            <AnimText as={'h3'} delay={0.3} className="text-2xl tracking-wide">
              Privacy Setup
            </AnimText>
            <CloseTextBtn onClick={() => setShowCookies(false)} delay={0.15} />
          </header>

          <div className="space-y-4 max-md:space-y-1 mb-4">
            <p className="max-md:hidden opacity-50 rounded-2xl text-[10px] py-2">
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
      )}
    </>
  )
}
