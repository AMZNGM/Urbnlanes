'use client'

import { createContext, useState, useContext, useEffect, useCallback } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const LANGUAGES = [
  { name: 'English', code: 'en' },
  { name: 'العربية', code: 'ar' },
]

const STORAGE_KEY = 'urbnlanes-language'
const DEFAULT_LANGUAGE = LANGUAGES[0]

export const LanguageProvider = ({ children }) => {
  // Initialize from localStorage or default
  const [selectedLanguage, setSelectedLanguageState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE.name
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored || DEFAULT_LANGUAGE.name
  })

  // Persist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, selectedLanguage)
      // Update HTML lang attribute
      document.documentElement.lang = selectedLanguage === 'English' ? 'en' : 'ar'
      // Update HTML dir attribute for RTL
      document.documentElement.dir = selectedLanguage === 'العربية' ? 'rtl' : 'ltr'
    }
  }, [selectedLanguage])

  const handleLanguageChange = useCallback((language) => {
    setSelectedLanguageState(language.name)
  }, [])

  const value = {
    languages: LANGUAGES,
    selectedLanguage,
    handleLanguageChange,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
