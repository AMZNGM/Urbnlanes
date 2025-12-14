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
        className={`relative w-screen flex justify-between items-center transition-all duration-500 gap-4 px-18 max-md:px-4 hover:bg-bg
        ${isScrolled20vh ? 'bg-bg' : ''}
        ${isScrolled100vh ? 'h-17' : 'h-34'}
      `}
      >
        <div className="relative h-full flex justify-between items-center gap-12">
          <NavLogo />
          <NavLinks className="max-xl:hidden" />
        </div>

        {/* <SideNavnar className="xl:hidden" /> */}
        <span>asd</span>
      </main>
    </header>
  )
}
