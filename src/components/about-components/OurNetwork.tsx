import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function OurNetwork() {
  return (
    <section className="relative w-dvw overflow-hidden bg-bg text-text px-4 max-md:px-2 py-12">
      <div className="max-w-4xl flex flex-col gap-22 mx-auto">
        {/* <AnimIn className="w-full h-full flex flex-col gap-4">
          <AnimText as="span" delay={0.9} data-scroll data-scroll-speed="0.02" className="text-bg text-sm tracking-[0.2em]">
            <TText tKey="common.ourHeritage" />
          </AnimText>

          <AnimText as="p" delay={0.7} data-scroll data-scroll-speed="0.01" className="overflow-y-hidden text-5xl rtl:leading-14">
            <TText tKey="common.dreams" />
          </AnimText>

          <div className="flex gap-4">
            <div className="w-2/3 max-lg:w-full flex flex-col gap-4 bg-main/10 rounded-lg p-8 max-md:p-4">
              {db.whoweare.stats.map((stat, index) => (
                <AnimIn key={index} delay={index * 0.3} className="group">
                  <div className="flex justify-between items-center bg-text/5 hover:bg-text/10 border rounded-lg hover:scale-97 transition-all duration-300 p-4 max-md:p-2">
                    <div className="space-y-2 font-light text-3xl">
                      <TText tKey={stat.value} />
                      <div className="text-sm tracking-wider">
                        <TText tKey={stat.title} />
                      </div>
                    </div>

                    <AnimIn delay={index * 0.3}>
                      <div className="w-16 h-16 flex justify-center items-center bg-main/10 rounded-full text-text/60 group-hover:text-text group-hover:scale-90 transition-all duration-300">
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

            <div className="max-md:hidden relative w-1/3 overflow-hidden gap-4 grid grid-cols-1 bg-main/10 rounded-lg">
              <ImageIn src="/images/projects/levels-tower/levels-gallery-6.avif" alt="poster" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          </div>
        </AnimIn> */}

        <AnimIn className="w-full h-full flex flex-col gap-4">
          <AnimText as="span" delay={1} data-scroll data-scroll-speed="0.02" className="text-bg text-sm tracking-[0.2em]">
            <TText tKey="common.ourNetwork" />
          </AnimText>

          <AnimText as="p" delay={0.75} data-scroll data-scroll-speed="0.01" className="overflow-y-hidden text-5xl rtl:leading-14">
            <TText tKey="common.sisterCompanies" />
          </AnimText>

          <div className="gap-4 grid grid-cols-3 grid-rows-[masonry] bg-main/10 rounded-lg p-8 max-md:p-4">
            {db.whoweare.sisterCompanies.map((company, index) => (
              <AnimIn key={company.title} delay={index * 0.3} className="group">
                <div className="overflow-hidden bg-text/5 hover:bg-text/10 border border-text/10 rounded-lg hover:scale-97 transition-all duration-300 px-1 py-2">
                  <div className="w-full h-32 flex justify-center items-center mb-4">
                    <ImageIn
                      src={company.logo}
                      alt={company.title}
                      className="object-contain! p-4"
                      divClassName="w-60 max-w-full h-auto max-h-full rounded-lg"
                    />
                  </div>

                  <p className="text-main normal-case 10xt-center">
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
