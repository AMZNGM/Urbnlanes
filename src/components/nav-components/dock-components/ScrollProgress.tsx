'use client'

import type React from 'react'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function ScrollProgress({ className = '' }: { className?: string }) {
  let { scrollYProgress } = useScroll()
  let width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  let trackRef = useRef<HTMLDivElement | null>(null)

  let updateScrollFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current || typeof window === 'undefined' || typeof document === 'undefined') return

    let rect = trackRef.current.getBoundingClientRect()
    if (!rect.width) return

    let x = e.clientX
    let ratio = (x - rect.left) / rect.width
    if (ratio < 0) ratio = 0
    if (ratio > 1) ratio = 1

    let doc = document.documentElement
    let maxScroll = doc.scrollHeight - window.innerHeight
    let target = ratio * maxScroll

    window.scrollTo({
      top: target,
      behavior: 'auto',
    })
  }

  let handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    updateScrollFromPointer(e)
  }

  let handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons & 1) {
      updateScrollFromPointer(e)
    }
  }

  return (
    <motion.div
      ref={trackRef}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ delay: 0.3 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className={`relative min-w-40 h-1 bg-bg/30 rounded-full cursor-pointer shrink-0 ${className}`}
    >
      <motion.div style={{ width }} className="h-full bg-text rounded-full" />
    </motion.div>
  )
}
