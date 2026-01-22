import { ReactNode } from 'react'
import { SoftLine } from '@/components/ui/effects/Lines'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ShinyText from '@/components/ui/text/ShinyText'

export default function Heading({
  text = '',
  tagline = '',
  withOutLine,
  className,
}: {
  text?: ReactNode
  tagline?: ReactNode
  withOutLine?: boolean
  className?: string
}) {
  return (
    <AnimIn className={`font-sec my-12 ${className}`}>
      {!withOutLine && <SoftLine />}

      <div className="w-[5vw] max-md:w-[10vw] h-0.5 bg-linear-to-r from-transparent via-main to-transparent mb-2" />

      <p className="text-[0.8vw] max-md:text-[2.9vw] tracking-[0.9vw] px-1">{tagline}</p>

      <ShinyText as="h2" className="text-[5vw] max-md:text-[10vw] max-lg:text-[8vw] ltr:leading-[0.95] rtl:leading-24 tracking-tight">
        {text}
      </ShinyText>

      <div className="w-[5vw] max-md:w-[10vw] h-0.5 bg-linear-to-r from-transparent via-main to-transparent" />
    </AnimIn>
  )
}
