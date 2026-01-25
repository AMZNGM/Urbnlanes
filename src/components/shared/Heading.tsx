import { ReactNode } from 'react'
import { SoftLine } from '@/components/ui/effects/Lines'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ShinyText from '@/components/ui/text/ShinyText'

export default function Heading({
  text = '',
  tagline = '',
  className = '',
  line = true,
}: {
  text?: ReactNode
  tagline?: ReactNode
  line?: boolean
  className?: string
}) {
  return (
    <AnimIn className={`font-sec ${line ? '' : 'pt-24 pb-12'} ${className}`}>
      {line && <SoftLine className="mt-24 mb-12" />}

      <div className="w-[5vw] max-md:w-[10vw] h-0.5 bg-linear-to-r from-transparent via-current/50 to-transparent ltr:mb-1 rtl:-mb-3" />

      <p className="text-[0.8vw] max-md:text-[2.9vw] tracking-[0.9vw] px-1">{tagline}</p>

      <ShinyText as="h2" className="text-[5vw] max-md:text-[10vw] max-lg:text-[8vw] ltr:leading-[0.95] rtl:leading-24 tracking-tight">
        {text}
      </ShinyText>

      <div className="w-[5vw] max-md:w-[10vw] h-0.5 bg-linear-to-r from-transparent via-current/50 to-transparent" />
    </AnimIn>
  )
}
