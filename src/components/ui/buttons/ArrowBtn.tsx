'use client'

import { ChevronLeft } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function ArrowBtn({ className, onClick, direction = 'left' }: { className?: string; onClick?: () => void; direction?: 'left' | 'right' }) {
  return (
    <button onClick={onClick} className={`${className} ${direction === 'right' ? 'rotate-180 rtl:rotate-0' : 'rtl:rotate-180'} `}>
      <RippleEffect className="group relative w-full h-full overflow-hidden justify-center items-center grid bg-current/10 hover:bg-current/20 rounded-2xl text-current transition-colors duration-300 px-4 py-2 cursor-pointer">
        <ChevronLeft className="transition-transform group-hover:-translate-x-1 duration-500 ease-out" />
        <div className="left-1/2 group-hover:left-6.5 absolute w-2 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 ease-out" />
      </RippleEffect>
    </button>
  )
}

export function ScrollArrows({ containerSelector = '[data-scroll-container]' }: { containerSelector?: string }) {
  const scrollLeft = () => {
    const container = document.querySelector(containerSelector) as HTMLElement
    if (container) {
      container.scrollBy({ left: -1020, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = document.querySelector(containerSelector) as HTMLElement
    if (container) {
      container.scrollBy({ left: 1020, behavior: 'smooth' })
    }
  }

  return (
    <>
      <ArrowBtn onClick={scrollLeft} />
      <ArrowBtn onClick={scrollRight} direction="right" />
    </>
  )
}

// <ScrollArrows containerSelector="[data-scroll-container2]" />
