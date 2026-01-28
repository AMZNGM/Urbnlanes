import { SearchIcon } from 'lucide-react'
import { NavbarTypes } from '@/types/nav'
import Indicator from '@/components/ui/effects/Indicator'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function SearchTrigger({ navbarData, className = '' }: { navbarData: NavbarTypes; className?: string }) {
  let { toggleSearchBar } = navbarData

  let searchIndicator = () => {
    return (
      <div className="top-full left-1/2 z-50 absolute opacity-0 group-hover:opacity-100 transition-all -translate-x-1/2 translate-y-2 duration-200 pointer-events-none transform">
        <div className="flex items-center gap-2 bg-bg shadow-xl rounded-lg text-xs whitespace-nowrap px-3 py-2">
          <span>Search</span>
          <div className="flex items-center gap-1">
            <kbd className="bg-bg border border-main rounded font-mono text-xs px-2 py-1">⌘</kbd>
            <span className="text-gray-400">+</span>
            <kbd className="bg-bg border border-main rounded font-mono text-xs px-2 py-1">K</kbd>
          </div>
        </div>
        <div className="bottom-full left-1/2 absolute -translate-x-1/2 transform">
          <div className="w-0 h-0 border-transparent border-r-4 border-b-4 border-b-bg border-l-4"></div>
        </div>
      </div>
    )
  }

  return (
    <button onClick={(e) => toggleSearchBar(e)} title="Search (Ctrl/Cmd + K)" className={`relative h-full group ${className}`}>
      <Indicator className="relative h-full">
        <RippleEffect className="max-[1100px]:hidden z-0 relative h-full flex justify-center items-center p-6 cursor-pointer">
          <SearchIcon strokeWidth={1.5} size={20} />
        </RippleEffect>
      </Indicator>

      {searchIndicator()}
    </button>
  )
}
