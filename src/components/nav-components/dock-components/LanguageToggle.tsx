import { Languages } from 'lucide-react'
import { useLanguage } from '@/translations/LanguageContext'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import LetterSwap from '@/components/ui/text/LetterSwap'

export default function LanguageToggle({ className }: { className?: string }) {
  const { languages, selectedLanguage, handleLanguageChange } = useLanguage()
  const otherLanguage = languages.find((l) => l.name !== selectedLanguage)

  return (
    <AnimIn
      as={'button'}
      blur
      center
      duration={0.2}
      delay={0.2}
      once={false}
      title="Switch language"
      aria-label="Switch language"
      onClick={() => otherLanguage && handleLanguageChange(otherLanguage)}
      className={`rounded-lg cursor-pointer shrink-0 ${className}`}
    >
      <LetterSwap
        text={
          <span className="flex justify-center items-center gap-1.5 font-mono text-xs m-2">
            <Languages size={16} />
            {selectedLanguage === 'English' ? 'EN' : 'AR'}
          </span>
        }
      />
    </AnimIn>
  )
}
