import TText from '@/translations/TText'
import db from '@/database/urbnlanes-db.json'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/text/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import Heading from '@/components/ui/Heading'
import MainBtn from '@/components/ui/buttons/MainBtn'
import ArrowIcon from '@/components/ui/icons/ArrowIcon'

export default function OurValues() {
  return (
    <section className="relative w-full h-full overflow-hidden flex flex-col justify-center gap-8 bg-black text-text px-4 py-4">
      <Heading text={<TText tKey="common.ourValues" />} />

      {db.whoweare.values.slice(0, 3).map((value, index) => (
        <div
          key={value.title}
          className={`h-60 max-md:h-120 flex max-md:flex-col justify-between items-center gap-8 ${index === 1 ? 'flex-row-reverse' : ''}`}
        >
          <div className="z-10 relative w-full h-full overflow-hidden rounded-2xl">
            <AnimIn delay={index * 0.1} className="relative w-full h-full bg-bg rounded-2xl">
              <ImageIn
                src={value.image}
                alt={value.title}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 40vw"
                className="rounded-2xl"
              />
            </AnimIn>
          </div>

          <div className="w-[90vw]">
            <AnimText as="h3" className="z-10 relative font-bold text-2xl mb-4">
              <TText tKey={`db.whoweare.values.${index}.title`} />
            </AnimText>

            <AnimText as="p" delay={0.3} className="z-10 relative text-sm">
              <TText tKey={`db.whoweare.values.${index}.description`} />
            </AnimText>

            <MainBtn href={`/about`} size="sm" icon={ArrowIcon} tKey="common.seeMore" className={`flex max-md:justify-end mt-12`} />
          </div>
        </div>
      ))}
    </section>
  )
}
