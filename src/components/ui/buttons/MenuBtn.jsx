'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function MenuBtn({ className }) {
  const [toggle, setToggle] = useState(false)

  return (
    <div
      onClick={() => setToggle((x) => !x)}
      className={`group relative w-full h-full flex justify-center items-center cursor-pointer ${className}`}
    >
      <div className="relative grid justify-center items-center size-4 cursor-pointer">
        <motion.div
          animate={{ y: toggle ? 0 : '-5px', rotate: toggle ? 45 * 3 : 0 }}
          className="absolute w-full h-0.5 rounded-full bg-current"
        ></motion.div>
        <motion.div
          animate={{ opacity: toggle ? 0 : 1 }}
          transition={{ duration: 0.1 }}
          className="absolute w-full h-0.5 rounded-full bg-current"
        ></motion.div>
        <motion.div
          animate={{ y: toggle ? 0 : '5px', rotate: toggle ? -45 * 3 : 0 }}
          className="absolute w-full h-0.5 rounded-full bg-current"
        ></motion.div>
      </div>
    </div>
  )
}
