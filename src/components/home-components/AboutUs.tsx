'use client'

import { Plus } from 'lucide-react'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import LineHeading from '@/components/shared/LineHeading'
import NumberTicker from '@/components/ui/text/NumberTicker'

export default function AboutUs() {
  let stats = db.whoweare.statistics

  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-bg text-text px-4 max-md:px-2 py-12">
      <LineHeading tKey="common.aboutUs" paraTKey="db.whoweare.tagline" lineFrom="center" className="mt-14 mb-8" />

      {/* tagline */}
      <AnimIn blur center delay={0.5} className="ltr:-right-20 max-md:right-0 rtl:-left-20 absolute border rounded-lg mb-8 px-8 py-4">
        <AnimText delay={1} className="text-main text-xs rtl:leading-5 tracking-[0.3vw]">
          <TText tKey={'db.metadata.company.tagline'} />
        </AnimText>
      </AnimIn>

      {/* description */}
      <AnimIn delay="0.6" className="max-w-7xl ms-auto mb-12">
        <AnimText as="p" delay={1} stagger={0.01} className="max-md:text-sm normal-case leading-relaxed">
          <TText tKey={'db.whoweare.description'} />
        </AnimText>

        <a href="tel:+15061" className="flex items-center gap-1 text-main hover:text-text text-xs hover:text-sm italic transition-all duration-700 mt-4">
          <div className="w-8 h-px bg-main" />
          <TText tKey={'common.hotline'} />
          <span className="px-px">:</span>
          <TText tKey={'db.metadata.company.hotline'} />
        </a>
      </AnimIn>

      {/* stats */}
      <div className="relative flex max-md:flex-col justify-between gap-8 border rounded-lg p-8">
        {Array.isArray(stats) &&
          stats.map((stat: any, index: number) => (
            <div key={index} className="border-l font-light pl-6">
              <div className="flex text-[2vw] max-lg:text-[5vw]">
                <NumberTicker value={stat.value} />
                <Plus size={20} />
              </div>

              <AnimText as="h3" delay={index * 0.1} className="text-[1vw] max-md:text-[3vw] max-lg:text-[1.7vw] tracking-wide mt-2 light">
                <TText tKey={`db.whoweare.statistics[${index}].title`} />
              </AnimText>
            </div>
          ))}

        <div className="top-0 left-0 absolute w-20 h-20 border-main/38! border-t border-l rounded-tl-sm" />
        <div className="right-0 bottom-0 absolute w-20 h-20 border-main/38! border-r border-b rounded-br-sm" />
      </div>
    </section>
  )
}
