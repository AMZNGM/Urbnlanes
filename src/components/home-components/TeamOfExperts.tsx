import Image from 'next/image'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function TeamOfExperts() {
  return (
    <section className="relative w-full h-full overflow-hidden bg-black text-text px-18 max-md:px-4 py-8">
      {/* <Heading text={<TText tKey="db.whoweare.teamOfExperts.title" />} /> */}

      <div className="w-full flex flex-col justify-center items-center gap-24 mt-18">
        <div className="w-full items-center gap-12 grid md:grid-cols-2">
          <AnimIn className="relative w-full h-96 overflow-hidden">
            <ImageIn
              src="/images/team/emeel-abdalla.webp"
              alt="Award winning property"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain!"
            />
          </AnimIn>

          <div className="flex flex-col gap-8">
            <AnimText as="span" className="w-fit border border-main/60! rounded-2xl text-xs tracking-wider p-4">
              <TText tKey="db.whoweare.teamOfExperts.subtitle" />
            </AnimText>

            <AnimText as="p" className="max-w-xl normal-case text-balance leading-relaxed">
              <TText tKey="db.whoweare.teamOfExperts.description" />
            </AnimText>

            <div className="flex justify-between md:gap-8 text-main">
              {[0, 3, 4].map((index, i) => (
                <div key={index} className="flex justify-between md:gap-8">
                  <div className="flex flex-col justify-between gap-1 text-center">
                    <AnimText className="font-sec">
                      <TText tKey={`db.whoweare.statistics.${index}.title`} />
                    </AnimText>

                    <AnimText>
                      <TText tKey={`db.whoweare.statistics.${index}.value`} />
                    </AnimText>
                  </div>
                  {i < 2 && <div className="max-md:hidden w-px h-full bg-main/30" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <blockquote className="max-w-3xl font-sec md:text-main text-xl md:text-2xl text-center italic text-balance">
          <AnimText delay={0.5} stagger={0.009} as="span">
            &ldquo;
          </AnimText>
          <AnimText delay={0.5} stagger={0.009} as="span">
            <TText tKey="db.whoweare.values.3.description" />
          </AnimText>
          <AnimText delay={0.5} stagger={0.009} as="span">
            &ldquo;
          </AnimText>
        </blockquote>

        <div className="flex items-center gap-4 border px-8 py-4">
          <div className="w-12 h-12 flex justify-center items-center border">
            <div className="w-6 h-6 border rotate-45" />
          </div>

          <Image src="/images/logos/urbnlanes-logo.webp" alt="Urbnlanes logo" sizes="15vw" width={100} height={100} className="size-auto object-contain" />
        </div>
      </div>
    </section>
  )
}
