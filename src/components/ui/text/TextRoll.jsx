'use client'

import { useState } from 'react'

export default function TextRoll({ children }) {
  const [isHovering, setIsHovering] = useState(false)
  const letters = String(children).split('')

  return (
    <span
      className="relative inline-block overflow-hidden"
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
              transitionDelay: letter !== ' ' ? `${i * 30}ms` : '0ms',
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
              transitionDelay: letter !== ' ' ? `${i * 30}ms` : '0ms',
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
