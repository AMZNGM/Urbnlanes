'use client'

import { useState } from 'react'
import TText from '@/translations/TText'
import MainBtn from '@/components/ui/buttons/MainBtn'
import { ChevronDown } from 'lucide-react'

interface ProjectsFilterProps {
  categories: string[]
  statuses: string[]
  cities: string[]
  selectedCategory: string
  selectedStatus: string
  selectedCity: string
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
  onCityChange: (city: string) => void
}

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
}: ProjectsFilterProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const filterOptions = [
    { key: 'all', label: 'All Projects' },
    { key: 'administrative', label: 'Administrative' },
    { key: 'city', label: 'City' },
    { key: 'educational', label: 'Educational' },
    { key: 'latest', label: 'Latest Launches' },
    { key: 'residential', label: 'Residential' },
  ]

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
        className="w-full flex justify-between items-center bg-black hover:bg-gray-800 border border-gray-300 focus:border-main rounded-lg focus:outline-none text-text transition-colors px-4 py-3"
      >
        <span className="font-medium text-sm">{label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="top-full right-0 left-0 z-50 absolute bg-black shadow-lg border border-gray-300 rounded-lg text-text mt-2">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                onChange(option.key)
                onToggle()
              }}
              className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0 ${
                value === option.key ? 'bg-main text-black' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <section className="relative w-dvw bg-text text-black px-18 max-md:px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-sec text-3xl text-center mb-8">Filter</h2>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <CustomDropdown
            label="Filter by Category"
            value={selectedCategory}
            options={filterOptions}
            onChange={onCategoryChange}
            isOpen={openDropdown === 'category'}
            onToggle={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
          />

          <CustomDropdown
            label="Filter by Status"
            value={selectedStatus}
            options={[
              { key: 'all', label: 'All Statuses' },
              { key: 'completed', label: 'Completed' },
              { key: 'ongoing', label: 'Ongoing' },
              { key: 'planned', label: 'Planned' },
            ]}
            onChange={onStatusChange}
            isOpen={openDropdown === 'status'}
            onToggle={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
          />

          <CustomDropdown
            label="Filter by City"
            value={selectedCity}
            options={[{ key: 'all', label: 'All Cities' }, ...cities.map((city) => ({ key: city, label: city }))]}
            onChange={onCityChange}
            isOpen={openDropdown === 'city'}
            onToggle={() => setOpenDropdown(openDropdown === 'city' ? null : 'city')}
          />
        </div>

        {/* Reset Filters */}
        <div className="text-center mt-8">
          <MainBtn
            onClick={() => {
              onCategoryChange('all')
              onStatusChange('all')
              onCityChange('all')
            }}
            tKey="common.resetFilters"
            className="bg-black hover:bg-gray-800 text-text"
          />
        </div>
      </div>
    </section>
  )
}
