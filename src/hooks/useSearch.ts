'use client'

import { useMemo } from 'react'
import db from '@/database/urbnlanes-db.json'

export type SearchCategory = 'Projects' | 'News' | 'Pages'

export interface SearchResult {
  id: string
  title: string
  description?: string
  category: SearchCategory
  image?: string
  url: string
  matchScore?: number
}

const STATIC_PAGES: { title: string; url: string }[] = [
  { title: 'Home', url: '/' },
  { title: 'About Us', url: '/about' },
  { title: 'Contact Us', url: '/get-in-touch' },
  { title: 'Careers', url: '/careers' },
  { title: 'Construction Updates', url: '/construction-updates' },
  { title: 'Media Center', url: '/media-center-news' },
  { title: 'Our Partners', url: '/partners-associates' },
  { title: 'Privacy Policy', url: '/privacy-policy' },
  { title: 'Terms of Use', url: '/terms-of-use' },
]

export const useSearch = () => {
  // Memoize the search index so we don't rebuild it on every render
  const searchIndex = useMemo(() => {
    const index: SearchResult[] = []

    // 1. Index Projects
    db.projects.forEach((project) => {
      const desc = project.shortDesc || project.tagline
      index.push({
        id: project.id,
        title: project.name,
        description: Array.isArray(desc) ? desc[0] : desc,
        category: 'Projects',
        image: project.gallery?.[0] || project.logo, // Prefer gallery image as thumbnail
        url: `/projects/${project.id}`,
      })
    })

    // 2. Index Media Center (Blogs/News)
    db.mediacenter.blogs.forEach((blog) => {
      index.push({
        id: blog.id,
        title: blog.title,
        // Strip HTML tags if any, though raw content looks clean
        description: Array.isArray(blog.content) ? blog.content[0] : blog.content,
        category: 'News',
        image: Array.isArray(blog.image) ? blog.image[0] : blog.image,
        url: `/media-center-news/${blog.id}`,
      })
    })

    db.mediacenter.news.forEach((newsItem) => {
      index.push({
        id: newsItem.id,
        title: newsItem.title,
        description: newsItem.category,
        category: 'News',
        image: Array.isArray(newsItem.image) ? newsItem.image[0] : newsItem.image,
        url: `/media-center-news/${newsItem.id}`, // Assuming they go to same detail page or just list? Let's assume list for now or generic detail if exists.
        // If news items are just links (source), we might redirect there?
        // Checking schema: news have 'source' but also internally an ID.
        // Let's assume internal page for consistency or external if strictly link.
        // Plan assumes local routes.
      })
    })

    // 3. Index Static Pages
    STATIC_PAGES.forEach((page) => {
      index.push({
        id: page.url,
        title: page.title,
        category: 'Pages',
        url: page.url,
      })
    })

    return index
  }, []) // Re-build only if db changes (it's static import so effectively once)

  const search = (query: string): SearchResult[] => {
    const trimmedQuery = query.trim().toLowerCase()
    if (!trimmedQuery) return []

    return searchIndex
      .map((item) => {
        let score = 0
        const titleMatch = item.title.toLowerCase().includes(trimmedQuery)
        const descMatch = item.description?.toLowerCase().includes(trimmedQuery)

        if (titleMatch) score += 10
        if (item.title.toLowerCase().startsWith(trimmedQuery)) score += 5 // Bonus for starting with query
        if (descMatch) score += 1

        return { ...item, matchScore: score }
      })
      .filter((item) => item.matchScore && item.matchScore > 0)
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 10) // Limit results
  }

  return { search }
}
