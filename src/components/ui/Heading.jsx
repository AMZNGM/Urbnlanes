'use client'

import { motion } from 'motion/react'
import ShinyText from '@/components/ui/text/ShinyText'

export default function Heading({ text = '', tagline = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="font-sec my-12"
    >
      <div className="w-full h-px bg-linear-to-r from-transparent via-main to-transparent mb-12" />

      <div className="w-[5vw] max-md:w-[10vw] h-0.5 bg-linear-to-r from-transparent via-main to-transparent mb-2" />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p className="text-[0.8vw] max-md:text-[2.9vw] tracking-[0.9vw] px-1">{tagline}</p>
      </motion.div>

      <ShinyText tag="h2" className="text-[5vw] max-md:text-[10vw] leading-[0.95] tracking-tight">
        {text}
      </ShinyText>

      <div className="w-[5vw] max-md:w-[10vw] h-0.5 bg-linear-to-r from-transparent via-main to-transparent" />
    </motion.div>
  )
}
