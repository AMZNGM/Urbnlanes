import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function CareersAbout({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <section className={`relative w-dvw overflow-hidden px-4 max-md:px-2 py-24 ${dark ? 'bg-bg text-text' : 'bg-text text-bg'} ${className}`}>
      <AnimText as={'h3'} stagger={0.05} delay={0.4} className="text-[1dvw] max-lg:text-sm text-center leading-none rtl:leading-15 tracking-[0.5dvw]">
        <TText tKey="careers.tagline" />
      </AnimText>

      <AnimText as={'p'} delay={0.6} className="max-md:max-w-sm opacity-50 text-sm text-center normal-case text-balance mx-auto">
        <TText tKey="careers.description" />
      </AnimText>
    </section>
  )
}
