'use client'

import { useScrollPosition } from '@/hooks/useScrollPosition'
import NavLogo from '@/components/nav-components/NavLogo'
import NavLinks from '@/components/nav-components/NavLinks'
import SideNavnar from '@/components/nav-components/SideNavnar'

export default function Navbar() {
  const isScrolled20vh = useScrollPosition(0.2)
  const isScrolled100vh = useScrollPosition(1)

  return (
    <header className={`fixed top-0 border-b border-text/25 z-50`}>
      <main
        className={`relative w-screen flex justify-between items-center transition-all duration-700 gap-4 py-4 px-18 max-md:px-4 
        ${isScrolled20vh ? 'bg-bg' : ''}
        ${isScrolled100vh ? 'h-17' : 'h-34'}
      `}
      >
        <div className="relative flex justify-between items-center gap-12">
          <NavLogo />
          <NavLinks />
        </div>

        {/* <SideNavnar /> */}
        <span>asd</span>
      </main>
    </header>
  )
}
