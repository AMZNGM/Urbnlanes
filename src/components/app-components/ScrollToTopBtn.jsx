'use client'

import { motion } from 'motion/react'
import { ChevronUp } from 'lucide-react'
import { useScrollPosition } from '@/hooks/useScrollPosition'

export default function ScrollToTopBtn() {
  const isScrolled100vh = useScrollPosition(0.8)

  return (
    <motion.button
      aria-label="Scroll to top"
      aria-controls="scroll-to-top"
      initial={{ opacity: isScrolled100vh ? 1 : 0, y: isScrolled100vh ? 0 : '100%' }}
      animate={{ opacity: isScrolled100vh ? 1 : 0, y: isScrolled100vh ? 0 : '100%' }}
      transition={{ type: 'spring', duration: 0.2, stiffness: 100 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group right-4 bottom-4 z-40 fixed w-10 h-10 flex justify-center items-center bg-bg hover:bg-main shadow-lg rounded-full text-main hover:text-bg transition-colors duration-300 cursor-pointer"
    >
      <ChevronUp size={20} />

      <span className="right-12 bottom-2.5 absolute bg-main opacity-0 group-hover:opacity-75 rounded-full text-bg text-sm text-nowrap transition-all -translate-x-1 group-hover:translate-x-0 duration-300 px-2">
        Scroll to top
      </span>
    </motion.button>
  )
}
