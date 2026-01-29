import { X } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function CloseBtn({ onClick, className = '' }: { onClick?: () => void; className?: string }) {
  return (
    <RippleEffect
      onClick={onClick}
      aria-label="Close button"
      className={`group relative h-full overflow-hidden justify-center items-center grid bg-current/10 hover:bg-current/20 rounded-2xl text-current transition-colors duration-300 px-4 py-2 cursor-pointer ${className}`}
    >
      <X size={24} className="group-hover:rotate-90 transition-transform duration-300 ease-out" />
    </RippleEffect>
  )
}
