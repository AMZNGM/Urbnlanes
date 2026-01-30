'use client'

import { useState, useEffect } from 'react'
import { useSearch, SearchResult } from '@/hooks/useSearch'
import { useTranslation } from '@/translations/useTranslation'
import { NavbarTypes } from '@/types/nav'
import { SearchIcon } from 'lucide-react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import MenuBtn from '@/components/nav-components/MenuBtn'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import SearchDropdown from '@/components/nav-components/SearchDropdown'

export default function MobileSearch({ navbarData }: { navbarData: NavbarTypes }) {
  let { searchQuery, setSearchQuery } = navbarData
  let { t } = useTranslation()
  let { search } = useSearch()
  let [results, setResults] = useState<SearchResult[]>([])
  let [selectedIndex, setSelectedIndex] = useState(-1)

  let handleSelect = (result: SearchResult) => {
    window.location.href = result.url
    setSearchQuery('')
    setResults([])
  }

  useEffect(() => {
    const searchResults = search(searchQuery)
    setResults(searchResults)
    setSelectedIndex(-1)
  }, [searchQuery, search])

  return (
    <div className={`relative h-24 bg-bg border-b ${navbarData.isScrolled20vh ? 'h-24' : 'h-34 max-sm:h-24'}`}>
      <div className="relative w-full h-full flex items-center">
        <div className="relative h-full flex items-center gap-4 hover:bg-main/25 transition-colors ps-8 grow">
          <SearchIcon size={20} />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full h-full bg-transparent outline-none text-xl placeholder-main"
          />
          {searchQuery && <CloseBtn onClick={() => setSearchQuery('')} className="right-4 absolute!" />}
        </div>

        <MenuBtn navbarData={navbarData} className="hover:bg-main/25 border-main/25 rtl:border-r ltr:border-l transition-colors px-14" />
      </div>

      {searchQuery && (
        <div className="top-full right-0 left-0 absolute w-full px-4 pt-2">
          <AnimIn spring blur duration={0.2} className="w-full bg-bg shadow-2xl">
            <SearchDropdown results={results} selectedIndex={selectedIndex} onSelect={handleSelect} onHover={setSelectedIndex} />
          </AnimIn>
        </div>
      )}
    </div>
  )
}
