import { SearchIcon } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'
import MenuBtn from '@/components/nav-components/MenuBtn'
import ProgressBar from '@/components/nav-components/ProgressBar'

export default function MobileSearch({ navbarData }) {
  const { searchQuery, setSearchQuery, handleSubmit, isLoading, isScrolled20vh } = navbarData
  const { t } = useTranslation()
  const [isClient, setIsClient] = useState(false)
  const [placeholder, setPlaceholder] = useState('Search...')

  useEffect(() => {
    setIsClient(true)
    setPlaceholder(isLoading ? t('search.searching') : t('search.placeholder'))
  }, [isLoading, t])

  return (
    <>
      <div
        className={`relative w-full flex justify-between items-center border-text/15 border-b duration-300
          ${navbarData.isScrolled20vh ? 'h-24' : 'h-34 max-sm:h-24'}
          `}
      >
        <div className="w-full h-full flex items-center gap-4 hover:bg-text/15 transition-colors ps-6 cursor-pointer">
          <SearchIcon size={20} />
          <input
            type="text"
            value={searchQuery}
            placeholder={isClient ? placeholder : 'Search...'}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmit()
              }
            }}
            className="w-full outline-none text-xl py-12 placeholder-text/75"
          />
        </div>

        <MenuBtn navbarData={navbarData} className="w-[35%] h-full hover:bg-text/15 border-main/15 border-s transition-colors" />
      </div>
      <ProgressBar isLoading={isLoading} />
    </>
  )
}
