'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'motion/react'

function wrap(min, max, v) {
  const range = max - min
  const mod = (((v - min) % range) + range) % range
  return mod + min
}

function ParallaxText({ children, baseVelocity = 100, className = '' }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  const directionFactor = useRef(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="overflow-hidden flex flex-nowrap whitespace-nowrap">
      <motion.div className={`flex flex-nowrap tracking-widest ${className}`} style={{ x }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="block mr-1 shrink-0">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function TextMarquee({ texts = [], className = '', baseVelocity = 2 }) {
  return (
    <section>
      {texts.map((text, index) => (
        <ParallaxText key={index} baseVelocity={baseVelocity} className={className}>
          {text}
        </ParallaxText>
      ))}
    </section>
  )
}
