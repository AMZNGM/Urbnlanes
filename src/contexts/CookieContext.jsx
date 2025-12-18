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

export const CookieContext = createContext({})

export function CookieProvider({ children, onConsentChange } = {}) {
  const [consent, setConsent] = useState(DEFAULT_CONSENT)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    try {
      const saved = getJSONCookie(COOKIE_NAME)
      if (saved && typeof saved === 'object') {
        setConsent((prev) => ({ ...prev, ...saved }))
      }
    } catch (e) {
      // ignore parse errors
    } finally {
      setInitialized(true)
    }
  }, [])

  const persistConsent = useCallback(
    (nextConsent) => {
      setJSONConsent(nextConsent)
      if (typeof onConsentChange === 'function') onConsentChange(nextConsent)
    },
    [onConsentChange]
  )

  const setJSONConsent = (nextConsent) => {
    // persist for 1 year, secure in production
    setJSONCookie(COOKIE_NAME, nextConsent, {
      expiresDays: 365,
      secure: typeof window !== 'undefined' && location.protocol === 'https:',
      sameSite: 'Lax',
      path: '/',
    })
  }

  const acceptAll = useCallback(() => {
    const next = { necessary: true, analytics: true, marketing: true, preferences: true }
    setConsent(next)
    persistConsent(next)
  }, [persistConsent])

  const acceptOnlyNecessary = useCallback(() => {
    const next = { ...DEFAULT_CONSENT }
    setConsent(next)
    persistConsent(next)
  }, [persistConsent])

  const setCategory = useCallback(
    (key, value) => {
      setConsent((prev) => {
        const next = { ...prev, [key]: !!value }
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
