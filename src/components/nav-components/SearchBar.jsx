import { forwardRef } from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'
import ProgressBar from '@/components/nav-components/ProgressBar'
import { useTranslation } from '@/hooks/useTranslation'

const SearchBar = forwardRef(({ navbarData }, ref) => {
  const { searchQuery, setSearchQuery, isLoading, showSearch, setShowSearch, handleSubmit, searchContainerRef } = navbarData
  const { t } = useTranslation()

  return (
    <>
      {showSearch && (
        <div
          ref={searchContainerRef}
          className="absolute top-full left-0 size-full bg-bg/75 backdrop-blur-xl shadow-2xl z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <ProgressBar isLoading={isLoading} />
          <div className="relative size-full flex justify-between items-center duration-300 gap-4 px-4">
            <input
              ref={ref}
              type="text"
              value={searchQuery}
              placeholder={t('search.placeholder')}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setShowSearch(false)
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              className="text-xl size-full focus:outline-none"
            />
            <div className="relative h-full flex justify-center items-center gap-4">
              <RippleEffect
                onClick={handleSubmit}
                className={`border border-text/50 duration-300 p-4 ${
                  searchQuery.trim() ? 'cursor-pointer hover:bg-text hover:text-bg' : 'cursor-not-allowed opacity-50'
                }`}
              >
                <SearchIcon className="size-5" />
              </RippleEffect>
              <RippleEffect
                onClick={() => setShowSearch(false)}
                className="border border-text/50 duration-300 p-4 hover:bg-text hover:text-bg rounded-full cursor-pointer"
              >
                <XIcon strokeWidth={1.5} />
              </RippleEffect>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={() => setShowSearch(false)}
        className={`fixed inset-0 h-[200vh] bg-bg/50 duration-500 z-40 ${showSearch ? 'opacity-80' : 'opacity-0 pointer-events-none'}`}
      />
    </>
  )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar
