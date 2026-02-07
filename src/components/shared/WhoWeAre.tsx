'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import LineHeading from '@/components/shared/LineHeading'
import ScrollRevealText from '@/components/ui/text/ScrollRevealText'

export default function WhoWeAre({ className, dark, withOutImage }: { className?: string; dark?: boolean; withOutImage?: boolean }) {
  // image logic
  let imageRef = useRef<HTMLDivElement>(null)
  let { scrollYProgress: imageScrollProgress } = useScroll({ target: imageRef, offset: ['start 90%', 'end 50%'] })
  let clipPath = useTransform(imageScrollProgress, [0, 1], ['inset(0% 0 0 0)', 'inset(100% 0 0 0)'])

  return (
    <section className={`relative w-dvw overflow-hidden px-4 max-md:px-2 py-12 ${dark ? 'bg-bg text-text' : 'bg-text text-bg'} ${className}`}>
      <LineHeading tKey="common.whoWeAre" className="max-md:mb-12" />

      <p className="relative max-w-4xl text-[2.8dvw] rtl:text-[2dvw] max-md:rtl:text-xl max-md:text-3xl max-md:text-center normal-case text-balance ms-auto">
        <ScrollRevealText tKey="db.whoweare.description2" />
      </p>

      <div ref={imageRef} className={`relative h-[38dvh] overflow-hidden rounded-lg mt-34 max-md:mt-22 ${withOutImage ? 'hidden' : ''}`}>
        <ImageIn src="/images/projects/yellow-residence/yr-gallery-3.webp" alt="EastLane Panner 1" className="scale-100!" />

        <motion.div style={{ clipPath }} className="z-10 absolute inset-0">
          <ImageIn src="/images/projects/yellow-residence/yr-gallery-2.webp" alt="EastLane Panner 2" className="scale-100!" />
        </motion.div>
      </div>
    </section>
  )
}
