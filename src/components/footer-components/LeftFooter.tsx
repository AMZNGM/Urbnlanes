import Link from 'next/link'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import LetterSwap from '@/components/ui/text/LetterSwap'
import Newsletter from '@/components/footer-components/Newsletter'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function LeftFooter() {
  return (
    <div className="w-full space-y-4 max-md:grid text-xs normal-case">
      <div className="max-md:order-2 opacity-75">
        <AnimIn toDown spring as={'p'} delay={0.1}>
          <TText tKey={`footer.taxreg`} />
          {db.metadata.company.taxreg}
        </AnimIn>

        <AnimText as={'p'} delay={0.4}>
          <TText tKey={`footer.copyright`} />
        </AnimText>

        <AnimText as={'p'} delay={0.5}>
          <TText tKey="db.metadata.company.parentCompany" />
        </AnimText>

        <AnimIn as={'p'} blur center spring delay={0.3}>
          © <TText tKey={`db.metadata.company.name`} /> {new Date().getFullYear()}
        </AnimIn>
      </div>

      <div className="flex max-md:flex-col gap-4 max-md:order-1">
        {Object.entries(db.contact.socialMedia).map(([platform, url], index) => (
          <AnimIn blur center spring delay={index * 0.1 + 0.2} key={platform}>
            <Link href={url} target="_blank" rel="noopener noreferrer" aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}>
              <LetterSwap text={platform.charAt(0).toUpperCase() + platform.slice(1)} className="hover:text-text transition-colors" />
            </Link>
          </AnimIn>
        ))}
      </div>

      <div className="max-md:order-3">
        <Newsletter />
      </div>
    </div>
  )
}
