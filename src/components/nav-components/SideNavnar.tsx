'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/translations/LanguageContext'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { NavbarTypes } from '@/types/nav'
import MobileSearch from '@/components/nav-components/MobileSearch'
import MobileMenuLinks from '@/components/nav-components/MobileMenuLinks'
import MobileDropdown from '@/components/nav-components/MobileDropdown'
import MobileLanguageSelector from '@/components/nav-components/MobileLanguageselector'

export default function SideNavnar({ className = '', navbarData }: { className?: string; navbarData: NavbarTypes }) {
  let { mobileMenuOpen, visibleLabel } = navbarData
  let { selectedLanguage } = useLanguage()
  useBodyScrollLock(mobileMenuOpen)

  return (
    <motion.aside
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      initial={{ opacity: 0, x: selectedLanguage === 'English' ? '100%' : '-100%' }}
      animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : selectedLanguage === 'English' ? '100%' : '-100%' }}
      exit={{ opacity: 0, x: selectedLanguage === 'English' ? '100%' : '-100%' }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, duration: 0.4, ease: 'easeInOut' }}
      className={`fixed top-0 bottom-0 rtl:left-0 ltr:right-0 w-dvw h-dvh max-w-md overflow-y-auto bg-bg ltr:border-s rtl:border-r border-main/25 shadow-2xl z-50 flex flex-col ${className} `}
    >
      <div className="relative overflow-y-auto grow">
        <MobileSearch navbarData={navbarData} />
        <MobileMenuLinks navbarData={navbarData} />
        <MobileDropdown key={visibleLabel ?? 'root'} navbarData={navbarData} />
      </div>
      <MobileLanguageSelector navbarData={navbarData} />
    </motion.aside>
  )
}
