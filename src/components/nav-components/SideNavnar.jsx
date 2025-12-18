import MobileSearch from '@/components/nav-components/MobileSearch'
import MobileMenuLinks from '@/components/nav-components/MobileMenuLinks'
import MobileDropdown from '@/components/nav-components/MobileDropdown'
import MobileLanguageSelector from '@/components/nav-components/MobileLanguageselector'

export default function SideNavnar({ className = '', navbarData }) {
  const {
    searchQuery,
    setSearchQuery,
    handleSearch,
    isLoading,
    setIsLoading,
    mobileMenuOpen,
    setMobileMenuOpen,
    resetSidebar,
    selectedLanguage,
    languageSelectorOpen,
    setLanguageSelectorOpen,
    handleLanguageChange,
    languages,
    visibleLabel,
    setVisibleLabel,
    navigations,
  } = navbarData
  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      className={`fixed top-0 right-0 w-full h-screen max-w-[calc(100%-3.5rem)] sm:max-w-md bg-bg/97 backdrop-blur-xl overflow-hidden duration-500 ease-in-out touch-none z-50 ${className} ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <MobileSearch navbarData={navbarData} />
      <MobileMenuLinks navbarData={navbarData} />
      <MobileDropdown key={visibleLabel ?? 'root'} navbarData={navbarData} />
      <MobileLanguageSelector navbarData={navbarData} />
    </aside>
  )
}
