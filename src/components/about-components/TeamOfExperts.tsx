import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function TeamOfExperts() {
  return (
    <section className="relative w-full h-full overflow-hidden bg-bg text-text mt-18 px-4 max-md:px-2 py-20">
      <div className="items-center gap-4 grid md:grid-cols-2">
        <ImageIn
          src="/images/team/emeel-abdalla.webp"
          alt="Award winning property"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain!"
          divClassName="h-96! max-md:mb-12"
        />

        <div className="flex flex-col gap-8">
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
