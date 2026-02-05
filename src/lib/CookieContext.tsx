'use client'

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { getJSONCookie, setJSONCookie } from '@/lib/cookies'

const COOKIE_NAME = 'site_consent_v1'
const DEFAULT_CONSENT = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

export type Consent = typeof DEFAULT_CONSENT & {
  consentDate?: string
}

export interface CookieContextType {
  consent: Consent
  setCategory: (key: string, value: boolean | string) => void
  acceptAll: () => void
  acceptOnlyNecessary: () => void
  initialized: boolean
}

export const CookieContext = createContext<CookieContextType | undefined>(undefined)

export interface CookieProviderProps {
  children: React.ReactNode
  onConsentChange?: (consent: Consent) => void
}

export function CookieProvider({ children, onConsentChange }: CookieProviderProps) {
  const [consent, setConsent] = useState<Consent>(DEFAULT_CONSENT)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    try {
      const saved = getJSONCookie(COOKIE_NAME)
      if (saved && typeof saved === 'object') {
        setConsent((prev) => ({ ...prev, ...saved }))
      }
    } catch (e) {
    } finally {
      setInitialized(true)
    }
  }, [])

  const persistConsent = useCallback(
    (nextConsent: Consent) => {
      setJSONConsent(nextConsent)
      if (typeof onConsentChange === 'function') onConsentChange(nextConsent)
    },
    [onConsentChange]
  )

  const setJSONConsent = (nextConsent: Consent) => {
    setJSONCookie(COOKIE_NAME, nextConsent, {
      expiresDays: 365,
      secure: typeof window !== 'undefined' && location.protocol === 'https:',
      sameSite: 'Lax',
      path: '/',
    })
  }

  const acceptAll = useCallback(() => {
    const next = { necessary: true, analytics: true, marketing: true, preferences: true, consentDate: new Date().toISOString() }
    setConsent(next)
    persistConsent(next)
  }, [persistConsent])

  const acceptOnlyNecessary = useCallback(() => {
    const next = { ...DEFAULT_CONSENT, consentDate: new Date().toISOString() }
    setConsent(next)
    persistConsent(next)
  }, [persistConsent])

  const setCategory = useCallback(
    (key: string, value: boolean | string) => {
      setConsent((prev: Consent) => {
        const next = { ...prev, [key]: value }
        persistConsent(next)
        return next
      })
    },
    [persistConsent]
  )

  const value = useMemo(
    () => ({ consent, setCategory, acceptAll, acceptOnlyNecessary, initialized }),
    [consent, setCategory, acceptAll, acceptOnlyNecessary, initialized]
  )

  return <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
}
