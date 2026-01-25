'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function ProjectsFilter({
  categories,
  statuses,
  cities,
  selectedCategory,
  selectedStatus,
  selectedCity,
  onCategoryChange,
  onStatusChange,
  onCityChange,
}: {
  categories: string[]
  statuses: string[]
  cities: string[]
  selectedCategory: string
  selectedStatus: string
  selectedCity: string
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
  onCityChange: (city: string) => void
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const categoryOptions = [{ key: 'all', label: 'filters.allCategories' }, ...categories.map((category) => ({ key: category, label: `filters.${category}` }))]
  const statusOptions = [{ key: 'all', label: 'filters.allStatuses' }, ...statuses.map((status) => ({ key: status, label: `filters.${status}` }))]
  const cityOptions = [{ key: 'all', label: 'filters.allCities' }, ...cities.map((city) => ({ key: city, label: `locations.${city}` }))]
  const Dropdowns = [
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

  return (
    <section className="relative w-dvw bg-text text-black px-18 max-md:px-4 py-4">
      <AnimIn className="space-y-8">
        <AnimText as={'h2'} className="font-sec text-3xl text-center">
          <TText tKey="filters.filterBy" />
        </AnimText>

        <div className="gap-4 grid md:grid-cols-3">
          {Dropdowns.map(({ label, value, options, onChange, openDropdown, setOpenDropdown }) => (
            <CustomDropdown key={label} label={label} value={value} options={options} onChange={onChange} isOpen={openDropdown} onToggle={setOpenDropdown} />
          ))}
        </div>

        <MainBtn
          onClick={() => {
            onCategoryChange('all')
            onStatusChange('all')
            onCityChange('all')
          }}
          tKey="filters.resetFilters"
          look="glass"
        />
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
      className="w-full flex justify-between items-center bg-main/50 hover:bg-main/75 backdrop-blur-2xl rounded-2xl focus:outline-none transition-all px-4 py-3 cursor-pointer"
    >
      <span className="font-medium text-sm">
        <TText tKey={label} />
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
          className="top-full right-0 left-0 z-50 absolute overflow-hidden bg-main/50 backdrop-blur-2xl rounded-2xl text-text mt-2 p-2"
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
              className={`w-full px-4 py-3 text-left text-sm transition-colors border-b border-main/25 last:border-b-0 rounded-2xl cursor-pointer ${
                value === option.key ? 'bg-main text-black font-medium' : 'hover:bg-main/50'
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
