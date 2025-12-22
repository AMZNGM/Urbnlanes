import { SearchIcon } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'
import MenuBtn from '@/components/nav-components/MenuBtn'
import ProgressBar from '@/components/nav-components/ProgressBar'

export default function MobileSearch({ navbarData }) {
  const { searchQuery, setSearchQuery, handleSubmit, isLoading } = navbarData
  const { t } = useTranslation()
  const [isClient, setIsClient] = useState(false)
  const [placeholder, setPlaceholder] = useState('Search...')

  useEffect(() => {
    setIsClient(true)
    setPlaceholder(isLoading ? t('search.searching') : t('search.placeholder'))
  }, [isLoading, t])

  return (
    <>
      <div className="relative w-full h-34 max-sm:h-24 border-b border-text/15 flex justify-between items-center">
        <div className="w-full h-full flex items-center cursor-pointer gap-6 ps-4 hover:bg-text/15 transition-colors">
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
            className="w-full outline-none text-xl placeholder-text/75 py-12"
          />
        </div>

        <MenuBtn navbarData={navbarData} className="border-s border-main/15 w-[35%] h-full hover:bg-text/15 transition-colors" />
      </div>
      <ProgressBar isLoading={isLoading} />
    </>
  )
}
