'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import MainBtn from '@/components/ui/buttons/MainBtn'
import SwitchBtn from '@/components/ui/buttons/SwitchBtn'
import LineHeading from '@/components/shared/LineHeading'

export default function ProjectsFilter({
  categories,
  statuses,
  cities,
  selectedCategory,
  selectedStatus,
  selectedCity,
  filteredProjects,
  onCategoryChange,
  onStatusChange,
  onCityChange,
  onToggleView,
  viewMode,
}: {
  categories: string[]
  statuses: string[]
  cities: string[]
  selectedCategory: string
  selectedStatus: string
  selectedCity: string
  filteredProjects: any[]
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
  onCityChange: (city: string) => void
  onToggleView: () => void
  viewMode: 'grid' | 'list'
  className?: string
}) {
  let [openDropdown, setOpenDropdown] = useState<string | null>(null)
  let categoryOptions = [{ key: 'all', label: 'filters.allCategories' }, ...categories.map((category) => ({ key: category, label: `filters.${category}` }))]
  let statusOptions = [{ key: 'all', label: 'filters.allStatuses' }, ...statuses.map((status) => ({ key: status, label: `filters.${status}` }))]
  let cityOptions = [{ key: 'all', label: 'filters.allCities' }, ...cities.map((city) => ({ key: city, label: `locations.${city}` }))]
  let Dropdowns = [
    {
      label: 'filters.filterByCategory',
      value: selectedCategory,
      options: categoryOptions,
      onChange: onCategoryChange,
      openDropdown: openDropdown === 'category',
      setOpenDropdown: () => setOpenDropdown(openDropdown === 'category' ? null : 'category'),
    },
    {
      label: 'filters.filterByStatus',
      value: selectedStatus,
      options: statusOptions,
      onChange: onStatusChange,
      openDropdown: openDropdown === 'status',
      setOpenDropdown: () => setOpenDropdown(openDropdown === 'status' ? null : 'status'),
    },
    {
      label: 'filters.filterByCity',
      value: selectedCity,
      options: cityOptions,
      onChange: onCityChange,
      openDropdown: openDropdown === 'city',
      setOpenDropdown: () => setOpenDropdown(openDropdown === 'city' ? null : 'city'),
    },
  ]
  let stats = [
    { delay: 0.1, key: 'common.totalProjects', value: db.projects.length },
    { delay: 0.2, key: 'common.filteredProjects', value: filteredProjects.length },
    { delay: 0.3, key: 'common.categories', value: categories.length },
    { delay: 0.4, key: 'common.cities', value: cities.length },
  ]

  return (
    <section className="relative w-dvw bg-text text-bg px-4 max-md:px-2 py-12">
      <AnimIn className="space-y-8">
        <LineHeading tKey="common.allProjects" />

        {/* title */}
        <AnimText as={'h2'} className="font-sec text-3xl text-center">
          <TText tKey="filters.filterBy" />
        </AnimText>

        {/* dropdowns */}
        <div className="gap-4 grid md:grid-cols-3">
          {Dropdowns.map(({ label, value, options, onChange, openDropdown, setOpenDropdown }) => (
            <CustomDropdown key={label} label={label} value={value} options={options} onChange={onChange} isOpen={openDropdown} onToggle={setOpenDropdown} />
          ))}
        </div>

        {/* stats */}
        <div className="bg-main/25 rounded-lg p-8 max-md:p-4">
          <div className="gap-8 max-md:gap-4 grid grid-cols-2 md:grid-cols-4">
            {stats.map(({ delay, key, value }) => (
              <AnimIn
                key={key}
                delay={delay}
                className={`rounded-lg text-center p-4 ${key === 'common.filteredProjects' ? 'bg-main/50 border' : 'bg-main/25'}`}
              >
                <AnimText key={`${key}-${value}`} className="opacity-50 font-bold text-4xl mb-2">
                  {value}
                </AnimText>
                <AnimText delay={0.5} as={'p'} className="opacity-75 text-sm">
                  <TText tKey={key} />
                </AnimText>
              </AnimIn>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-between items-center gap-4">
          {/* reser BTN */}
          <MainBtn
            onClick={() => {
              onCategoryChange('all')
              onStatusChange('all')
              onCityChange('all')
            }}
            tKey="filters.resetFilters"
            look="mono"
            className="max-md:text-xs"
          />

          {/* toggle BTN */}
          <div className="flex justify-center items-center gap-2 bg-main/25 hover:bg-main/50 rounded-lg font-medium max-md:text-sm text-center transition-colors duration-200 px-6 max-md:px-4 py-3 max-md:py-2">
            <span onClick={onToggleView} className={`text-sm transition-colors cursor-pointer select-none ${viewMode === 'list' ? 'text-bg' : 'opacity-75'}`}>
              <TText tKey="common.listView" />
            </span>

            <SwitchBtn
              checked={viewMode === 'grid'}
              onChange={(checked) => {
                if (checked !== (viewMode === 'grid')) {
                  onToggleView()
                }
              }}
              aria-label="Toggle view mode"
            />

            <span onClick={onToggleView} className={`text-sm transition-colors cursor-pointer select-none ${viewMode === 'grid' ? 'text-bg' : 'opacity-75'}`}>
              <TText tKey="common.gridView" />
            </span>
          </div>
        </div>
      </AnimIn>
    </section>
  )
}

const CustomDropdown = ({
  label,
  value,
  options,
  onChange,
  isOpen,
  onToggle,
}: {
  label: string
  value: string
  options: { key: string; label: string }[]
  onChange: (value: string) => void
  isOpen: boolean
  onToggle: () => void
}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center bg-main/50 hover:bg-main/75 backdrop-blur-2xl rounded-lg focus:outline-none transition-all px-4 py-3 cursor-pointer"
    >
      <span className="font-medium text-sm">
        <TText tKey={options.find((opt) => opt.key === value)?.label || label} />
      </span>
      <Plus className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-130' : ''}`} />
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.5, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, scale: 0.5, filter: 'blur(10px)' }}
          transition={{ type: 'spring', stiffness: 110, damping: 15 }}
          className="top-full right-0 left-0 z-50 absolute overflow-hidden bg-main/50 backdrop-blur-2xl rounded-lg text-text mt-2 p-2"
        >
          {options.map((option, index) => (
            <motion.button
              key={option.key}
              onClick={() => {
                onChange(option.key)
                onToggle()
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
              className={`w-full px-4 py-3 text-left text-sm transition-colors border-b border-main/25 last:border-b-0 rounded-lg cursor-pointer ${
                value === option.key ? 'bg-main text-bg font-medium' : 'hover:bg-main/50'
              }`}
            >
              <TText tKey={option.label} />
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)
