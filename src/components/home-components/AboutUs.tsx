'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { useIsMobile } from '@/hooks/useIsMobile'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function AboutUs() {
  let { t, currentLanguage } = useTranslation()
  let isMobile = useIsMobile()
  let valueRef = useRef(null)
  let value = t('db.whoweare.description2')
  let words = value.split(' ')
  let characters: string[] = []
  let { scrollYProgress } = useScroll({
    target: valueRef,
    offset: isMobile ? ['start 0.9', 'start 0.35'] : ['start 0.9', 'start 0.3'],
  })

  words.forEach((word: string, i: number) => {
    characters.push(...word.split(''))
    if (i < words.length - 1) {
      characters.push(' ')
    }
  })

  let Char = ({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) => {
    let start = index / total
    let end = start + 1 / total
    let opacity = useTransform(progress, [start, end], [0, 1])

    return (
      <span className="relative">
        <motion.span style={{ opacity }}>{char}</motion.span>
        <span className="absolute inset-0 opacity-15">{char}</span>
      </span>
    )
  }

  return (
    <section className="relative bg-black text-text px-18 max-md:px-4">
      <AnimIn className="flex max-lg:flex-col justify-center items-center gap-12 px-12 max-md:px-8 py-12">
        <motion.p ref={valueRef} className="relative font-sec max-md:font-medium max-md:text-xl text-3xl max-md:text-center text-balance">
          {currentLanguage === 'ar'
            ? value
            : characters.map((char, index) => <Char key={index} char={char} index={index} total={characters.length} progress={scrollYProgress} />)}
        </motion.p>

        <div className="min-w-80 max-h-120 max-md:max-h-100 overflow-hidden rounded-2xl">
          <video src="/videos/projects/yellow-residence/yr-sneak-peak.mp4" poster="/images/poster.png" autoPlay loop muted playsInline />
        </div>

        <div className="absolute inset-0 border border-main/45! rounded-2xl mx-18 max-md:mx-4 pointer-events-none" />
        <div className="absolute inset-3 border rounded-2xl mx-18 max-md:mx-4 pointer-events-none" />
      </AnimIn>
    </section>
  )
}
