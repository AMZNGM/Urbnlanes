'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function ScrollRevealText({
  tKey,
  text,
  className = '',
  skipArabic = false,
}: {
  tKey?: string
  text?: string
  className?: string
  skipArabic?: boolean
}) {
  let { t, currentLanguage } = useTranslation()
  let isMobile = useIsMobile()
  let textRef = useRef(null)

  let finalText = tKey ? t(tKey) : text || ''
  let { scrollYProgress } = useScroll({ target: textRef, offset: isMobile ? ['start 0.9', 'start 0.35'] : ['start 0.9', 'start 0.2'] })
  let words = finalText.split(' ')
  let characters: string[] = []

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
    <span ref={textRef} className={className}>
      {currentLanguage === 'ar' && !skipArabic
        ? finalText
        : characters.map((char, index) => <Char key={index} char={char} index={index} total={characters.length} progress={scrollYProgress} />)}
    </span>
  )
}

{
  /* <p className="relative max-w-4xl font-light text-[2.8dvw] rtl:text-[2dvw] max-md:rtl:text-xl max-md:text-3xl max-md:text-center normal-case text-balance ms-auto">
  <ScrollRevealText tKey="db.whoweare.description2" />
</p> */
}
