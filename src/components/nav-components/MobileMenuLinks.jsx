import { ChevronRight } from 'lucide-react'
import TextRoll from '@/components/ui/text/TextRoll.jsx'

export default function MobileMenuLinks({ navbarData }) {
  const { navigations, visibleLabel, setVisibleLabel } = navbarData
  return (
    <div className={`relative w-full ${visibleLabel !== null ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <ul className="size-full flex flex-col">
        {navigations.map((link, index) => (
          <li key={index} className="group border-b border-text/10 hover:bg-text/10">
            <button
              type="button"
              onClick={() => setVisibleLabel(index)}
              className="w-full flex justify-between items-center cursor-pointer text-sm font-medium uppercase p-6"
            >
              <TextRoll className={'z-20'}>{link.name}</TextRoll>
              <ChevronRight strokeWidth={1.5} className="size-6 group-hover:rotate-360 duration-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
