import { X } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function CloseBtn({ onClick, className = '' }) {
  return (
    <button onClick={onClick} className={`absolute top-4 right-4 ${className}`}>
      <RippleEffect className="group text-text bg-text/10 hover:bg-text/15 rounded-full duration-300 cursor-pointer p-2">
        <X size={20} className="group-hover:rotate-180 duration-300" />
      </RippleEffect>
    </button>
  )
}
