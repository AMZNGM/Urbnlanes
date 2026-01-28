'use client'

import { useState, useEffect } from 'react'
import { NavbarTypes } from '@/types/nav'
import { ChevronDown, GlobeIcon } from 'lucide-react'

export default function MobileLanguageSelector({ navbarData }: { navbarData: NavbarTypes }) {
  let { setLanguageSelectorOpen, languageSelectorOpen, handleLanguageChange, selectedLanguage, languages = [], isClient } = navbarData
  let [displayLanguage, setDisplayLanguage] = useState('English')

  useEffect(() => {
    setDisplayLanguage(selectedLanguage)
  }, [selectedLanguage])

  if (!languages.length) return null

  return (
    <div className="z-10 relative bg-bg border-t">
      <button
        onClick={() => setLanguageSelectorOpen(!languageSelectorOpen)}
        className="w-full flex justify-between items-center hover:bg-main/25 uppercase transition-colors p-6 cursor-pointer select-none"
      >
        <div className="w-full flex items-center gap-4 font-medium">
          <GlobeIcon size={20} className="text-text/75" />
          {displayLanguage}
        </div>

        <ChevronDown size={20} className={`duration-300 ${languageSelectorOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute bottom-full w-full bg-bg border transition-all flex justify-center items-center  ${languageSelectorOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
        {languages.map((language, index) => (
          <button
            key={index}
            onClick={() => {
              handleLanguageChange(language)
              setLanguageSelectorOpen(false)
            }}
            className={`relative w-full text-left hover:bg-text/5 cursor-pointer transition-colors uppercase px-4 py-3 font-arab ${isClient && selectedLanguage === language.name ? 'bg-text/10' : 'text-text/70 hover:text-text'}`}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  )
}
