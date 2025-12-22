import { ChevronDown } from 'lucide-react'
import Indicator from '@/components/ui/effects/Indicator'

export default function LanguageSelector({ navbarData, className = '' }) {
  const { languages = [], selectedLanguage, handleLanguageChange, languageSelectorOpen, setLanguageSelectorOpen, isClient } = navbarData

  if (!languages || languages.length === 0) {
    return null
  }

  return (
    <div className={`relative h-full ${className}`}>
      <div onClick={() => setLanguageSelectorOpen(!languageSelectorOpen)} className="relative h-full">
        <Indicator className="relative h-full flex justify-center items-center cursor-pointer gap-1 p-4">
          <span className={'z-10'}>{isClient ? selectedLanguage : 'English'}</span>
          <ChevronDown strokeWidth={1.5} className={`size-4 ${languageSelectorOpen ? 'rotate-180' : ''} duration-300`} />
        </Indicator>
      </div>

      <div
        className={`absolute top-full left-0 bg-bg/75 border border-text/5 backdrop-blur-xl shadow-2xl rounded-sm duration-300 z-50
            ${
              languageSelectorOpen ? 'opacity-100 translate-y-0.5 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'
            }`}
      >
        {languages.map((language, index) => (
          <button
            key={index}
            onClick={() => {
              handleLanguageChange(language)
              setLanguageSelectorOpen(false)
            }}
            className={`relative w-full text-left cursor-pointer duration-200 py-3 px-4 ${
              isClient && selectedLanguage === language.name ? 'text-main bg-main/10 hover:bg-main/15' : 'hover:bg-text/10'
            }`}
          >
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
