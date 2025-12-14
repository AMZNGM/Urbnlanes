'use client'

import { useMemo, useState } from 'react'
import { navigation } from '@/config/navigation.ui.json'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import NavDropdown from '@/components/nav-components/NavDropdown'
import Indicator from '@/components/ui/effects/Indicator'

export default function NavLinks({ className = '' }) {
  const links = useMemo(() => navigation.filter((link) => link.children?.length).sort((a, b) => a.order - b.order), [])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [childOpen, setChildOpen] = useState(null)

  return (
    <nav
      aria-label="Primary navigation"
      onMouseEnter={() => {
        setIsMenuOpen(true)
      }}
      onMouseLeave={() => {
        setIsMenuOpen(false)
        setActiveIndex(null)
        setChildOpen(null)
      }}
      className={`relative w-full h-full ${className}`}
    >
      <motion.ul
        className="relative w-full h-full flex justify-center items-center"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
      >
        {links.map((link, index) => (
          <motion.li
            key={index}
            onMouseEnter={() => {
              setActiveIndex(index)
              setChildOpen(null)
            }}
            className="relative shrink-0 h-full"
            variants={{
              hidden: { opacity: 0, y: -16 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Indicator className="group relative h-full flex justify-center items-center max-2xl:text-sm gap-1 px-4">
              <NavDropdown
                isActive={isMenuOpen && activeIndex === index}
                childOpen={childOpen}
                setChildOpen={setChildOpen}
                label={link.name}
                childrens={link.children}
              />
              <ChevronDown size={20} className="group-hover:rotate-180 transition-all duration-300" />
            </Indicator>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  )
}
