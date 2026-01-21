import Image from 'next/image'
import { TrendingUp, Globe, Building2, Award } from 'lucide-react'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/text/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function SisterCompanies() {
  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-4 py-12">
      <div className="flex flex-col gap-22 container">
        <AnimIn className="w-full h-full flex flex-col gap-4">
          <AnimText as="span" delay={0.9} data-scroll data-scroll-speed="0.02" className="text-bg text-sm tracking-[0.2em]">
            <TText tKey="common.ourHeritage" />
          </AnimText>

          <AnimText as="p" delay={0.7} data-scroll data-scroll-speed="0.01" className="overflow-y-hidden text-5xl rtl:leading-14">
            <TText tKey="common.dreams" />
          </AnimText>

          <div className="flex gap-4">
            <div className="w-2/3 max-lg:w-full flex flex-col gap-4 bg-main/25 rounded-2xl p-8 max-md:p-4">
              {db.whoweare.stats.map((stat, index) => (
                <AnimIn key={index} delay={index * 0.3} className="group">
                  <div className="flex justify-between items-center bg-black/5 hover:bg-black/10 border rounded-xl hover:scale-97 transition-all duration-300 p-4 max-md:p-2">
                    <div className="space-y-2 font-light text-3xl">
                      <TText tKey={stat.value} />
                      <div className="text-sm tracking-wider">
                        <TText tKey={stat.title} />
                      </div>
                    </div>

                    <AnimIn delay={index * 0.3}>
                      <div className="w-16 h-16 flex justify-center items-center bg-main/50 rounded-full text-black/60 group-hover:text-black group-hover:scale-90 transition-all duration-300">
                        {(() => {
                          const IconComponent = [TrendingUp, Globe, Building2, Award][index]
                          return <IconComponent size={32} />
                        })()}
                      </div>
                    </AnimIn>
                  </div>
                </AnimIn>
              ))}
            </div>

            <div className="max-md:hidden relative w-1/3 overflow-hidden gap-4 grid grid-cols-1 bg-main/50 rounded-2xl">
              <ImageIn src="/images/projects/levels-tower/levels-gallery-6.avif" alt="poster" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          </div>
        </AnimIn>

        <AnimIn className="w-full h-full flex flex-col gap-4">
          <AnimText as="span" delay={1} data-scroll data-scroll-speed="0.02" className="text-bg text-sm tracking-[0.2em]">
            <TText tKey="common.ourNetwork" />
          </AnimText>

          <AnimText as="p" delay={0.75} data-scroll data-scroll-speed="0.01" className="overflow-y-hidden text-5xl rtl:leading-14">
            <TText tKey="common.sisterCompanies" />
          </AnimText>

          <div className="gap-4 grid grid-cols-3 grid-rows-[masonry] bg-main/25 rounded-2xl p-8 max-md:p-4">
            {db.whoweare.sisterCompanies.map((company, index) => (
              <AnimIn key={company.title} delay={index * 0.3} className="group">
                <div className="overflow-hidden bg-black/5 hover:bg-black/10 border border-black/10 rounded-xl hover:scale-97 transition-all duration-300 px-1 py-2">
                  <div className="w-full h-32 flex justify-center items-center mb-4">
                    <Image
                      src={company.logo}
                      alt={company.title}
                      width={200}
                      height={200}
                      className="w-60 max-w-full h-auto max-h-full object-contain invert"
                    />
                  </div>

                  <p className="font-bold text-main text-center">
                    <TText tKey={company.title} />
                  </p>
                </div>
              </AnimIn>
            ))}
          </div>
        </AnimIn>
      </div>
    </section>
  )
}
