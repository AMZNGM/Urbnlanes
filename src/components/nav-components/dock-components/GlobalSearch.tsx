'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useTranslation } from '@/translations/useTranslation'
import { Search, X } from 'lucide-react'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import LetterSwap from '@/components/ui/text/LetterSwap'
import GlobalSearchDropdown from '@/components/nav-components/dock-components/GlobalSearchDropdown'
import type { GlobalSearchState } from '@/hooks/useGlobalSearch'

export default function GlobalSearch({
  className,
  searchQuery,
  setSearchQuery,
  showSearch,
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
}: Pick<
  GlobalSearchState,
  | 'searchQuery'
  | 'setSearchQuery'
  | 'showSearch'
  | 'results'
  | 'popularSuggestions'
  | 'selectedIndex'
  | 'setSelectedIndex'
  | 'handleSelect'
  | 'handleClose'
  | 'togglePanel'
  | 'selectedFilter'
  | 'setSelectedFilter'
  | 'filters'
  | 'resetFilters'
> & {
  className?: string
}) {
  let { t } = useTranslation()

  useBodyScrollLock(showSearch)

  return (
    <motion.div
      layout={showSearch}
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      transition={{ type: 'spring', stiffness: 160, damping: 24, mass: 0.6 }}
      className={`overflow-hidden flex flex-col pointer-events-auto ${showSearch ? 'max-md:w-[80dvw]! flex-1' : 'w-fit'} ${className}`}
    >
      {/* toggle btn */}
      {!showSearch && (
        <motion.div
          key="open"
          title="Toggle Search"
          aria-label="Toggle Search"
          onClick={togglePanel}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg cursor-pointer shrink-0"
        >
          <LetterSwap text={<Search size={16} className="z-10 mx-4 my-2" />} />
        </motion.div>
      )}

      {/* Panel content */}
      <AnimatePresence mode="popLayout">
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:min-w-md overflow-hidden flex flex-col space-y-2 md:px-6 py-8"
          >
            {/* Top btns */}
            <div className="flex justify-between gap-2">
              {/* tooltip */}
              <AnimText delay={0.7} className="text-text/25 text-sm">
                ⌘ + K
              </AnimText>
              {/* Close btn */}
              <AnimText
                delay={0.9}
                key="close"
                onClick={handleClose}
                className="font-mono text-text text-sm rtl:leading-5 tracking-wider cursor-pointer select-none"
              >
                <TText tKey="common.close" />
              </AnimText>
            </div>

            {/* Search bar */}
            <div className="w-full flex justify-between items-center">
              <div className="relative w-full">
                <input
                  autoFocus
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full selection:bg-text/25 border-text/50! border-b focus:outline-none placeholder:text-text/50 text-3xl rtl:text-right py-2 max-md:py-1"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="group top-1/2 right-0 absolute text-text/75 hover:scale-110 transition-transform -translate-y-1/2 cursor-pointer"
                  >
                    <LetterSwap text={<X size={28} className="text-text/40 group-hover:text-text transition-colors" />} />
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-end items-center gap-4 mt-4">
              {filters.map((filter, index) => (
                <AnimText
                  as={'button'}
                  delay={0.1 * index + 0.3}
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`tracking-wider transition-all cursor-pointer select-none rtl:leading-6 ${
                    selectedFilter === filter.value ? 'text-text' : 'text-text/50 hover:text-text/75'
                  }`}
                >
                  <TText tKey={filter.label} />
                </AnimText>
              ))}
            </div>

            {/* Reset btn */}
            <AnimText
              as={'button'}
              delay={0.7}
              onClick={resetFilters}
              className="text-text/50 hover:text-text/75 rtl:leading-6 tracking-wider transition-all ms-auto py-2 cursor-pointer"
            >
              <TText tKey="news.resetAll" />
            </AnimText>

            {/* Dropdown */}
            <div className="h-[50dvh] overflow-hidden flex flex-col shrink-0">
              {!searchQuery && (
                <h5 className="border-main/50! border-b font-mono font-medium text-main text-xs tracking-widest mb-1 py-2 shrink-0">
                  <TText tKey="search.popular" />
                </h5>
              )}
              <GlobalSearchDropdown
                className="h-full min-h-0"
                results={results}
                selectedIndex={selectedIndex}
                onSelect={handleSelect}
                onHover={setSelectedIndex}
                showCategoryHeaders={!!searchQuery}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
