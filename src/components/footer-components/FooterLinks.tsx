import Link from 'next/link'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import LetterSwap from '@/components/ui/text/LetterSwap'
import { navigation } from '@/config/navigation.ui.json'

export default function FooterLinks() {
  return (
    <div className="w-full space-y-2">
      {navigation
        .flatMap((link) => (link.slug ? [link] : link.children || []))
        .filter((link) => link.slug)
        .map((link, index) => (
          <AnimIn blur spring key={index} delay={index * 0.1 + 0.2} className="space-y-2">
            <Link href={link.slug || ''} className="flex justify-end hover:text-text text-sm transition-all duration-300">
              <LetterSwap text={<TText tKey={link.name} />} />
            </Link>
          </AnimIn>
        ))}
    </div>
  )
}
