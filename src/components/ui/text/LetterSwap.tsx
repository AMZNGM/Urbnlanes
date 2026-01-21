'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, stagger, useAnimate, Transition } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function LetterSwap({
  text = '',
  reverse = false,
  transition = {
    type: 'spring',
    duration: 0.5,
  },
  staggerDuration = 0.01,
  staggerFrom = 'center',
  className = '',
  as,
  onClick,
  ...props
}: {
  text?: string | React.ReactNode
  reverse?: boolean
  transition?: Transition
  staggerDuration?: number
  staggerFrom?: 'first' | 'last' | 'center' | number
  className?: string
  as?: React.ElementType
  onClick?: () => void
  [key: string]: any
}) {
  const isMobile = useIsMobile()
  const { t, currentLanguage } = useTranslation()
  const [isClient, setIsClient] = useState(false)
  const [scope, animate] = useAnimate()
  const [isHovered, setIsHovered] = useState(false)
  const isAr = currentLanguage === 'ar'

  useEffect(() => {
    setIsClient(true)
  }, [])

  const hasIcons = typeof text !== 'string' && typeof text !== 'number'

  const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    return useCallback(
      (...args: any[]) => {
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

  const mergeTransition = (baseTransition: Transition) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom as any,
    }),
  })

  const hoverStart = useDebounce(() => {
    if (isHovered || !scope.current) return
    setIsHovered(true)

    animate('.letter', { y: reverse ? '100%' : '-100%' }, mergeTransition(transition))
    animate('.letter-secondary', { top: '0%' }, mergeTransition(transition))
  }, 50)

  const hoverEnd = useDebounce(() => {
    if (!scope.current) return
    setIsHovered(false)

    animate('.letter', { y: 0 }, mergeTransition(transition))
    animate('.letter-secondary', { top: reverse ? '-100%' : '100%' }, mergeTransition(transition))
  }, 50)

  if (!isClient || isMobile) {
    const Tag = as || 'span'
    return (
      <Tag className={className} onClick={onClick} {...props}>
        {text}
      </Tag>
    )
  }

  if (hasIcons || !text) {
    const Tag = as || 'span'
    return (
      <Tag className={`flex justify-center items-center gap-1 ${className}`} onClick={onClick} {...props}>
        {text}
      </Tag>
    )
  }

  const stringText = String(text)
  const MotionTag = (motion as any)[(as as string) || 'span'] || motion.span

  // Arabic Strategy: Don't split by character. Duplicate the whole text line.
  if (isAr) {
    return (
      <MotionTag
        className={`flex justify-center items-center relative overflow-hidden ${className}`}
        onHoverStart={hoverStart}
        onHoverEnd={hoverEnd}
        onClick={onClick}
        ref={scope}
        {...props}
      >
        <span className="sr-only">{stringText}</span>
        <span className="relative flex whitespace-pre" aria-hidden={true}>
          <motion.span className="inline-block relative letter" style={{ top: 0 }}>
            {stringText}
          </motion.span>
          <motion.span className="inline-block right-0 left-0 absolute letter-secondary" style={{ top: reverse ? '-100%' : '100%' }}>
            {stringText}
          </motion.span>
        </span>
      </MotionTag>
    )
  }

  // Latin Strategy: Split by character
  return (
    <MotionTag
      className={`flex justify-center items-center relative overflow-hidden ${className}`}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{stringText}</span>

      {stringText.split('').map((letter, i) => (
        <span className="relative flex whitespace-pre" key={i} aria-hidden={true}>
          <motion.span className="relative letter" style={{ top: 0 }}>
            {letter}
          </motion.span>
          <motion.span className="absolute letter-secondary" style={{ top: reverse ? '-100%' : '100%' }}>
            {letter}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
