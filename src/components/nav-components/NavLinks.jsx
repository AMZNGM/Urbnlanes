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
      className={`relative h-full overflow-hidden ${className}`}
    >
      <ul className="relative h-full flex justify-center items-center">
        {navigations.map((link, index) => (
          <li
            key={index}
            onMouseEnter={() => {
              setActiveIndex(index)
              setChildOpen(null)
            }}
            className="relative h-full shrink-0"
          >
            <Indicator className="group relative h-full flex justify-center items-center gap-1 px-4 max-2xl:px-2">
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
