import { Logs } from 'lucide-react'
import LetterSwap from '@/components/ui/text/LetterSwap'

export default function NavMenuToggle({
  className,
  toggleDropdown,
  isScrolled100vh,
}: {
  className?: string
  toggleDropdown: () => void
  isScrolled100vh: boolean
}) {
  return (
    <div
      title="Nav Menu"
      aria-label="nav-menu-toggle-btn"
      onClick={toggleDropdown}
      className={`bg-main/25 backdrop-blur-2xl rounded-lg py-1 cursor-pointer pointer-events-auto ${isScrolled100vh ? 'md:backdrop-blur-none' : ''} ${className}`}
    >
      <LetterSwap text={<Logs size={20} className="mx-4 my-1" />} />
    </div>
  )
}
