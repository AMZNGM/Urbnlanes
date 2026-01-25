import { X } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function CloseBtn({ onClick, className = '' }: { onClick?: () => void; className?: string }) {
  return (
    <RippleEffect
      onClick={onClick}
      aria-label="Close button"
      className={`group text-current bg-current/10 hover:bg-main/20 border rounded-full transition-colors duration-300 cursor-pointer p-2.5 ${className}`}
    >
      <X size={20} className="group-hover:rotate-90 transition-transform duration-300 ease-out" />
    </RippleEffect>
  )
}
