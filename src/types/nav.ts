import { Dispatch, SetStateAction, RefObject } from 'react'

export interface NavigationItem {
  order: number
  name: string
  slug?: string
  children?: NavigationItem[]
}

export interface NavbarData {
  navigations: NavigationItem[]
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
  showSearch: boolean
  setShowSearch: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  searchContainerRef: RefObject<HTMLDivElement | null>
  searchInputRef: RefObject<HTMLInputElement | null>
  performSearch: () => void
  handleSearch: (e?: React.FormEvent) => void
  handleSubmit: () => void
  toggleSearchBar: (e?: React.MouseEvent) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>
  visibleLabel: number | null
  setVisibleLabel: Dispatch<SetStateAction<number | null>>
  languageSelectorOpen: boolean
  setLanguageSelectorOpen: Dispatch<SetStateAction<boolean>>
  resetSidebar: () => void
  isMenuOpen: boolean
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  activeIndex: number | null
  setActiveIndex: Dispatch<SetStateAction<number | null>>
  childOpen: number | null
  setChildOpen: Dispatch<SetStateAction<number | null>>
  handleMouseLeave: () => void
  activeSubIndex: number | null
  setActiveSubIndex: Dispatch<SetStateAction<number | null>>
  handleNavigation: (slug: string) => void
  handleSubItemClick: (item: { name: string; slug?: string; children?: unknown[] }) => void
  isScrolled20vh: boolean
  isScrolled100vh: boolean
  scrolled100vh: boolean
  isVisible: boolean
  isClient: boolean
  languages: { name: string; code: string }[]
  selectedLanguage: string
  handleLanguageChange: (language: { name: string }) => void
}
