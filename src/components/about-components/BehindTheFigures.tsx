import { MotionLine, SoftLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import db from '@/database/urbnlanes-db.json'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import NumberTicker from '@/components/ui/text/NumberTicker'

export default function BehindTheFigures() {
  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-4 py-12">
      <AnimIn className="space-y-4 bg-main/25 rounded-2xl text-center p-4">
        <AnimText as="h5" delay={0.3} className="font-light text-[9dvw] text-black max-md:text-5xl tracking-tight mb-4">
          <TText tKey="db.whoweare.behindthefigures[0].title" />
        </AnimText>

        <AnimText as="p" delay={0.6} className="font-light text-black/80 text-2xl md:text-3xl">
          <TText tKey="db.whoweare.behindthefigures[0].tagline" />
        </AnimText>

        <MotionLine delay={0.75} className="opacity-75" />

        <AnimText delay={0.9} className="max-w-4xl font-light text-black/60 text-base md:text-lg normal-case leading-relaxed mx-auto pt-2">
          <TText tKey="db.whoweare.behindthefigures[0].description" />
        </AnimText>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8">
          {db.whoweare.behindthefigures.map((figure, index) => (
            <AnimIn key={index} delay={0.2 * index} className="group relative">
              <AnimIn className="relative w-full h-full bg-main/25 rounded-2xl p-4 max-md:p-2">
                <AnimIn delay={0.4 + 0.2 * index} className="font-extralight text-7xl md:text-8xl leading-none tracking-tighter mb-3">
                  <NumberTicker value={figure.number} duration={3500} />
                </AnimIn>

                <SoftLine className="h-1! mb-12" />

                <AnimText delay={0.8 + 0.2 * index} className="text-2xl mb-4">
                  <TText tKey={`db.whoweare.behindthefigures[${index + 1}].label`} />
                </AnimText>

                <AnimText as="p" delay={1 + 0.2 * index} className="font-light max-md:text-sm normal-case leading-relaxed">
                  <TText tKey={`db.whoweare.behindthefigures[${index + 1}].description`} />
                </AnimText>
              </AnimIn>
            </AnimIn>
          ))}
        </div>
      </AnimIn>
    </section>
  )
}
