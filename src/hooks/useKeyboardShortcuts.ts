'use client'

import { useEventListener } from 'usehooks-ts'
import { useLanguage } from '@/translations/LanguageContext'

export function useKeyboardShortcuts({
  onEscape,
  onSearchToggle,
}: {
  onEscape?: () => void
  onSearchToggle?: () => void
} = {}) {
  let { handleLanguageChange, selectedLanguage } = useLanguage()

  useEventListener('keydown', (e: KeyboardEvent) => {
    // Escape Key - Close active UI
    if (e.key === 'Escape') {
      onEscape?.()
    }

    // Meta + K - Toggle Search
    if (e.metaKey && e.key === 'k') {
      e.preventDefault()
      onSearchToggle?.()
    }

    // Shift + cmd - Toggle Language
    if (e.key === 'Shift' && e.metaKey) {
      e.preventDefault()
      handleLanguageChange(selectedLanguage === 'English' ? { name: 'العربية' } : { name: 'English' })
    }
  })
}
