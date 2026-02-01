'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, KeyboardEvent } from 'react'
import { useSearch, SearchResult } from '@/hooks/useSearch'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useTranslation } from '@/translations/useTranslation'
import { NavbarTypes } from '@/types/nav'
import { SearchIcon } from 'lucide-react'
import { SoftLine } from '@/components/ui/effects/Lines'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import RippleEffect from '@/components/ui/effects/RippleEffect'
import SearchDropdown from '@/components/nav-components/SearchDropdown'

export default function SearchBar({ navbarData }: { navbarData: NavbarTypes }) {
  let { searchQuery, setSearchQuery, showSearch, setShowSearch, handleSubmit: originalHandleSubmit } = navbarData
  let { search } = useSearch()
  let { t } = useTranslation()
  let router = useRouter()
  let [results, setResults] = useState<SearchResult[]>([])
  let [selectedIndex, setSelectedIndex] = useState(-1)

  useBodyScrollLock(showSearch)

  useEffect(() => {
    let searchResults = search(searchQuery)
    const categoryOrder = ['Pages', 'Projects', 'News']
    const sortedResults = [...searchResults].sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.category)
      const bIndex = categoryOrder.indexOf(b.category)
      return aIndex - bIndex
    })
    setResults(sortedResults)
    setSelectedIndex(-1)
  }, [searchQuery, search])

  let handleSelect = (result: SearchResult) => {
    router.push(result.url)
    setShowSearch(false)
    setSearchQuery('')
  }

  let handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowSearch(false)
      return
    }

    if (!results.length) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex])
      } else {
        originalHandleSubmit()
      }
    }
  }

  return (
    <>
      {showSearch && (
        <div
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="z-50 fixed inset-0 flex justify-center items-start px-4 pt-[15vh] pointer-events-none"
        >
          <AnimIn duration={0.2} className="relative w-full max-w-4xl flex flex-col gap-2 pointer-events-auto">
            <div className="flex flex-col bg-bg/80 shadow-2xl backdrop-blur-xl border rounded-2xl p-4">
              <div className="flex p-4">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onKeyDown={handleKeyDown}
                  placeholder={t('search.placeholder')}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none font-light placeholder:text-text/20 text-2xl"
                />

                <div className="flex gap-2">
                  <RippleEffect
                    onClick={originalHandleSubmit}
                    className={`border rounded-full duration-300 p-2.5 ${searchQuery.trim() ? 'cursor-pointer hover:bg-text hover:text-bg' : 'cursor-not-allowed opacity-50'}`}
                  >
                    <SearchIcon size={20} />
                  </RippleEffect>

                  <CloseBtn onClick={() => setShowSearch(false)} className="bg-transparent hover:bg-text! rounded-full hover:text-black!" />
                </div>
              </div>

              <SoftLine className="mt-2! mb-4" />

              {searchQuery && (
                <AnimIn className="w-full">
                  <SearchDropdown results={results} selectedIndex={selectedIndex} onSelect={handleSelect} onHover={setSelectedIndex} />
                </AnimIn>
              )}
            </div>
          </AnimIn>
        </div>
      )}
    </>
  )
}
