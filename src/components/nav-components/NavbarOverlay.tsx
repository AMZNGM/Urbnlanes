import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { NavbarTypes } from '@/types/nav'

export default function NavbarOverlay({ navbarData }: { navbarData: NavbarTypes }) {
  let { isMenuOpen, setIsMenuOpen, showSearch, setShowSearch, mobileMenuOpen, setMobileMenuOpen, languageSelectorOpen, setLanguageSelectorOpen } = navbarData

  let handleClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
    if (showSearch) {
      setShowSearch(false)
    }
    if (languageSelectorOpen) {
      setLanguageSelectorOpen(false)
    }
  }

  let showOverlay = isMenuOpen || mobileMenuOpen || showSearch || languageSelectorOpen

  useBodyScrollLock(showOverlay)

  return (
    <div
      onClick={handleClick}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className={`fixed inset-0 w-dvw h-dvh bg-black/25 duration-300 z-10
        ${showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    />
  )
}
