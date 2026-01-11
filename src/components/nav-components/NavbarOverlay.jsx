export default function NavbarOverlay({ navbarData }) {
  const {
    isMenuOpen,
    setIsMenuOpen,
    showSearch,
    setShowSearch,
    mobileMenuOpen,
    setMobileMenuOpen,
    languageSelectorOpen,
    setLanguageSelectorOpen,
  } = navbarData

  const handleClick = () => {
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

  const showOverlay = isMenuOpen || mobileMenuOpen || showSearch || languageSelectorOpen

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 xl:top-full w-full h-dvh bg-black/75 duration-300 z-10
        ${showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    />
  )
}
