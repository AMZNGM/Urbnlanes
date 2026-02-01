'use client'

import { motion, useScroll, useTransform } from 'motion/react'

export default function ScrollIndicator() {
  let { scrollYProgress } = useScroll({ offset: ['start start', 'end 200%'] })

  return (
    <div className="bottom-4 left-1/2 z-20 fixed w-1/5 max-md:w-1/2 h-12 overflow-hidden flex justify-center items-center bg-main/25 backdrop-blur-2xl rounded-xl -translate-x-1/2 px-2">
      <motion.div
        style={{
          width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
        }}
        className="h-1 bg-bg"
      />
    </div>
  )
}
