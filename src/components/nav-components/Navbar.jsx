'use client'

import { useScrollPosition } from '@/hooks/useScrollPosition'

export default function Navbar() {
  const isScrolled20vh = useScrollPosition(0.2)
  const isScrolled100vh = useScrollPosition(1)

  return (
    <header
      className={`fixed w-screen min-h-34 border-b border-text/25 transition-all duration-700 z-50 
        ${isScrolled20vh ? 'bg-bg' : ''}
        ${isScrolled100vh ? '-top-full' : 'top-0'}
      `}
    >
      <div>nav</div>
    </header>
  )
}
