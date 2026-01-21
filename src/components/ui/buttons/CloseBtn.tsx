import { X } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function CloseBtn({ onClick, className = '' }: { onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close button"
      className={`absolute top-4 right-4 transform transition-all duration-300 text-text bg-text/10 hover:bg-text/20 rounded-full p-2.5 ${className}`}
    >
      <RippleEffect className="group relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
        <div className="absolute inset-0 bg-main/0 group-hover:bg-main/10 rounded-full transition-all duration-300" />

        <X size={20} className="group-hover:rotate-90 transition-all duration-300 ease-out" />

        <div className="absolute inset-0 border border-text/0 group-hover:border-text/20 rounded-full transition-all duration-300" />
      </RippleEffect>
    </button>
  )
}
