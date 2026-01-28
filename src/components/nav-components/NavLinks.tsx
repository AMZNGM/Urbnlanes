import { NavbarTypes } from '@/types/nav'
import { ChevronDown } from 'lucide-react'
import Indicator from '@/components/ui/effects/Indicator'
import NavDropdown from '@/components/nav-components/NavDropdown'

export default function NavLinks({ navbarData, className = '' }: { navbarData: NavbarTypes; className?: string }) {
  let { selectLabel, openNavbar, closeNavbar, navigations, isMenuOpen, activeIndex, childOpen, setChildOpen } = navbarData

  return (
    <nav
      role="navigation"
      title="Main navigation"
      aria-label="Primary navigation"
      onMouseEnter={selectLabel}
      onMouseLeave={closeNavbar}
      className={`relative h-full ${className}`}
    >
      <ul className="relative h-full flex">
        {navigations.map((link, index) => (
          <li key={index} onMouseEnter={() => openNavbar(index)}>
            <Indicator className="group h-full flex items-center gap-1 px-4 max-2xl:px-2">
              <NavDropdown
                closeNavbar={closeNavbar}
                childOpen={childOpen}
                setChildOpen={setChildOpen}
                childrens={link.children || []}
                isActive={isMenuOpen && activeIndex === index}
                label={link.name}
              />

              <ChevronDown size={20} className="group-hover:rotate-180 transition-all duration-300" />
            </Indicator>
          </li>
        ))}
      </ul>
    </nav>
  )
}
