import { SearchIcon } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'
import SearchBar from '@/components/nav-components/SearchBar'

export default function SearchTrigger({ navbarData }) {
  const { toggleSearchBar, searchInputRef } = navbarData

  return (
    <>
      <button onClick={(e) => toggleSearchBar(e)} className="relative h-full">
        <RippleEffect className="relative h-full flex justify-center items-center overflow-hidden cursor-pointer max-[1100px]:hidden p-2 z-0">
          <SearchIcon strokeWidth={1.5} size={20} />
        </RippleEffect>
      </button>

      <SearchBar navbarData={navbarData} ref={searchInputRef} />
    </>
  )
}
