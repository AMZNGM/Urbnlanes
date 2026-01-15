'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useTranslation } from '@/hooks/useTranslation'

export default function TextScrollOpacity() {
  const { t, currentLanguage } = useTranslation()
  const isMobile = useIsMobile()
  const value = t('db.whoweare.description2')
  const valueRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: valueRef,
    offset: isMobile ? ['start 0.9', 'start 0.35'] : ['start 0.8', 'start 0.15'],
  })

  const words = value.split(' ')
  const characters = []

  words.forEach((word, wordIndex) => {
    characters.push(...word.split(''))
    if (wordIndex < words.length - 1) {
      characters.push(' ')
    }
  })

  return (
    <section className="relative w-full h-full bg-black px-18 max-md:px-4 py-12">
      <div className="w-full h-full flex flex-col justify-center items-center gap-12">
        <p
          ref={valueRef}
          style={{ opacity: scrollYProgress }}
          className="relative font-sec font-light text-[2.5vw] max-md:text-[4.5vw] text-center text-balance cursor-default"
        >
          {currentLanguage === 'ar'
            ? value
            : characters.map((char, index) => (
                <Char key={index} char={char} index={index} total={characters.length} progress={scrollYProgress} />
              ))}
        </p>

        <div className="w-full h-px bg-linear-to-r from-transparent via-main to-transparent" />

        <div className="max-md:hidden z-20 absolute inset-0 border rounded-sm m-8 pointer-events-none" />
        <div className="max-md:hidden z-20 absolute inset-3 border rounded-sm m-8 pointer-events-none" />
      </div>
    </section>
  )
}

function Char({ char, index, total, progress }) {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(progress, [start, end], [0, 1])

  return (
    <span className={`relative ${char === ' ' ? '' : 'me-0.5'}`}>
      <span className="absolute inset-0 opacity-15">{char}</span>
      <motion.span style={{ opacity }}>{char}</motion.span>
    </span>
  )
}
