import { motion, AnimatePresence } from 'motion/react'
import { forwardRef } from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
import { useTranslation } from '@/translations/useTranslation'
import RippleEffect from '@/components/ui/effects/RippleEffect'
import { NavbarData } from '@/types/nav'

interface SearchBarProps {
  navbarData: NavbarData
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({ navbarData }, ref) => {
  const { searchQuery, setSearchQuery, showSearch, setShowSearch, handleSubmit, searchContainerRef } = navbarData
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {showSearch && (
        <motion.div
          ref={searchContainerRef}
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          // transition={{ duration: 0.25 }}
          className="top-full left-0 z-20 absolute size-full bg-bg shadow-2xl backdrop-blur-xl px-14 max-md:px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative size-full flex justify-between items-center gap-4 duration-300 px-4">
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
              className="size-full focus:outline-none text-xl"
            />
            <div className="relative h-full flex justify-center items-center gap-4">
              <RippleEffect
                onClick={handleSubmit}
                className={`border border-text/50 rounded-full duration-300 p-4 ${
                  searchQuery.trim() ? 'cursor-pointer hover:bg-text hover:text-bg' : 'cursor-not-allowed opacity-50'
                }`}
              >
                <SearchIcon size={20} />
              </RippleEffect>
              <RippleEffect
                onClick={() => setShowSearch(false)}
                className="hover:bg-text border border-text/50 rounded-full hover:text-bg duration-300 p-4 cursor-pointer"
              >
                <XIcon size={20} />
              </RippleEffect>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar
