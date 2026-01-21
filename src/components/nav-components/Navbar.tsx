'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { useNavbar } from '@/hooks/useNavbar'
import NavLogo from '@/components/nav-components/NavLogo'
import NavLinks from '@/components/nav-components/NavLinks'
import SearchTrigger from '@/components/nav-components/SearchTrigger'
import LanguageSelector from '@/components/nav-components/LanguageSelector'
import GetInTouchBtn from '@/components/nav-components/GetInTouchBtn'
import MenuBtn from '@/components/nav-components/MenuBtn'
import SideNavnar from '@/components/nav-components/SideNavnar'
import NavbarOverlay from '@/components/nav-components/NavbarOverlay'

export default function Navbar() {
  const pathname = usePathname()
  const navbarData = useNavbar()

  if (pathname === '/not-found') return null

  return (
    <header className="top-0 z-50 fixed">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: navbarData.isVisible ? 1 : 0,
          y: navbarData.isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.5 }}
      >
        <main
          className={`relative w-dvw flex justify-between items-center gap-8 hover:bg-bg transition-all duration-300 px-18 max-md:px-4 border-text/25 border-b
          ${navbarData.isScrolled20vh ? 'bg-black/50 h-24 backdrop-blur-2xl' : 'h-34 max-sm:h-24'}
        `}
        >
          <div className="z-20 relative h-full flex justify-between items-center gap-8">
            <NavLogo />
            <NavLinks navbarData={navbarData} className="max-xl:hidden" />
          </div>

          <div className="h-full flex justify-center items-center gap-8">
            <SearchTrigger navbarData={navbarData} className="max-xl:hidden" />
            <LanguageSelector navbarData={navbarData} className="max-xl:hidden" />
            <GetInTouchBtn navbarData={navbarData} />
            <MenuBtn navbarData={navbarData} className="xl:hidden" />
            <SideNavnar navbarData={navbarData} className="xl:hidden" />
          </div>

          <NavbarOverlay navbarData={navbarData} />
        </main>
      </motion.div>
    </header>
  )
}
