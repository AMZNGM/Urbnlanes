'use client'

import { useMemo } from 'react'
import { navigation } from '@/config/navigation.ui.json'
import NavDropdown from '@/components/nav-components/NavDropdown'

export default function NavLinks() {
  const links = useMemo(() => navigation.filter((link) => link.children?.length).sort((a, b) => a.order - b.order), [])

  return (
    <nav aria-label="Primary navigation">
      <ul className="flex h-34 justify-center items-center">
        {links.map((link, index) => (
          <li key={index}>
            <NavDropdown label={link.name} items={link.children} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
