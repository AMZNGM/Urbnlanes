'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import db from '@/database/urbnlanes-db.json'

export default function TextScrollOpacity() {
  const value = db.whoweare.description2
  const valueRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: valueRef,
    offset: ['start 0.9', 'start 0.25'],
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
    <section className="relative w-full h-full bg-black px-18 max-md:px-4 pt-12">
      <motion.div
        style={{
          scaleX: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
          height: useTransform(scrollYProgress, [0, 1], ['1 px', '1.5px']),
          opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]),
          background: 'linear-gradient(90deg, transparent, currentColor, transparent)',
        }}
        className="opacity-0 mb-18"
      />

      <p
        ref={valueRef}
        style={{ opacity: scrollYProgress }}
        className="relative font-sec font-light text-[2.5vw] max-md:text-[5vw] md:hover:text-text md:text-text/80 text-center text-balance md:transition-colors md:duration-300 cursor-default"
      >
        {characters.map((char, index) => {
          const start = index / characters.length
          const end = start + 1 / characters.length
          const opacity = useTransform(scrollYProgress, [start, end], [0, 1])

          return (
            <span key={index} className={`relative ${char === ' ' ? 'me-2' : 'me-0.5'}`}>
              <span className="absolute inset-0 opacity-15">{char}</span>
              <motion.span style={{ opacity }}>{char}</motion.span>
            </span>
          )
        })}
      </p>

      <div className="max-md:hidden z-20 absolute inset-0 border border-main/35 rounded-sm -rotate-8 translate-y-12 m-18 pointer-events-none" />
      <div className="max-md:hidden z-20 absolute inset-3 border border-main/35 rounded-sm -rotate-8 translate-y-12 m-18 pointer-events-none" />
      <div className="max-md:hidden top-18 left-18 z-20 absolute w-20 h-20 border-main/35 border-t border-l rounded-tl-sm" />
      <div className="max-md:hidden right-18 -bottom-10 z-20 absolute w-20 h-20 border-main/35 border-r border-b rounded-br-sm" />
    </section>
  )
}
