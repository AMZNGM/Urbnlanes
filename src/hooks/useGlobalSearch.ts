'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useEventListener } from 'usehooks-ts'
import { useTranslation } from '@/translations/useTranslation'
import db from '@/database/urbnlanes-db.json'

export interface SearchResult {
  id: string
  title: string
  description?: string
  category: SearchCategory
  image?: string
  url: string
  matchScore?: number
}

export interface GlobalSearchState {
  searchQuery: string
  setSearchQuery: (query: string) => void
  showSearch: boolean
  setShowSearch: (show: boolean) => void
  results: any[]
  popularSuggestions: SearchResult[]
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  handleSelect: (result: any) => void
  handleClose: () => void
  togglePanel: () => void
  selectedFilter: SearchCategory | 'all'
  setSelectedFilter: (filter: SearchCategory | 'all') => void
  filters: { value: SearchCategory | 'all'; label: string }[]
  resetFilters: () => void
}

export type SearchCategory = 'pages' | 'projects' | 'news'

const STATIC_PAGES: { title: string; url: string }[] = [
  { title: 'Home', url: '/' },
  { title: 'About Us', url: '/about' },
  { title: 'Projects', url: '/projects' },
  { title: 'Contact Us', url: '/get-in-touch' },
  { title: 'Careers', url: '/careers' },
  { title: 'Team', url: '/team' },
  { title: 'Construction Updates', url: '/construction-updates' },
  { title: 'News', url: '/media-center-news' },
  { title: 'Our Partners', url: '/partners-associates' },
  { title: 'Privacy Policy', url: '/privacy-policy' },
  { title: 'Terms of Use', url: '/terms-of-use' },
  { title: 'Cookie Policy', url: '/cookie-policy' },
]

export function useGlobalSearch(): GlobalSearchState {
  let router = useRouter()
  let { t } = useTranslation()
  let [searchQuery, setSearchQuery] = useState('')
  let [showSearch, setShowSearch] = useState(false)
  let [results, setResults] = useState<any[]>([])
  let [selectedIndex, setSelectedIndex] = useState(-1)
  let [selectedFilter, setSelectedFilter] = useState<SearchCategory | 'all'>('all')

  let filters = [
    { value: 'all' as const, label: t('search.all') },
    { value: 'pages' as const, label: t('search.pages') },
    { value: 'projects' as const, label: t('search.projects') },
    { value: 'news' as const, label: t('search.news') },
  ]

  const searchIndex = useMemo(() => {
    const index: SearchResult[] = []

    // 1. Index Projects
    db.projects.forEach((project) => {
      const desc = project.shortDesc || project.tagline
      index.push({
        id: project.id,
        title: project.name,
        description: Array.isArray(desc) ? desc[0] : desc,
        category: 'projects',
        image: project.gallery?.[0] || project.logo,
        url: `/projects/${project.id}`,
      })
    })

    // 2. Index Blogs
    db.mediacenter.blogs.forEach((blog) => {
      index.push({
        id: blog.id,
        title: blog.title,
        description: Array.isArray(blog.content) ? blog.content[0] : blog.content,
        category: 'news',
        image: Array.isArray(blog.image) ? blog.image[0] : blog.image,
        url: `/media-center-news/${blog.id}`,
      })
    })

    // 3. Index News
    db.mediacenter.news.forEach((newsItem) => {
      index.push({
        id: newsItem.id,
        title: newsItem.title,
        description: newsItem.category,
        category: 'news',
        image: Array.isArray(newsItem.image) ? newsItem.image[0] : newsItem.image,
        url: `/media-center-news/${newsItem.id}`,
      })
    })

    // 4. Index Static Pages
    STATIC_PAGES.forEach((page) => {
      index.push({
        id: page.url,
        title: page.title,
        category: 'pages',
        url: page.url,
      })
    })

    return index
  }, [])

  const popularSuggestions = useMemo(() => {
    const pages = searchIndex.filter((i) => i.category === 'pages').slice(0, 3)
    const projects = searchIndex.filter((i) => i.category === 'projects').slice(0, 4)
    const news = searchIndex.filter((i) => i.category === 'news').slice(0, 3)
    return [...pages, ...projects, ...news]
  }, [searchIndex])

  let search = (query: string): SearchResult[] => {
    let trimmedQuery = query.trim().toLowerCase()
    if (!trimmedQuery) return []

    return searchIndex
      .map((item) => {
        let score = 0
        let titleMatch = item.title.toLowerCase().includes(trimmedQuery)
        let descMatch = item.description?.toLowerCase().includes(trimmedQuery)

        if (titleMatch) score += 10
        if (item.title.toLowerCase().startsWith(trimmedQuery)) score += 5
        if (descMatch) score += 1

        return { ...item, matchScore: score }
      })
      .filter((item) => {
        if (selectedFilter !== 'all' && item.category !== selectedFilter) {
          return false
        }
        return item.matchScore && item.matchScore > 0
      })
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    // .slice(0, 20) // Limit results
  }

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults(popularSuggestions)
      setSelectedIndex(popularSuggestions.length > 0 ? 0 : -1)
      return
    }
    let searchResults = search(searchQuery)
    let categoryOrder = ['pages', 'projects', 'news']
    let sortedResults = [...searchResults].sort((a, b) => {
      let aIndex = categoryOrder.indexOf(a.category)
      let bIndex = categoryOrder.indexOf(b.category)
      return aIndex - bIndex
    })
    setResults(sortedResults)
    setSelectedIndex(sortedResults.length > 0 ? 0 : -1)
  }, [searchQuery, selectedFilter, search, popularSuggestions])

  let handleSelect = (result: any) => {
    router.push(result.url)
    setShowSearch(false)
    setSearchQuery('')
  }

  let handleClose = () => {
    setSearchQuery('')
    setShowSearch(false)
  }

  let togglePanel = () => {
    setShowSearch((prev) => !prev)
  }

  let resetFilters = () => {
    setSelectedFilter('all')
    setSearchQuery('')
  }

  useEventListener('keydown', (e) => {
    if (showSearch && e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (showSearch && e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    } else if (showSearch && e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex])
      }
    }
  })

  return {
    searchQuery,
    setSearchQuery,
    showSearch,
    setShowSearch,
    results,
    popularSuggestions,
    selectedIndex,
    setSelectedIndex,
    handleSelect,
    handleClose,
    togglePanel,
    selectedFilter,
    setSelectedFilter,
    filters,
    resetFilters,
  }
}
