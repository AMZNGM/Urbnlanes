import { ChevronLeft, ChevronRight } from 'lucide-react'
import TextRoll from '@/components/ui/text/TextRoll'
import RippleEffect from '@/components/ui/effects/RippleEffect'
import MenuBtn from '@/components/nav-components/MenuBtn'

export default function MobileDropdown({ navbarData }) {
  const { navigations, visibleLabel, setVisibleLabel, activeSubIndex, setActiveSubIndex, handleNavigation, handleSubItemClick } = navbarData

  const currentMainItem = navigations[visibleLabel]
  const subItems = currentMainItem?.children || []
  const activeItem = activeSubIndex !== null ? subItems[activeSubIndex] : null
  const childItems = activeItem?.children || []

  // Grandchildren level
  if (activeSubIndex !== null && childItems.length > 0) {
    return (
      <div className="absolute inset-0 size-full backdrop-blur-xl overflow-hidden duration-500 ease-in-out touch-none">
        <div className="group flex justify-between items-center border-b border-text/15 ps-6">
          <RippleEffect
            onClick={() => setActiveSubIndex(null)}
            className="size-full flex items-center text-lg font-medium cursor-pointer gap-3 py-12"
          >
            <ChevronLeft strokeWidth={1.5} />
            <TextRoll className="z-10">{activeItem?.name}</TextRoll>
          </RippleEffect>
          <div className="w-18 h-full flex justify-center items-center border-l border-text/15">
            <MenuBtn navbarData={navbarData} />
          </div>
        </div>
        <ul className="size-full flex flex-col">
          {childItems.map((item, index) => (
            <li key={index} className="border-b border-text/10 hover:bg-text/10">
              <button
                type="button"
                onClick={() => handleNavigation(item.slug)}
                className="w-full flex items-center cursor-pointer text-sm font-medium uppercase p-6"
              >
                <TextRoll className="z-10">{item.name}</TextRoll>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Children level
  return (
    <div
      className={`absolute inset-0 size-full backdrop-blur-xl overflow-hidden duration-500 ease-in-out touch-none ${
        visibleLabel !== null ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'
      }`}
    >
      <div className="group flex justify-between items-center border-b border-text/15 ps-6">
        <RippleEffect
          onClick={() => setVisibleLabel(null)}
          className="size-full flex items-center text-lg font-medium cursor-pointer gap-3 py-12"
        >
          <ChevronLeft strokeWidth={1.5} />
          <TextRoll className="z-10">{currentMainItem?.name}</TextRoll>
        </RippleEffect>
        <div className="w-18 h-full flex justify-center items-center border-l border-text/15">
          <MenuBtn navbarData={navbarData} />
        </div>
      </div>
      <ul className="size-full flex flex-col">
        {subItems.map((item, index) => (
          <li key={index} className="border-b border-text/10 hover:bg-text/10">
            <button
              type="button"
              onClick={() => handleSubItemClick(item)}
              className="w-full flex items-center cursor-pointer text-sm font-medium uppercase p-6"
            >
              <TextRoll className="z-10">{item.name}</TextRoll>
              {item.children?.length > 0 && <ChevronRight strokeWidth={1.5} className="size-4 ml-auto" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
