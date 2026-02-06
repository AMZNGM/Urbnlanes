'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { useIsMobile } from '@/hooks/useIsMobile'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import LineHeading from '@/components/shared/LineHeading'

export default function WhoWeAre() {
  let { t, currentLanguage } = useTranslation()
  let isMobile = useIsMobile()

  // text logic
  let valueRef = useRef(null)
  let value = t('db.whoweare.description2')
  let words = value.split(' ')
  let characters: string[] = []
  let { scrollYProgress } = useScroll({
    target: valueRef,
    offset: isMobile ? ['start 0.9', 'start 0.35'] : ['start 0.9', 'start 0.2'],
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

  // image logic
  let imageRef = useRef<HTMLDivElement>(null)
  let { scrollYProgress: imageScrollProgress } = useScroll({ target: imageRef, offset: ['start 82%', 'end 50%'] })
  let clipPath = useTransform(imageScrollProgress, [0, 1], ['inset(0% 0 0 0)', 'inset(100% 0 0 0)'])

  return (
    <section className="relative w-dvw bg-bg text-text px-4 max-md:px-2 py-12">
      <LineHeading tKey="common.whoWeAre" className="max-md:mb-12" lineFrom="right" />

      <motion.p
        ref={valueRef}
        className="relative max-w-4xl font-light text-[2.8dvw] rtl:text-[2dvw] max-md:rtl:text-xl max-md:text-3xl max-md:text-center normal-case text-balance ms-auto"
      >
        {currentLanguage === 'ar'
          ? value
          : characters.map((char, index) => <Char key={index} char={char} index={index} total={characters.length} progress={scrollYProgress} />)}
      </motion.p>

      <div ref={imageRef} className="relative h-[38dvh] overflow-hidden rounded-lg mt-34 max-md:mt-22">
        <ImageIn src="/images/projects/yellow-residence/yr-gallery-3.webp" alt="EastLane Panner 1" className="scale-100!" />

        <motion.div style={{ clipPath }} className="z-10 absolute inset-0">
          <ImageIn src="/images/projects/yellow-residence/yr-gallery-2.webp" alt="EastLane Panner 2" className="scale-100!" />
        </motion.div>
      </div>
    </section>
  )
}
