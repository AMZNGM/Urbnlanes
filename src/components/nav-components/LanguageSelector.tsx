import { NavbarTypes } from '@/types/nav'
import { ChevronDown } from 'lucide-react'
import Indicator from '@/components/ui/effects/Indicator'

export default function LanguageSelector({ navbarData, className = '' }: { navbarData: NavbarTypes; className?: string }) {
  let { languages = [], selectedLanguage, handleLanguageChange, languageSelectorOpen, setLanguageSelectorOpen, isClient } = navbarData

  if (!languages || languages.length === 0) {
    return null
  }

  return (
    <div title="Language selector" className={`relative h-full ${className}`}>
      <div onClick={() => setLanguageSelectorOpen(!languageSelectorOpen)} className="relative h-full">
        <Indicator className="relative h-full flex justify-center items-center gap-1 p-4 cursor-pointer">
          <span className={'z-10'}>{isClient ? selectedLanguage : 'English'}</span>
          <ChevronDown strokeWidth={1.5} className={`size-4 ${languageSelectorOpen ? 'rotate-180' : ''} duration-300`} />
        </Indicator>
      </div>

      <div
        className={`absolute top-full left-0 bg-bg/85 border backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden duration-300 z-50
            ${languageSelectorOpen ? 'opacity-100 translate-y-0.5 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        {languages.map((language, index) => (
          <button
            key={index}
            onClick={() => {
              handleLanguageChange(language)
              setLanguageSelectorOpen(false)
            }}
            className={`relative w-full text-left hover:bg-main/25 cursor-pointer duration-300 font-arab py-3 px-4 ${
              isClient && selectedLanguage === language.name ? 'bg-main/15' : 'text-text/70 hover:text-text'
            }`}
          >
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
