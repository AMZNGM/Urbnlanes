import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function LineHeading({
  tKey = '',
  paraTKey = '',
  sideParaTKey = '',
  className = '',
  lineFrom = 'left',
}: {
  tKey?: string
  paraTKey?: string
  sideParaTKey?: string
  className?: string
  lineFrom?: 'left' | 'right' | 'center'
}) {
  return (
    <div className={className}>
      {!sideParaTKey && !paraTKey && (
        <>
          <MotionLine delay={0.1} from={lineFrom} />

          <AnimText as="h3" delay={0.5} className="font-mono rtl:leading-5">
            <TText tKey={tKey} />
          </AnimText>
        </>
      )}

      {sideParaTKey && !paraTKey && (
        <>
          <MotionLine delay={0.1} from={lineFrom} />

          <div className="gap-8 grid md:grid-cols-3 normal-case">
            <div className="col-span-1">
              <AnimText as="h3" delay={0.4} className="font-mono">
                <TText tKey={tKey} />
              </AnimText>
            </div>

            <div className="col-span-2">
              <AnimText as={'p'} delay={0.5} className="text-3xl md:text-5xl">
                <TText tKey={sideParaTKey} />
              </AnimText>
            </div>
          </div>
        </>
      )}

      {paraTKey && (
        <>
          <AnimText as={'p'} delay={0.7} className="opacity-65 font-mono text-xs rtl:text-sm text-end rtl:leading-5 tracking-widest">
            <TText tKey={paraTKey} />
          </AnimText>

          <MotionLine delay={0.1} from={lineFrom} />

          <AnimText as="h3" delay={0.8} className="opacity-65 font-mono text-xs rtl:text-sm rtl:leading-5 tracking-widest">
            <TText tKey={tKey} />
          </AnimText>
        </>
      )}
    </div>
  )
}
