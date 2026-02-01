'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { Search, X } from 'lucide-react'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function MediaCenterFilter({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  sortOrder,
  setSortOrder,
  filteredItems,
  filters,
  sortOrders,
  resetFilters,
  isOpen,
  setIsOpen,
  togglePanel,
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
  sortOrder: 'newest' | 'oldest' | 'az' | 'za'
  setSortOrder: (order: 'newest' | 'oldest' | 'az' | 'za') => void
  filteredItems: any[]
  filters: { id: string; label: string }[]
  sortOrders: { id: string; label: string }[]
  resetFilters: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  togglePanel: () => void
}) {
  let { t } = useTranslation()

  return (
    <section id="news-feed" className="top-8 right-8 z-50 fixed">
      <motion.div
        layout={filteredItems.length > 0}
        transition={{ type: 'spring', stiffness: 160, damping: 24, mass: 0.6 }}
        className={`overflow-hidden flex flex-col bg-bg/50 backdrop-blur-2xl rounded-xl text-text pointer-events-auto ${isOpen || filteredItems.length === 0 ? 'w-full p-8' : 'w-fit ms-auto'}`}
      >
        <div onClick={togglePanel} className="flex items-center gap-2 font-mono text-sm ms-auto p-4 cursor-pointer select-none">
          {isOpen && (
            <AnimText delay={0.6} key="close" className="pt-1">
              <TText tKey="common.close" />
            </AnimText>
          )}
          {!isOpen && (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3 }}
            >
              <Search size={14} />
            </motion.div>
          )}
        </div>

        {/* Panel Content */}
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="min-w-md overflow-hidden flex flex-col pb-8"
            >
              {/* Search bar */}
              <div className="w-full flex justify-between items-center px-4">
                <div className="relative w-full">
                  <input
                    autoFocus
                    type="text"
                    placeholder={t('search.placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full selection:bg-text/25 border-text/50! border-b focus:outline-none placeholder:text-text/50 text-3xl py-2"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="top-1/2 right-0 absolute text-text/75 hover:scale-110 transition-transform -translate-y-1/2 cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort Orders */}
              <div className="flex flex-wrap justify-end items-center gap-4 p-4 pb-0">
                {sortOrders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSortOrder(order.id as any)}
                    className={`py-2 tracking-wider transition-all cursor-pointer ${sortOrder === order.id ? '' : 'text-text/50 hover:text-text/75'}`}
                  >
                    {order.label}
                  </button>
                ))}
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-end items-center gap-4 px-4">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`py-2 tracking-wider transition-all cursor-pointer ${selectedFilter === filter.id ? '' : 'text-text/50 hover:text-text/75'}`}
                  >
                    <TText tKey={filter.label} />
                  </button>
                ))}
              </div>

              <button onClick={resetFilters} className="text-text/50 hover:text-text/75 tracking-wider transition-all ms-auto px-4 py-2 cursor-pointer">
                Reset All
              </button>

              {filteredItems.length === 0 && (
                <AnimText as={'p'} className="font-mono tracking-wider px-4">
                  0 results
                </AnimText>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
