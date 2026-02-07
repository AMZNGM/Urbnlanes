import { MotionLine } from '@/components/ui/effects/Lines'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function CareersAbout({ className, dark }: { className?: string; dark?: boolean }) {
  let careersData = (db as any).careers

  return (
    <section className={`relative w-dvw overflow-hidden px-4 max-md:px-2 py-24 ${dark ? 'bg-bg text-text' : 'bg-text text-bg'} ${className}`}>
      <AnimText as={'h2'} stagger={-0.005} className="text-[11.6dvw] text-center text-nowrap leading-[9.5dvw]! rtl:leading-77!">
        <TText tKey="careers.joinUrbnlanes" />
      </AnimText>
      <AnimText as={'h3'} stagger={0.05} delay={0.4} className="text-[3dvw] text-center leading-none rtl:leading-15 tracking-[0.5dvw] mb-12">
        <TText tKey="careers.tagline" />
      </AnimText>

      <AnimText as={'p'} delay={0.6} className="max-w-2xl opacity-70 normal-case text-balance ms-auto mb-15">
        {careersData?.description || 'Step into an environment built on support, integrity, and opportunity.'}
      </AnimText>

      <MotionLine />
    </section>
  )
}
