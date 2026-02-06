import Link from 'next/link'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function OurValuesAccordion() {
  return (
    <div className="relative w-full max-w-7xl min-h-[68dvh] flex flex-col justify-center gap-14 max-md:gap-18 bg-bg text-text mx-auto">
      <AnimText as={'h3'} className="text-2xl capitalize">
        <TText tKey="common.ourValues" />
      </AnimText>

      <div className="group flex max-md:flex-col justify-center items-center gap-3 max-md:gap-28">
        {db.whoweare.values.map((item, index: number) => {
          return (
            <Link
              key={index}
              href="/about"
              className="group/article relative w-full md:not-[&:hover]:group-hover:w-[20%] transition-all duration-300 ease-[cubic-bezier(.68,.5,.58,.7)] cursor-pointer"
            >
              <div className="-bottom-10 absolute w-full text-center">
                <h1 className="md:opacity-0 group-focus-within/article:opacity-100 group-hover/article:opacity-100 text-sm transition md:translate-y-2 group-focus-within/article:translate-y-0 group-hover/article:translate-y-0 duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-focus-within/article:delay-300 group-hover/article:delay-300 md:textspace-nowrap">
                  <TText tKey={`db.whoweare.values.${index}.description`} />
                </h1>
              </div>

              <div className="-top-7 absolute w-full text-center">
                <h1 className="md:opacity-0 group-focus-within/article:opacity-100 group-hover/article:opacity-100 text-xl transition md:translate-y-2 group-focus-within/article:translate-y-0 group-hover/article:translate-y-0 duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-focus-within/article:delay-300 group-hover/article:delay-300 md:textspace-nowrap">
                  <TText tKey={`db.whoweare.values.${index}.title`} />
                </h1>
              </div>

              <ImageIn
                src={item.image}
                alt={item.title}
                className="scale-100!"
                divClassName="w-full max-md:h-[32dvh] md:h-[50dvh] rounded-2xl overflow-hidden"
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
