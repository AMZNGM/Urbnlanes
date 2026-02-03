import { ChevronUp } from 'lucide-react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import LetterSwap from '@/components/ui/text/LetterSwap'

export default function ScrollToTopBtn({ className = '' }) {
  return (
    <AnimIn
      blur
      center
      duration={0.2}
      delay={0.3}
      once={false}
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`rounded-lg cursor-pointer shrink-0 ${className}`}
    >
      <LetterSwap text={<ChevronUp size={24} className="z-10 mx-2 my-1" />} />
    </AnimIn>
  )
}
