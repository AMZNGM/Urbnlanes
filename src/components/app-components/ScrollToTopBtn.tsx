'use client'

import { motion, useScroll } from 'motion/react'
import { ChevronUp } from 'lucide-react'
import { useScrollPosition } from '@/hooks/useScrollPosition'

export default function ScrollToTopBtn() {
  let { scrollYProgress } = useScroll()
  let isScrolled100vh = useScrollPosition(0.8)

  return (
    <motion.button
      aria-label="Scroll to top"
      initial={{ opacity: isScrolled100vh ? 1 : 0, y: isScrolled100vh ? 0 : '100%' }}
      animate={{ opacity: isScrolled100vh ? 1 : 0, y: isScrolled100vh ? 0 : '100%' }}
      transition={{ type: 'spring', duration: 0.2, stiffness: 100 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group right-0 bottom-0 z-40 fixed w-10 h-10 flex justify-center items-center bg-bg/50 hover:bg-main/50 backdrop-blur-2xl rounded-2xl text-text transition-colors duration-300 m-4 cursor-pointer"
    >
      <svg className="absolute w-full h-full text-text -rotate-90 pointer-events-none" viewBox="0 0 100 100">
        <rect x="2" y="2" width="96" height="96" rx="24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-10" />
        <motion.rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          pathLength="1"
          strokeDasharray="1"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <ChevronUp size={24} className="z-10" />

      <span className="right-14 bottom-3 absolute bg-text opacity-0 group-hover:opacity-75 rounded-full text-bg text-sm text-nowrap transition-all -translate-x-1 group-hover:translate-x-0 duration-300 px-2 pointer-events-none">
        Scroll to top
      </span>
    </motion.button>
  )
}
