import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useScroll } from 'motion/react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { navigation } from '@/config/navigation.ui.json'

export const useNavbar = (languageContext) => {
  const router = useRouter()
  const navigations = useMemo(() => navigation.filter((link) => link.children?.length).sort((a, b) => a.order - b.order), [])

  const isScrolled20vh = useScrollPosition(0.2)
  const isScrolled100vh = useScrollPosition(1)
  const [isVisible, setIsVisible] = useState(true)
  const { scrollY } = useScroll()
  const prevScrollY = useRef(0)

  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchContainerRef = useRef(null)
  const searchInputRef = useRef(null)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleLabel, setVisibleLabel] = useState(null)
  const [languageSelectorOpen, setLanguageSelectorOpen] = useState(false)
  const [activeSubIndex, setActiveSubIndex] = useState(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [childOpen, setChildOpen] = useState(null)
  const [isClient, setIsClient] = useState(false)

  const { languages, selectedLanguage, handleLanguageChange } = languageContext || {}

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 1. Auto-focus hide navbar when scroll
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const isScrolledPast100vh = latest > window.innerHeight
      const diff = latest - prevScrollY.current

      if (isScrolledPast100vh) {
        if (diff > 10) {
          setIsVisible(false)
        } else if (diff < -10) {
          setIsVisible(true)
        }
      } else {
        setIsVisible(true)
      }
      prevScrollY.current = latest
    })
  }, [scrollY])

  // 2. Auto-focus search input when search bar opens
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  // 3. Keyboard shortcut: Ctrl+K or Cmd+K to toggle search bar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearch((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 4. Perform search logic - controls global search
  const performSearch = useCallback(() => {
    const query = searchQuery.trim()
    if (!query) return

    router.push(`/search?q=${encodeURIComponent(query)}`)
    setSearchQuery('')
    setShowSearch(false)
  }, [router, searchQuery])

  // 5. Handle search (with event)
  const handleSearch = useCallback(
    (e) => {
      e?.preventDefault()
      performSearch()
    },
    [performSearch]
  )

  // 6. Handle submit (with loading state)
  const handleSubmit = useCallback(() => {
    const query = searchQuery.trim()
    if (!query) return

    setIsLoading(true)
    performSearch()
    setTimeout(() => setIsLoading(false), 500)
  }, [searchQuery, performSearch])

  // 7. Toggle search bar
  const toggleSearchBar = useCallback((e) => {
    e?.preventDefault()
    setShowSearch((prev) => !prev)
  }, [])

  // 8. Mobile dropdown navigation logic
  const resetSidebar = useCallback(() => {
    setMobileMenuOpen(false)
    setVisibleLabel(null)
    setLanguageSelectorOpen(false)
    setActiveSubIndex(null)
  }, [])

  const handleNavigation = useCallback(
    (slug) => {
      if (slug) router.push(slug)
      resetSidebar()
    },
    [router, resetSidebar]
  )

  const handleSubItemClick = useCallback(
    (item) => {
      if (item?.children?.length) {
        const currentMainItem = navigations[visibleLabel]
        if (currentMainItem) {
          setActiveSubIndex(currentMainItem.children.findIndex((sub) => sub.name === item.name))
        }
        return
      }
      handleNavigation(item?.slug)
    },
    [navigations, visibleLabel, handleNavigation]
  )

  const handleMouseLeave = useCallback(() => {
    setIsMenuOpen(false)
    setActiveIndex(null)
    setChildOpen(null)
  }, [])

  return {
    navigations,
    searchQuery,
    setSearchQuery,
    showSearch,
    setShowSearch,
    isLoading,
    setIsLoading,
    searchContainerRef,
    searchInputRef,
    performSearch,
    handleSearch,
    handleSubmit,
    toggleSearchBar,
    mobileMenuOpen,
    setMobileMenuOpen,
    visibleLabel,
    setVisibleLabel,
    languageSelectorOpen,
    setLanguageSelectorOpen,
    resetSidebar,
    isMenuOpen,
    setIsMenuOpen,
    activeIndex,
    setActiveIndex,
    childOpen,
    setChildOpen,
    handleMouseLeave,
    activeSubIndex,
    setActiveSubIndex,
    handleNavigation,
    handleSubItemClick,
    isScrolled20vh,
    isScrolled100vh,
    scrolled100vh: isScrolled100vh,
    isVisible,
    isClient,
    languages,
    selectedLanguage,
    handleLanguageChange,
  }
}
