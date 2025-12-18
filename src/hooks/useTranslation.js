import { useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { TRANSLATIONS } from '@/translations/translations'

const LANGUAGE_MAP = {
  English: 'en',
  العربية: 'ar',
}

/**
 * Professional translation hook with namespace support and interpolation
 * @example
 * const { t } = useTranslation()
 * t('nav.home') // Returns translated text
 * t('common.search', { count: 5 }) // With interpolation
 */
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

  /**
   * Translation function with namespace support
   * @param {string} key - Translation key (supports dot notation: 'nav.home')
   * @param {object} params - Optional parameters for interpolation
   * @returns {string} Translated text
   */
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
            // Fallback to key if translation not found
            return key
          }
        }

        // If value is not a string, return key
        if (typeof value !== 'string') {
          return key
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
