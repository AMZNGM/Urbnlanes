import { ChevronRight } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export default function MobileMenuLinks({ navbarData }) {
  const { navigations, visibleLabel, setVisibleLabel, isClient } = navbarData
  const { t } = useTranslation()

  return (
    <div className={`relative w-full ${visibleLabel !== null ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <ul className="w-full h-full flex flex-col">
        {navigations.map((link, index) => (
          <li key={index} transition={{ duration: 0.3, ease: 'easeOut' }} className="group border-b border-text/10 hover:bg-text/10">
            <button
              type="button"
              onClick={() => setVisibleLabel(index)}
              className="w-full flex justify-between items-center cursor-pointer text-sm font-medium uppercase p-6"
            >
              <span className={'z-20'}>{isClient ? t(link.name) : link.name}</span>
              <ChevronRight size={20} className="group-hover:rotate-360 duration-500 rtl:rotate-180" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
