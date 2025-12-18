import { ChevronDown, GlobeIcon } from 'lucide-react'

export default function MobileLanguageSelector({ navbarData }) {
  const { selectedLanguage, handleLanguageChange, languageSelectorOpen, setLanguageSelectorOpen, languages = [] } = navbarData

  if (!languages.length) return null

  return (
    <div className="w-full absolute bottom-0 max-sm:bottom-16 left-0 bg-bg/20 border-t border-text/15 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setLanguageSelectorOpen(!languageSelectorOpen)}
        className="w-full flex justify-between items-center hover:bg-text/5 cursor-pointer select-none duration-300 py-8 px-6"
      >
        <div className="w-full flex items-center gap-6 font-medium">
          <GlobeIcon strokeWidth={1.8} className="size-5 text-text/60" />
          {selectedLanguage}
        </div>
        <ChevronDown strokeWidth={1.5} className={`size-7 duration-300 transition-transform ${languageSelectorOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute bottom-full left-0 right-0 bg-bg/20 backdrop-blur-xl border border-text/10 rounded-sm shadow-2xl overflow-hidden mb-2 mx-4 transition-all duration-300 ${
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
            className={`relative w-full text-left hover:bg-text/10 cursor-pointer duration-200 px-4 py-3 ${
              selectedLanguage === language.name ? 'text-main bg-main/10' : 'text-text/70 hover:text-text'
            }`}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  )
}
