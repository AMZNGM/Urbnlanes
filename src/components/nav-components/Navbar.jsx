'use client'

import { useScrollPosition } from '@/hooks/useScrollPosition'
import NavLogo from '@/components/nav-components/NavLogo'

export default function Navbar() {
  const isScrolled20vh = useScrollPosition(0.2)
  const isScrolled100vh = useScrollPosition(1)

  return (
    <header
      className={`fixed top-0 border-b border-text/25 transition-all duration-700 z-50
        ${isScrolled20vh ? 'bg-bg' : ''}
      `}
    >
      <main
        className={`relative w-screen flex justify-between items-center gap-4 overflow-hidden duration-700 py-4 px-18 max-md:px-4 
        ${isScrolled100vh ? 'min-h-17' : 'min-h-34'}
      `}
      >
        <NavLogo />
        asd
      </main>
    </header>
  )
}
