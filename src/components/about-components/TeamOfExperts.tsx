import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function TeamOfExperts({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <section className={`relative w-dvw ${dark ? 'bg-bg text-text' : 'bg-text text-bg'} px-4 max-md:px-2 pb-28 ${className}`}>
      <div className="items-center gap-4 grid md:grid-cols-5">
        <ImageIn
          src="/images/team/emeel-abdalla.webp"
          alt="Award winning property"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain!"
          divClassName="h-96! max-md:mb-12 bg-text! md:col-span-2"
          data-scroll
          data-scroll-speed="0.1"
        />

        <div className="flex flex-col gap-8 md:col-span-3">
          <AnimText as="span" className="w-fit border border-main/60! rounded-lg text-xs leading-none tracking-wider p-4">
            <TText tKey="db.whoweare.teamOfExperts.subtitle" />
          </AnimText>

          <AnimText as="p" className="max-w-xl normal-case text-balance leading-relaxed">
            <TText tKey="db.whoweare.teamOfExperts.description" />
          </AnimText>
        </div>
      </div>
    </section>
  )
}
