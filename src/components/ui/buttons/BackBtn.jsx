'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function BackBtn({ className }) {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button
      onClick={handleBack}
      aria-label="Go back to previous page"
      className={`absolute top-4 right-4 transform transition-all duration-300 hover:scale-110 active:scale-95 ${className}`}
    >
      <RippleEffect className="group relative text-text bg-text/10 hover:bg-text/20 rounded-full shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer p-2.5">
        <div className="absolute inset-0 bg-main/0 group-hover:bg-main/10 rounded-full transition-all duration-300" />

        <ArrowLeft size={20} className="transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-90" />

        <div className="absolute inset-0 rounded-full border border-text/0 group-hover:border-text/20 transition-all duration-300" />
      </RippleEffect>
    </button>
  )
}
