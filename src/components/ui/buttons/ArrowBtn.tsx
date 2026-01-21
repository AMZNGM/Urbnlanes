import { ChevronLeft } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function ArrowBtn({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={className}>
      <RippleEffect className="group relative w-full h-full overflow-hidden justify-center items-center grid bg-text/10 hover:bg-text/20 shadow-sm hover:shadow-md rounded-full text-text transition-all duration-300 p-2 cursor-pointer">
        <div className="absolute inset-0 bg-main/0 group-hover:bg-main/10 rounded-full transition-all duration-300" />
        <ChevronLeft className="transition-transform group-hover:-translate-x-1 duration-500 ease-out" />
        <div className="left-1/2 group-hover:left-4.5 absolute w-2 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 ease-out" />
        <div className="absolute inset-0 border border-text/0 group-hover:border-text/20 rounded-full transition-all duration-300" />
      </RippleEffect>
    </button>
  )
}
