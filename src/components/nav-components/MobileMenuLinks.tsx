import { ChevronRight } from 'lucide-react'
import { NavbarTypes } from '@/types/nav'
import TText from '@/translations/TText'

export default function MobileMenuLinks({ navbarData }: { navbarData: NavbarTypes }) {
  let { navigations, setVisibleLabel } = navbarData

  return (
    <ul className="flex flex-col">
      {navigations.map((link, index) => (
        <li
          key={index}
          onClick={() => setVisibleLabel(index)}
          className="group w-full flex justify-between bg-bg hover:bg-main/25 border-b font-medium text-sm uppercase px-8 py-6 cursor-pointer"
        >
          <TText tKey={link.name} />
          <ChevronRight size={20} className="rtl:rotate-180 group-hover:rotate-360 duration-500" />
        </li>
      ))}
    </ul>
  )
}
