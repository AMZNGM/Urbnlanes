import { useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { TRANSLATIONS } from '@/translations/translations'

const LANGUAGE_MAP = {
  English: 'en',
  العربية: 'ar',
}

export function useTranslation() {
  const languageContext = useLanguage()

  if (!languageContext) {
    console.warn('useLanguage returned undefined. Make sure LanguageProvider is properly set up.')
    return {
      t: (key) => key,
      currentLanguage: 'en',
    }
  }

  const { selectedLanguage } = languageContext
  const langCode = LANGUAGE_MAP[selectedLanguage] || 'en'
  const translations = TRANSLATIONS[langCode] || TRANSLATIONS.en

  const t = useMemo(
    () =>
      (key, params = {}) => {
        if (!key) return ''

        // Support dot notation: 'nav.home' -> translations.nav.home
        const keys = key.split('.')
        let value = translations

        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k]
          } else {
            return key
          }
        }

        // Support for objects/arrays
        if (typeof value !== 'string' && typeof value !== 'object') {
          return key
        }

        if (typeof value === 'object') {
          return value
        }

        // Simple interpolation: replace {{key}} with params[key]
        return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
          return params[paramKey] !== undefined ? String(params[paramKey]) : match
        })
      },
    [translations]
  )

  return {
    t,
    currentLanguage: langCode,
    selectedLanguage,
  }
}
