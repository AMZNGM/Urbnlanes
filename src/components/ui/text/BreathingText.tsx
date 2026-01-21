'use client'

import { isValidElement, ReactNode, ElementType } from 'react'
import { motion, Transition } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'

export default function BreathingText({
  children,
  as = 'div',
  fromFontVariationSettings = "'wght' 100, 'slnt' 10",
  toFontVariationSettings = "'wght' 900, 'slnt' -10",
  transition = {
    duration: 1.5,
    ease: 'easeInOut',
  },
  staggerDuration = 0.1,
  staggerFrom = 'first',
  repeatDelay = 0.1,
  className,
  ...props
}: {
  children: ReactNode
  as?: ElementType
  fromFontVariationSettings?: string
  toFontVariationSettings?: string
  transition?: Transition
  staggerDuration?: number
  staggerFrom?: 'first' | 'last' | 'center' | number
  repeatDelay?: number
  className?: string
  [key: string]: any
}) {
  const Tag = as
  const { t, currentLanguage } = useTranslation()

  let text = ''
  if (isValidElement(children) && (children.props as any).tKey) {
    text = t((children.props as any).tKey)
  } else {
    text = String(children)
  }

  if (currentLanguage === 'ar') {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }

  const letterVariants = {
    initial: { fontVariationSettings: fromFontVariationSettings },
    animate: (i: number) => ({
      fontVariationSettings: toFontVariationSettings,
      transition: {
        ...transition,
        repeat: Infinity,
        repeatType: 'mirror' as const,
        delay: i * staggerDuration,
        repeatDelay: repeatDelay,
      },
    }),
  }

  const getCustomIndex = (index: number, total: number) => {
    if (typeof staggerFrom === 'number') {
      return Math.abs(index - staggerFrom)
    }
    switch (staggerFrom) {
      case 'first':
        return index
      case 'last':
        return total - 1 - index
      case 'center':
      default:
        return Math.abs(index - Math.floor(total / 2))
    }
  }

  const letters = text.split('')

  return (
    <Tag
      {...props}
      data-text={text}
      className={`${className || ''} relative after:absolute after:content-[attr(data-text)] after:font-black after:pointer-none after:overflow-hidden after:select-none after:invisible after:h-0 scale-90`}
    >
      {letters.map((letter, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          variants={letterVariants as any}
          initial="initial"
          animate="animate"
          custom={getCustomIndex(i, letters.length)}
          className="inline-block whitespace-pre"
        >
          {letter}
        </motion.div>
      ))}
      <div className="sr-only">{text}</div>
    </Tag>
  )
}
