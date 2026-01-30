'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function PartnersAbout() {
  let { scrollYProgress } = useScroll()

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-text my-2 px-4">
      <div className="z-10 relative max-w-4xl py-2 mix-blend-difference">
        <AnimText as="h2" className="font-medium text-[5dvw] max-md:text-5xl normal-case md:rtl:leading-34!">
          <TText tKey="partners.partnersDesc2" />
        </AnimText>
      </div>

      <motion.div
        style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '600%']) }}
        className="top-0 right-0 absolute w-1/2 bg-black rounded-2xl mx-2"
      />

      <motion.div style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '600%']) }} className="absolute inset-0 max-w-4xl bg-black rounded-2xl mx-2" />

      <motion.div
        style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '600%']) }}
        className="max-2xl:hidden ltr:right-0 bottom-0 rtl:left-0 absolute max-w-1/2 flex justify-center bg-black rounded-2xl text-end mx-2 ms-auto"
      >
        <h2 className="z-10 relative max-[1800px]:max-w-160 font-black text-[5dvw] leading-28! px-4 mix-blend-difference">
          <TText tKey="partners.partnersTitle" />
        </h2>
      </motion.div>
    </section>
  )
}
