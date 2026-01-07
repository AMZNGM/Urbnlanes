'use client'

import { motion, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import { useIsMobile } from '@/hooks/useIsMobile'
import ArrowIcon from '@/components/ui/icons/ArrowIcon'

export default function ArrowCursor() {
  const ref = useRef(null)
  const { x, y } = useMouseMotion({ current: null })
  const isMobile = useIsMobile()

  const rotate = useTransform([x, y], ([currentX, currentY], latest) => {
    if (!ref.current) return 0

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const angle = Math.atan2(currentY - centerY, currentX - centerX)
    return (angle * 180) / Math.PI
  })

  const smoothRotate = useSpring(rotate, {
    stiffness: 150,
    damping: 20,
    mass: 0.1,
  })

  if (isMobile) return

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
        rotate: smoothRotate,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="z-10000 absolute inset-0 w-12 h-12 flex justify-center items-center bg-main rounded-full pointer-events-none"
    >
      <ArrowIcon className="w-4 fill-text" />
    </motion.div>
  )
}
