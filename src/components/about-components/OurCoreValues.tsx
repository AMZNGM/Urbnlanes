import { MotionLine } from '@/components/ui/effects/Lines'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function OurCoreValues() {
  return (
    <section id="our-core-values" className="relative w-dvw bg-bg text-text px-4 max-md:px-2 pt-24 pb-32">
      <div className="max-w-xl space-y-4 font-mono normal-case mx-auto">
        <AnimText as="h2" delay={0.5} className="text-2xl">
          <TText tKey="common.ourCoreValues" />
        </AnimText>

        {db.whoweare.coreValues?.map((value, index) => {
          return (
            <div key={index} className="space-y-2">
              <AnimText as="h3" className="text-3xl leading-10!">
                <TText tKey={`db.whoweare.coreValues.${index}.title`} />
              </AnimText>

              <AnimText as="p" delay={index * 0.3} className="text-balance">
                <TText tKey={`db.whoweare.coreValues.${index}.description`} />
              </AnimText>

              <MotionLine delay={index * 0.1 + 0.4} className="mt-6" from="left" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
