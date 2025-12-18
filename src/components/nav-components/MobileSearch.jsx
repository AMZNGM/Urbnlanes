import { SearchIcon } from 'lucide-react'
import MenuBtn from '@/components/nav-components/MenuBtn'
import ProgressBar from '@/components/nav-components/ProgressBar'
import { useTranslation } from '@/hooks/useTranslation'

export default function MobileSearch({ navbarData }) {
  const { searchQuery, setSearchQuery, handleSubmit, isLoading, selectedLanguage } = navbarData
  const { t } = useTranslation()

  return (
    <>
      <div className="relative w-full h-36 flex justify-between items-center bg-bg border-b border-text/15 ps-6">
        <div className="group flex justify-center items-center gap-6">
          <SearchIcon strokeWidth={1.5} className="size-6" />
          <input
            type="text"
            value={searchQuery}
            placeholder={t('search.placeholder')}
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
        <div
          className={`w-18 h-full flex justify-center items-center border-text/15 ${
            selectedLanguage === 'English' ? 'border-l' : 'border-r'
          }`}
        >
          <MenuBtn navbarData={navbarData} />
        </div>
      </div>
      <ProgressBar isLoading={isLoading} />
    </>
  )
}
