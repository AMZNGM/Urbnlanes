import { ChevronDown } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import NavDropdown from '@/components/nav-components/NavDropdown'
import Indicator from '@/components/ui/effects/Indicator'

export default function NavLinks({ navbarData, className = '' }) {
  const { navigations, isMenuOpen, setIsMenuOpen, activeIndex, setActiveIndex, childOpen, setChildOpen, handleMouseLeave, isClient } =
    navbarData
  const { t } = useTranslation()

  return (
    <nav
      aria-label="Primary navigation"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full ms-8 ${className}`}
    >
      <ul className="relative w-full h-full flex justify-center items-center">
        {navigations.map((link, index) => (
          <li
            key={index}
            onMouseEnter={() => {
              setActiveIndex(index)
              setChildOpen(null)
            }}
            className="relative shrink-0 h-full"
          >
            <Indicator className="group relative h-full flex justify-center items-center max-2xl:text-sm gap-1 px-3">
              <NavDropdown
                isActive={isMenuOpen && activeIndex === index}
                childOpen={childOpen}
                setChildOpen={setChildOpen}
                label={isClient ? t(link.name) : link.name}
                childrens={link.children}
              />
              <ChevronDown size={20} className="group-hover:rotate-180 transition-all duration-300" />
            </Indicator>
          </li>
        ))}
      </ul>
    </nav>
  )
}
