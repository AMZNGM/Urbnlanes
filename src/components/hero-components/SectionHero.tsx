import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '../ui/unstyled/ImageIn'

export default function SectionHero({ image = '', tKey = '', tKeyPara = '' }: { image: string; tKey: string; tKeyPara?: string }) {
  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-bg text-text px-4 max-md:px-2 pb-8">
      <ImageIn src={image} alt="Background Image" priority sizes="100vw" className="scale-100!" divClassName="blur-none! absolute! inset-0" />

      <MotionLine className="top-12 absolute bg-bg!" />

      <AnimIn className="w-full h-full flex flex-col justify-end">
        <AnimIn as={'h1'} className="font-sec text-7xl capitalize">
          <TText tKey={tKey} />
        </AnimIn>

        <p className="max-w-lg opacity-90 max-md:text-xs text-sm normal-case line-clamp-1 tracking-wider">
          <TText tKey={tKeyPara} />
        </p>
      </AnimIn>
    </section>
  )
}
