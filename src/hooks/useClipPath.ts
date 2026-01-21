'use client'

import { useScroll, useTransform } from 'motion/react'

export function useClipPath({ imageRef }: { imageRef: React.RefObject<HTMLElement> }) {
  const { scrollYProgress: imageScrollProgress } = useScroll({ target: imageRef, offset: ['start 60%', 'end 50%'] })
  const clipPath = useTransform(imageScrollProgress, (latest) => `inset(${latest * 100}% 0 0 0)`)

  return { clipPath }
}
