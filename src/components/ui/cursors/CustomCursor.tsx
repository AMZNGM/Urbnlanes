'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function CustomCursor() {
  const windowRef = useRef<HTMLElement>(null)
  const { x, y } = useMouseMotion(windowRef, { springConfig: { stiffness: 150, damping: 20 } })
  const { x: x2, y: y2 } = useMouseMotion(windowRef, { springConfig: { stiffness: 300, damping: 40 } })

  const isMobile = useIsMobile()
  if (isMobile) return

  return (
    <div className="flex justify-center items-center">
      <motion.div
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="top-0 left-0 z-9999 fixed w-2 h-2 bg-main rounded-full pointer-events-none"
      />
      <motion.div
        style={{
          x: x2,
          y: y2,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="top-0 left-0 z-9999 fixed w-8 h-8 border border-main rounded-full pointer-events-none"
      />
    </div>
  )
}
