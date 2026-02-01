'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useScroll } from 'motion/react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useLanguage } from '@/translations/LanguageContext'
import { navigation } from '@/config/navigation.ui.json'
import { NavbarTypes, NavigationItem } from '@/types/nav'
import { useEventListener } from 'usehooks-ts'

export const useNavbar = (): NavbarTypes => {
  const router = useRouter()
  const languageContext = useLanguage()
  const navigations = useMemo(() => (navigation as NavigationItem[]).filter((link) => !!link.children?.length).sort((a, b) => a.order - b.order), [])
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [childOpen, setChildOpen] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleLabel, setVisibleLabel] = useState<number | null>(null)
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null)
  const [languageSelectorOpen, setLanguageSelectorOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isScrolled20vh = useScrollPosition(0.2)
  const isScrolled100vh = useScrollPosition(1)
  const [isVisible, setIsVisible] = useState(true)
  const { scrollY } = useScroll()
  const prevScrollY = useRef(0)
  const { languages, selectedLanguage, handleLanguageChange } = languageContext || {}
  const selectLabel = useCallback(() => setIsMenuOpen(true), [])
  const openNavbar = useCallback((index: number) => {
    setIsMenuOpen(true)
    setActiveIndex(index)
    setChildOpen(null)
  }, [])
  const closeNavbar = useCallback(() => {
    setIsMenuOpen(false)
    setActiveIndex(null)
    setChildOpen(null)
  }, [])

  // Mobile navigation handlers
  const resetSidebar = useCallback(() => {
    setMobileMenuOpen(false)
    setVisibleLabel(null)
    setLanguageSelectorOpen(false)
    setActiveSubIndex(null)
  }, [])

  const handleNavigation = useCallback(
    (slug: string) => {
      if (slug) router.push(slug)
      resetSidebar()
    },
    [router, resetSidebar]
  )

  const handleSubItemClick = useCallback(
    (item: { name: string; slug?: string; children?: unknown[] }) => {
      if (item?.children?.length) {
        const currentMainItem = typeof visibleLabel === 'number' ? navigations[visibleLabel] : null
        const children = currentMainItem?.children as { name: string }[] | undefined

        if (children) {
          setActiveSubIndex(children.findIndex((sub) => sub.name === item.name))
        }
        return
      }
      handleNavigation(item?.slug || '')
    },
    [navigations, visibleLabel, handleNavigation]
  )

  // Search handlers
  const toggleSearchBar = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault()
    setShowSearch((prev) => !prev)
  }, [])

  const performSearch = useCallback(() => {
    const query = searchQuery.trim()
    if (!query) return

    router.push(`/search?q=${encodeURIComponent(query)}`)
    setSearchQuery('')
    setShowSearch(false)
  }, [router, searchQuery])

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault()
      performSearch()
    },
    [performSearch]
  )

  const handleSubmit = useCallback(() => {
    const query = searchQuery.trim()
    if (!query) return

    setIsLoading(true)
    performSearch()
    setTimeout(() => setIsLoading(false), 500)
  }, [searchQuery, performSearch])

  // Scroll behavior - hide/show navbar
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

  // Keyboard shortcut for search
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'k') {
      e.preventDefault()
      setShowSearch((prev) => !prev)
    }
  })

  // Keyboard shortcut for lang selector
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === '/' && handleLanguageChange && selectedLanguage) {
      e.preventDefault()
      handleLanguageChange(selectedLanguage === 'English' ? { name: 'العربية' } : { name: 'English' })
    }
  })

  return {
    // Navigation state
    navigations,
    isClient,
    activeIndex,
    setActiveIndex,
    isMenuOpen,
    setIsMenuOpen,
    childOpen,
    setChildOpen,
    selectLabel,
    openNavbar,
    closeNavbar,

    // Mobile state
    mobileMenuOpen,
    setMobileMenuOpen,
    visibleLabel,
    setVisibleLabel,
    activeSubIndex,
    setActiveSubIndex,
    resetSidebar,
    handleNavigation,
    handleSubItemClick,

    // Language state
    languages,
    selectedLanguage,
    handleLanguageChange,
    languageSelectorOpen,
    setLanguageSelectorOpen,

    // Search state
    searchQuery,
    setSearchQuery,
    showSearch,
    setShowSearch,
    isLoading,
    setIsLoading,
    performSearch,
    handleSearch,
    handleSubmit,
    toggleSearchBar,

    // Scroll state
    isScrolled20vh,
    isScrolled100vh,
    scrolled100vh: isScrolled100vh,
    isVisible,
  }
}
