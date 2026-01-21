'use client'

import { motion } from 'motion/react'

export default function Shine() {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: ['120%', '-120%'] }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-main/20 to-transparent -rotate-130 scale-150 pointer-events-none"
    />
  )
}
