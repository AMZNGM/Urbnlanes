'use client'

import { useMemo } from 'react'
import { navigation } from '@/config/navigation.ui.json'
import { ChevronDown } from 'lucide-react'
import NavDropdown from '@/components/nav-components/NavDropdown'
import Indicator from '@/components/ui/effects/Indicator'

export default function NavLinks({ className = '' }) {
  const links = useMemo(() => navigation.filter((link) => link.children?.length).sort((a, b) => a.order - b.order), [])

  return (
    <nav aria-label="Primary navigation" className={`relative w-full h-full ${className}`}>
      <ul className="relative w-full h-full flex justify-center items-center">
        {links.map((link, index) => (
          <li key={index} className="relative shrink-0 h-full">
            <Indicator className="group relative h-full flex justify-center items-center max-2xl:text-sm gap-1 px-4">
              <NavDropdown label={link.name} items={link.children} />
              <ChevronDown size={20} className="group-hover:rotate-180 transition-all duration-300" />
            </Indicator>
          </li>
        ))}
      </ul>
    </nav>
  )
}
