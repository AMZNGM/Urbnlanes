'use client'

import { useMemo } from 'react'
import { navigation } from '@/config/navigation.ui.json'
import NavDropdown from '@/components/nav-components/NavDropdown'
import { ChevronDown } from 'lucide-react'

export default function NavLinks() {
  const links = useMemo(() => navigation.filter((link) => link.children?.length).sort((a, b) => a.order - b.order), [])

  return (
    <nav aria-label="Primary navigation">
      <ul className="flex justify-center items-center gap-4">
        {links.map((link, index) => (
          <li key={index} className="flex justify-center items-center text-sm bg-main">
            <NavDropdown label={link.name} items={link.children} />
            <ChevronDown />
          </li>
        ))}
      </ul>
    </nav>
  )
}
