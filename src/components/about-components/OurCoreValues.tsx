import { Star, Clock, Shield, Zap } from 'lucide-react'
import { MotionLine } from '@/components/ui/effects/Lines'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function OurCoreValues() {
  return (
    <section className="relative w-dvw bg-text text-black px-18 max-md:px-4 py-12">
      <div className="max-md:w-full">
        <AnimText as="h2" delay={0.75} data-scroll data-scroll-speed="0.01" className="overflow-y-hidden text-5xl text-center mb-4">
          <TText tKey="common.ourCoreValues" />
        </AnimText>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-main/25 rounded-2xl p-8">
          {db.whoweare.coreValues?.map((value, index) => {
            const coreValueIcons = [Star, Clock, Shield, Zap]
            const IconComponent = coreValueIcons[index] || Star

            return (
              <div key={index} className="group relative flex flex-col justify-between pb-2">
                <div className="z-10 relative">
                  <AnimIn delay={index * 0.1 + 0.2} className="w-16 h-16 flex justify-center items-center bg-main rounded-full text-text mb-6">
                    <IconComponent size={32} />
                  </AnimIn>

                  <AnimText as="h3" className="font-bold group-hover:text-main text-2xl transition-colors duration-300 mb-4">
                    <TText tKey={`db.whoweare.coreValues.${index}.title`} />
                  </AnimText>

                  <AnimText
                    as="p"
                    delay={index * 0.3}
                    className="opacity-70 group-hover:opacity-90 text-base normal-case leading-relaxed transition-opacity duration-300"
                  >
                    <TText tKey={`db.whoweare.coreValues.${index}.description`} />
                  </AnimText>
                </div>

                <MotionLine delay={index * 0.1 + 0.4} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
