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
      t: (key: string): any => key,
      currentLanguage: 'en',
    }
  }

  const { selectedLanguage } = languageContext
  const langCode = (LANGUAGE_MAP[selectedLanguage as keyof typeof LANGUAGE_MAP] || 'en') as keyof typeof TRANSLATIONS
  const translations = TRANSLATIONS[langCode] || TRANSLATIONS.en

  const t = useMemo(
    () =>
      (key: string, params = {}): any => {
        if (!key) return ''

        // Support dot notation: 'nav.home' -> translations.nav.home
        // Normalize array indexing [0] to .0
        const keys = key.replace(/\[(\d+)\]/g, '.$1').split('.')
        let value = translations

        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = (value as any)[k]
          } else {
            return key
          }
        }

        // Support objects and arrays
        if (typeof value !== 'string' && typeof value !== 'object') {
          return key
        }

        if (typeof value === 'object') {
          return value
        }

        // replace {{key}} with params[key]
        return (value as string).replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
          const paramValue = (params as Record<string, any>)[paramKey]
          return paramValue !== undefined ? String(paramValue) : match
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
