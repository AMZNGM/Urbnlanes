'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, stagger, useAnimate } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { useNavbar } from '@/hooks/useNavbar'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function LetterSwap({
  text = '',
  reverse = false,
  transition = {
    type: 'spring',
    duration: 0.7,
  },
  staggerDuration = 0.01,
  staggerFrom = 'center',
  className = '',
  as,
  onClick,
  ...props
}) {
  const isMobile = useIsMobile()
  const { currentLanguage } = useTranslation()
  const { isClient } = useNavbar()
  const [scope, animate] = useAnimate()
  const [isHovered, setIsHovered] = useState(false)
  const hasIcons = Array.isArray(text) || (typeof text === 'object' && text !== null)

  const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null)

    return useCallback(
      (...args) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args)
        }, delay)
      },
      [callback, delay]
    )
  }

  const mergeTransition = (baseTransition) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  })

  const hoverStart = useDebounce(() => {
    if (isHovered || !scope.current) return
    setIsHovered(true)

    animate('.letter', { y: reverse ? '100%' : '-100%' }, mergeTransition(transition))

    animate(
      '.letter-secondary',
      {
        top: '0%',
      },
      mergeTransition(transition)
    )
  }, 100)

  const hoverEnd = useDebounce(() => {
    if (!scope.current) return
    setIsHovered(false)

    animate(
      '.letter',
      {
        y: 0,
      },
      mergeTransition(transition)
    )

    animate(
      '.letter-secondary',
      {
        top: reverse ? '-100%' : '100%',
      },
      mergeTransition(transition)
    )
  }, 100)

  if (currentLanguage === 'ar' || !isClient || isMobile) {
    const Tag = as || 'span'
    return (
      <Tag className={className} onClick={onClick} {...props}>
        {String(text || '')}
      </Tag>
    )
  }

  if (hasIcons) {
    const Tag = as || 'span'
    return (
      <Tag className={`flex justify-center items-center gap-1 ${className}`} onClick={onClick} {...props}>
        {Array.isArray(text) ? text : text}
      </Tag>
    )
  }

  const MotionTag = motion[as || 'span']

  return (
    <MotionTag
      className={`flex justify-center items-center relative overflow-hidden  ${className} `}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{String(text || '')}</span>

      {String(text || '')
        .split('')
        .map((letter, i) => {
          return (
            <span className="relative flex whitespace-pre" key={i} aria-hidden={true}>
              <motion.span className={`relative letter`} style={{ top: 0 }}>
                {letter}
              </motion.span>
              <motion.span className="absolute letter-secondary" style={{ top: reverse ? '-100%' : '100%' }}>
                {letter}
              </motion.span>
            </span>
          )
        })}
    </MotionTag>
  )
}
