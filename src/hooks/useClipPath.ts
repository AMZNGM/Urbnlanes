'use client'

import { useScroll, useTransform } from 'motion/react'

export function useClipPath({ imageRef }: { imageRef: React.RefObject<HTMLElement> }) {
  const { scrollYProgress: imageScrollProgress } = useScroll({ target: imageRef, offset: ['start 60%', 'end 50%'] })
  const clipPath = useTransform(imageScrollProgress, (latest) => `inset(${latest * 100}% 0 0 0)`)

  return { clipPath }
}

// let imageRef = useRef<HTMLDivElement>(null)
// let { clipPath } = useClipPath({ imageRef: imageRef as React.RefObject<HTMLElement> })

// <div ref={imageRef} className="z-30 relative h-[38vh] overflow-hidden rounded-2xl">
//   <ImageIn src="/images/projects/yellow-residence/yr-gallery-3.webp" alt="EastLane Project" duration={0.5} />
//   <motion.div style={{ clipPath }} className="z-10 absolute inset-0">
//     <ImageIn src="/images/projects/yellow-residence/yr-gallery-2.webp" alt="image clipPath" duration={0.5} />
//   </motion.div>
// </div>
