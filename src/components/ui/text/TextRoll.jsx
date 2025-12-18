'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TextRoll({ children, className = '' }) {
  const { selectedLanguage } = useLanguage()
  const [isHovering, setIsHovering] = useState(false)
  const letters = String(children).split('')

  if (selectedLanguage === 'العربية') {
    return <span className={className}>{children}</span>
  }

  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Top layer */}
      <span className="inline-flex">
        {letters.map((letter, i) => (
          <span
            key={`t-${i}`}
            className="inline-block transition-transform duration-300 ease-in-out"
            style={{
              transform: isHovering && letter !== ' ' ? 'translateY(-100%)' : 'translateY(0%)',
              rotate: isHovering && letter !== ' ' ? '360deg' : '0deg',
              transitionDelay: letter !== ' ' ? `${i * 15}ms` : '0ms',
              width: letter === ' ' ? '0.3em' : 'auto',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </span>

      {/* Bottom layer */}
      <span className="absolute inset-0 inline-flex">
        {letters.map((letter, i) => (
          <span
            key={`b-${i}`}
            className="inline-block transition-transform duration-300 ease-in-out"
            style={{
              transform: isHovering && letter !== ' ' ? 'translateY(0%)' : 'translateY(100%)',
              rotate: isHovering && letter !== ' ' ? '0deg' : '360deg',
              transitionDelay: letter !== ' ' ? `${i * 15}ms` : '0ms',
              width: letter === ' ' ? '0.3em' : 'auto',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </span>
    </span>
  )
}
