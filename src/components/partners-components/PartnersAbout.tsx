'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function PartnersAbout() {
  let { scrollYProgress } = useScroll()

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-text mt-2 px-4 max-md:px-2">
      <div className="z-10 relative md:max-w-1/2 py-2 mix-blend-difference">
        <AnimText as="h2" className="font-medium text-[5dvw] max-md:text-5xl normal-case md:rtl:leading-34!">
          <TText tKey="partners.partnersDesc2" />
        </AnimText>
      </div>

      <motion.div style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '650%']) }} className="absolute inset-0 md:max-w-1/2 bg-bg ms-auto" />
    </section>
  )
}
