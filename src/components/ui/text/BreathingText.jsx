'use client'

import { motion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function BreathingText({
  children,
  as = 'span',
  fromFontVariationSettings = "'wght' 100, 'slnt' 0",
  toFontVariationSettings = "'wght' 800, 'slnt' -10",
  transition = {
    duration: 1.5,
    ease: 'easeInOut',
  },
  staggerDuration = 0.1,
  staggerFrom = 'first',
  repeatDelay = 0.1,
  className,
  ...props
}) {
  const ElementTag = as
  const isMobile = useIsMobile()
  const { currentLanguage } = useTranslation()

  if (isMobile || currentLanguage === 'ar') {
    return (
      <ElementTag className={className} {...props}>
        {children}
      </ElementTag>
    )
  }

  const letterVariants = {
    initial: { fontVariationSettings: fromFontVariationSettings },
    animate: (i) => ({
      fontVariationSettings: toFontVariationSettings,
      transition: {
        ...transition,
        repeat: Infinity,
        repeatType: 'mirror',
        delay: i * staggerDuration,
        repeatDelay: repeatDelay,
      },
    }),
  }

  const getCustomIndex = (index, total) => {
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

  const letters = String(children).split('')

  return (
    <ElementTag
      className={`${className || ''} relative after:absolute after:content-[attr(data-text)] after:font-black after:pointer-none after:overflow-hidden after:select-none after:invisible after:h-0 scale-90`}
      {...props}
      data-text={children}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          aria-hidden="true"
          variants={letterVariants}
          initial="initial"
          animate="animate"
          custom={getCustomIndex(i, letters.length)}
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{children}</span>
    </ElementTag>
  )
}
