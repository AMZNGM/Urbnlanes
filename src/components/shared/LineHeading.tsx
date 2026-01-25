import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function LineHeading({ tKey = '', paraTKey = '' }) {
  return (
    <div>
      {!paraTKey && (
        <>
          <MotionLine delay={0.7} />

          <AnimText as="h3" delay={0.7} className="font-sec text-xl">
            <TText tKey={tKey} />
          </AnimText>
        </>
      )}

      {paraTKey && (
        <>
          <AnimText as="h3" delay={0.7} className="font-sec font-medium text-xs tracking-widest">
            <TText tKey={tKey} />
          </AnimText>

          <MotionLine delay={0.7} />

          <AnimText as={'p'} delay={0.9} className="font-sec font-light text-lg">
            <TText tKey={paraTKey} />
          </AnimText>
        </>
      )}
    </div>
  )
}
