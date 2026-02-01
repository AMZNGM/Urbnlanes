'use client'

import { useState, useMemo } from 'react'
import { useEventListener } from 'usehooks-ts'
import db from '@/database/urbnlanes-db.json'

export interface NewsArticle {
  id: string
  type: string
  category: string
  title: string
  content?: string | string[]
  image?: string | string[]
  source?: string
  date: string
}

export function useNews() {
  let [searchQuery, setSearchQuery] = useState('')
  let [selectedFilter, setSelectedFilter] = useState<string>('all')
  let [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'az' | 'za'>('newest')
  let [isOpen, setIsOpen] = useState(false)

  let allItems = useMemo(() => {
    let blogs = (db.mediacenter.blogs || []).map((item) => ({ ...item, type: 'Blog Post' }))
    let news = (db.mediacenter.news || []).map((item) => ({ ...item, type: 'News' }))

    return [...blogs, ...news]
  }, [])

  let filteredItems = useMemo(() => {
    let result = [...allItems]

    // 1. Category Filter
    if (selectedFilter !== 'all') {
      result = result.filter((item) => (selectedFilter === 'blog' && item.type === 'Blog Post') || (selectedFilter === 'news' && item.type === 'News'))
    }

    // 2. Search Filter
    if (searchQuery.trim()) {
      let query = searchQuery.toLowerCase()
      result = result.filter((item) => item.title.toLowerCase().includes(query) || (item.category && item.category.toLowerCase().includes(query)))
    }

    // 3. Sort Order
    let parseDate = (date: string) => new Date(date.split('/').reverse().join('-')).getTime()

    return result.sort((a, b) => {
      if (sortOrder === 'az') return a.title.localeCompare(b.title)
      if (sortOrder === 'za') return b.title.localeCompare(a.title)

      let dateA = parseDate(a.date)
      let dateB = parseDate(b.date)

      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })
  }, [selectedFilter, searchQuery, sortOrder, allItems])

  let resetFilters = () => {
    setSelectedFilter('all')
    setSearchQuery('')
    setSortOrder('newest')
  }

  let handleClose = () => {
    setIsOpen(false)
    !filteredItems.length && resetFilters()
  }

  let togglePanel = () => {
    isOpen ? handleClose() : setIsOpen(true)
  }

  let filters = [
    { id: 'all', label: 'common.all' },
    { id: 'blog', label: 'common.blogs' },
    { id: 'news', label: 'common.news' },
  ]

  let sortOrders = [
    { id: 'newest', label: 'Newest' },
    { id: 'oldest', label: 'Oldest' },
    { id: 'az', label: 'A-Z' },
    { id: 'za', label: 'Z-A' },
  ]

  useEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      setSearchQuery('')
      handleClose()
    }
  })

  return {
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    sortOrder,
    setSortOrder,
    isOpen,
    setIsOpen,
    filteredItems,
    filters,
    sortOrders,
    resetFilters,
    handleClose,
    togglePanel,
  }
}
