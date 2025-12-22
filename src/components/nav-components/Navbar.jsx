'use client'

import { motion } from 'motion/react'
import { useNavbar } from '@/hooks/useNavbar'
import { useLanguage } from '@/contexts/LanguageContext'
import NavLogo from '@/components/nav-components/NavLogo'
import NavLinks from '@/components/nav-components/NavLinks'
import SearchTrigger from '@/components/nav-components/SearchTrigger'
import LanguageSelector from '@/components/nav-components/LanguageSelector'
import GetInTouchBtn from '@/components/nav-components/GetInTouchBtn'
import MenuBtn from '@/components/nav-components/MenuBtn'
import SideNavnar from '@/components/nav-components/SideNavnar'
import NavbarOverlay from '@/components/nav-components/NavbarOverlay'

export default function Navbar() {
  const languageContext = useLanguage()
  const navbarData = useNavbar(languageContext)

  return (
    <header className="fixed top-0 border-b border-text/25 z-50">
      <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
        <main
          className={`relative w-screen h-34 max-sm:h-24 flex justify-between items-center gap-8 hover:bg-bg transition-colors px-18 max-2xl:px-4
          ${navbarData.isScrolled20vh || navbarData.showSearch ? 'bg-bg/10 backdrop-blur-2xl' : ''}
        `}
        >
          <div className="relative h-full flex justify-between items-center gap-8">
            <NavLogo />
            <NavLinks navbarData={navbarData} className="max-2xl:hidden" />
          </div>

          <div className="h-full flex justify-center items-center gap-4">
            <SearchTrigger navbarData={navbarData} className="max-2xl:hidden" />
            <LanguageSelector navbarData={navbarData} className="max-2xl:hidden" />
            <GetInTouchBtn navbarData={navbarData} />
            <MenuBtn navbarData={navbarData} className="2xl:hidden" />
            <SideNavnar navbarData={navbarData} className="2xl:hidden" />
          </div>

          <NavbarOverlay navbarData={navbarData} />
        </main>
      </motion.div>
    </header>
  )
}
