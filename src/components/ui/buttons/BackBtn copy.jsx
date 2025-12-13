'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function BackBtn({ className }) {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button
      onClick={handleBack}
      aria-label="Go back to previous page"
      className={`absolute top-4 right-4 transform transition-all duration-300 hover:scale-110 active:scale-95 ${className}`}
    >
      <RippleEffect
        className={`group relative w-full h-full grid justify-center items-center text-text bg-text/10 hover:bg-text/20 rounded-full shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer p-2 ${className}`}
      >
        <div className="absolute inset-0 bg-main/0 group-hover:bg-main/10 rounded-full transition-all duration-300" />
        <ChevronLeft className="group-hover:-translate-x-1 transition-transform duration-500 ease-out" />
        <div className="absolute left-1/2 h-0.5 w-2 origin-left scale-x-0 bg-current transition-all duration-300 ease-out group-hover:left-4.5 group-hover:scale-x-100" />
        <div className="absolute inset-0 rounded-full border border-text/0 group-hover:border-text/20 transition-all duration-300" />
      </RippleEffect>
    </button>
  )
}

// const MenuIcon = ({ className }: { className?: string }) => {
//   const [toggle, setToggle] = useState(false)

//   return (
//     <div onClick={() => setToggle((x) => !x)} className={cn('group flex size-full cursor-pointer items-center justify-center', className)}>
//       <div className="relative grid size-4 cursor-pointer items-center justify-center">
//         <motion.div
//           animate={{ y: toggle ? 0 : '-5px', rotate: toggle ? 45 : 0 }}
//           className="absolute h-0.5 w-full rounded-full bg-current"
//         ></motion.div>
//         <motion.div
//           animate={{ opacity: toggle ? 0 : 1 }}
//           transition={{ duration: 0.1 }}
//           className="absolute h-0.5 w-full rounded-full bg-current"
//         ></motion.div>
//         <motion.div
//           animate={{ y: toggle ? 0 : '5px', rotate: toggle ? -45 : 0 }}
//           className="absolute h-0.5 w-full rounded-full bg-current"
//         ></motion.div>
//       </div>
//     </div>
//   )
// }
