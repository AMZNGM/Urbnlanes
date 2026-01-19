'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export default function NumberTicker({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix
      }
    })
  }, [springValue, prefix, suffix])

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}
