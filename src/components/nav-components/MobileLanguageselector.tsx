import { useState, useEffect } from 'react'
import { NavbarData } from '@/types/nav'
import { ChevronDown, GlobeIcon } from 'lucide-react'

export default function MobileLanguageSelector({ navbarData }: { navbarData: NavbarData }) {
  const { selectedLanguage, handleLanguageChange, languageSelectorOpen, setLanguageSelectorOpen, languages = [] } = navbarData
  const [isClient, setIsClient] = useState(false)
  const [displayLanguage, setDisplayLanguage] = useState('English')

  useEffect(() => {
    setIsClient(true)
    setDisplayLanguage(selectedLanguage)
  }, [selectedLanguage])

  if (!languages.length) return null

  return (
    <div className="bottom-0 absolute w-full border-text/15 border-t">
      <button
        type="button"
        onClick={() => setLanguageSelectorOpen(!languageSelectorOpen)}
        className="w-full flex justify-between items-center hover:bg-text/5 uppercase transition-colors px-4 py-6 cursor-pointer select-none"
      >
        <div className="w-full flex items-center gap-6 font-medium">
          <GlobeIcon size={20} className="size-5 text-text/60" />
          {isClient ? displayLanguage : 'English'}
        </div>
        <ChevronDown size={20} className={`duration-300 ${languageSelectorOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute bottom-full w-full border border-text/10 transition-all flex justify-center items-center my-2 ${
          languageSelectorOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        {languages.map((language, index) => (
          <button
            key={index}
            onClick={() => {
              handleLanguageChange(language)
              setLanguageSelectorOpen(false)
            }}
            className={`relative w-full text-left hover:bg-text/5 cursor-pointer transition-colors uppercase px-4 py-3 font-arab ${
              isClient && selectedLanguage === language.name ? 'bg-text/10' : 'text-text/70 hover:text-text'
            }`}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  )
}
