'use client'

import { motion } from 'motion/react'

export function MotionLine({ className = '', delay = 0.3 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ width: '0%' }}
      whileInView={{ width: '100%' }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className={`h-0.5 bg-main my-2 mix-blend-difference ${className}`}
    />
  )
}

export function SoftLine({ className = '', delay = 0.3 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1, delay }}
      viewport={{ once: true }}
      className={`w-full h-px bg-linear-to-r from-transparent via-main to-transparent my-8 ${className}`}
    />
  )
}
