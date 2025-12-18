'use client'

import { useNavbar } from '@/hooks/useNavbar'
import { useLanguage } from '@/contexts/LanguageContext'
import NavLogo from '@/components/nav-components/NavLogo'
import NavLinks from '@/components/nav-components/NavLinks'
import SearchTrigger from '@/components/nav-components/SearchTrigger'
import LanguageSelector from '@/components/nav-components/LanguageSelector'
import SideNavnar from '@/components/nav-components/SideNavnar'
import MenuBtn from './MenuBtn'
import GetInTouchBtn from './GetInTouchBtn'

export default function Navbar() {
  const languageContext = useLanguage()
  const navbarData = useNavbar(languageContext)

  return (
    <header className="fixed top-0 border-b border-text/25 z-50 transition-transform duration-300">
      <main
        className={`relative w-screen h-34 flex justify-between items-center transition-all duration-500 gap-4 px-18 max-md:px-4 hover:bg-bg ${
          navbarData.isScrolled20vh ? 'bg-bg' : ''
        }`}
        style={{
          transform: navbarData.isClient ? (navbarData.isVisible ? 'translateY(0)' : 'translateY(-100%)') : 'translateY(0)',
        }}
      >
        <div className="relative h-full flex justify-between items-center gap-8">
          <NavLogo />
          <NavLinks navbarData={navbarData} className="max-xl:hidden" />
        </div>

        <SearchTrigger navbarData={navbarData} />
        <LanguageSelector navbarData={navbarData} />
        <GetInTouchBtn />
        <MenuBtn navbarData={navbarData} className="xl:hidden" />
        <SideNavnar navbarData={navbarData} className="xl:hidden" />
      </main>
    </header>
  )
}
