'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/images/Urbnlanes-Logo.webp'

export default function NavLogo() {
  return (
    <motion.div initial={{ opacity: 0, y: -32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
      <Link href={'/'} aria-label="Urbnlanes home" className="relative inline-flex items-center select-none outline-none">
        <Image
          src={logo}
          alt="Urbnlanes"
          priority={true}
          className="h-8 max-md:h-6 w-auto object-contain transition-transform duration-300 ease-out hover:scale-103"
        />
      </Link>
    </motion.div>
  )
}
