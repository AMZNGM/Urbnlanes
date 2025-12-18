'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { CookieContext } from '@/contexts/CookieContext'

export default function CookieSidebar() {
  const { consent, setCategory, acceptAll, acceptOnlyNecessary } = useContext(CookieContext)
  const [open, setOpen] = useState(false)
  const [local, setLocal] = useState({ analytics: false, marketing: false, preferences: false })
  const buttonRef = useRef(null)
  const firstControlRef = useRef(null)

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
    if (open) {
      // focus the first control
      requestAnimationFrame(() => firstControlRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const toggle = () => setOpen((v) => !v)

  const handleSave = () => {
    // persist individual categories
    setCategory('analytics', local.analytics)
    setCategory('marketing', local.marketing)
    setCategory('preferences', local.preferences)
    setOpen(false)
    buttonRef.current?.focus()
  }

  const handleAcceptAll = () => {
    acceptAll()
    setOpen(false)
    buttonRef.current?.focus()
  }

  const handleOnlyNecessary = () => {
    acceptOnlyNecessary()
    setOpen(false)
    buttonRef.current?.focus()
  }

  return (
    <>
      <button
        ref={buttonRef}
        aria-expanded={open}
        aria-controls="cookie-sidebar"
        onClick={toggle}
        className="fixed z-50 bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-main text-white shadow-lg"
        title="Cookie preferences"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M5 7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <aside
          id="cookie-sidebar"
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-bg p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Cookie preferences</h3>
            <button onClick={() => setOpen(false)} aria-label="Close preferences" className="text-sm">
              Close
            </button>
          </div>

          <p className="mt-3 text-sm">Manage which cookies you allow. Necessary cookies are always enabled.</p>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Analytics</div>
                <div className="text-xs text-muted-foreground">Helps us understand usage and improve the site.</div>
              </div>
              <input
                ref={firstControlRef}
                aria-label="Enable analytics cookies"
                type="checkbox"
                checked={local.analytics}
                onChange={(e) => setLocal((s) => ({ ...s, analytics: e.target.checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Marketing</div>
                <div className="text-xs text-muted-foreground">Used to show relevant advertising.</div>
              </div>
              <input
                aria-label="Enable marketing cookies"
                type="checkbox"
                checked={local.marketing}
                onChange={(e) => setLocal((s) => ({ ...s, marketing: e.target.checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Preferences</div>
                <div className="text-xs text-muted-foreground">Remember choices like language or region.</div>
              </div>
              <input
                aria-label="Enable preferences cookies"
                type="checkbox"
                checked={local.preferences}
                onChange={(e) => setLocal((s) => ({ ...s, preferences: e.target.checked }))}
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 rounded bg-main px-3 py-2 text-white" onClick={handleSave}>
              Save preferences
            </button>

            <button className="rounded border px-3 py-2" onClick={handleAcceptAll}>
              Accept all
            </button>

            <button className="rounded border px-3 py-2" onClick={handleOnlyNecessary}>
              Only necessary
            </button>
          </div>
        </aside>
      )}
    </>
  )
}
