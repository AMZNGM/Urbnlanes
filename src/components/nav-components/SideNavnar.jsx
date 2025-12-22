import { motion } from 'motion/react'
import MobileSearch from '@/components/nav-components/MobileSearch'
import MobileMenuLinks from '@/components/nav-components/MobileMenuLinks'
import MobileDropdown from '@/components/nav-components/MobileDropdown'
import MobileLanguageSelector from '@/components/nav-components/MobileLanguageselector'

export default function SideNavnar({ className = '', navbarData }) {
  const { mobileMenuOpen, visibleLabel } = navbarData

  return (
    <motion.aside
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, x: '100%' }}
      animate={{
        opacity: mobileMenuOpen ? 1 : 0,
        x: mobileMenuOpen
          ? 0
          : typeof window !== 'undefined' && window.getComputedStyle(document.documentElement).direction === 'rtl'
          ? '-100%'
          : '100%',
      }}
      exit={{ opacity: 0, x: '-100%' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.4, ease: 'easeInOut' }}
      className={`fixed top-0 bottom-0 rtl:left-0 ltr:right-0 w-full h-screen max-w-md bg-bg shadow-2xl z-50 ${className} `}
    >
      <MobileSearch navbarData={navbarData} />
      <MobileMenuLinks navbarData={navbarData} />
      <MobileDropdown key={visibleLabel ?? 'root'} navbarData={navbarData} />
      <MobileLanguageSelector navbarData={navbarData} />
    </motion.aside>
  )
}
