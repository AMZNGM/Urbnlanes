import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function ArtToArchitecture({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <section className={`relative w-dvw overflow-hidden px-4 max-md:px-2 max-md:py-8 py-34 ${className} ${dark ? 'bg-bg text-text' : 'bg-text text-bg'}`}>
      <div className="w-full h-full gap-3 max-md:space-y-12 md:grid md:grid-cols-3 ms-auto xl:ps-55">
        <div className="w-full h-full flex flex-col gap-3 max-md:text-center">
          <AnimText className="text-4xl capitalize">
            <TText tKey="db.whoweare.artToArchitecture.title" />
          </AnimText>

          <AnimText className="md:max-w-[80%] opacity-45 normal-case text-balance">
            <TText tKey="db.whoweare.artToArchitecture.description" />
          </AnimText>
        </div>

        <ImageIn
          src="/images/projects/yellow-residence/yr-gallery-6.webp"
          alt="Art To Architecture"
          className="scale-100!"
          divClassName="w-full aspect-21/9 overflow-hidden rounded-lg col-span-2"
        />
      </div>
    </section>
  )
}
