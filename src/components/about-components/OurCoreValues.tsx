import { Star, Clock, Shield, Zap } from 'lucide-react'
import { MotionLine } from '@/components/ui/effects/Lines'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function OurCoreValues() {
  return (
    <section className="relative w-dvw bg-text text-black px-18 max-md:px-4 py-12">
      <AnimText as="h2" delay={0.5} className="text-3xl mb-4">
        <TText tKey="common.ourCoreValues" />
      </AnimText>

      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-main/25 rounded-2xl p-8">
        {db.whoweare.coreValues?.map((value, index) => {
          const coreValueIcons = [Star, Clock, Shield, Zap]
          const IconComponent = coreValueIcons[index] || Star

          return (
            <div key={index} className="group relative flex flex-col justify-between">
              <div>
                <AnimIn delay={index * 0.1 + 0.2} className="w-14 h-14 flex justify-center items-center bg-main rounded-full text-text mb-6">
                  <IconComponent size={32} />
                </AnimIn>

                <AnimText as="h3" className="font-bold group-hover:text-main text-2xl transition-colors duration-300 mb-4">
                  <TText tKey={`db.whoweare.coreValues.${index}.title`} />
                </AnimText>

                <AnimText as="p" delay={index * 0.3} className="normal-case leading-5!">
                  <TText tKey={`db.whoweare.coreValues.${index}.description`} />
                </AnimText>
              </div>

              <MotionLine delay={index * 0.1 + 0.4} className="mt-8" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
