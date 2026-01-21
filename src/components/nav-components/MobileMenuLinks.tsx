import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { NavbarData } from '@/types/nav'
import { useTranslation } from '@/translations/useTranslation'

export default function MobileMenuLinks({ navbarData }: { navbarData: NavbarData }) {
  const { t } = useTranslation()
  const { navigations, visibleLabel, setVisibleLabel, isClient } = navbarData

  return (
    <div className={`relative w-full ${visibleLabel !== null ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <ul className="w-full h-full flex flex-col">
        {navigations.map((link, index) => (
          <motion.li key={index} transition={{ duration: 0.3, ease: 'easeOut' }} className="group hover:bg-text/10 border-text/10 border-b">
            <button
              type="button"
              onClick={() => setVisibleLabel(index)}
              className="w-full flex justify-between items-center font-medium text-sm uppercase p-6 cursor-pointer"
            >
              <span className={'z-20'}>{isClient ? t(link.name || '') : link.name}</span>
              <ChevronRight size={20} className="rtl:rotate-180 group-hover:rotate-360 duration-500" />
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
