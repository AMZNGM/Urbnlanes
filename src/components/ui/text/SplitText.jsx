'use client'

import { memo, useMemo } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'

export default memo(function SplitText(props) {
  const {
    children,
    className = '',
    as = 'div',
    delay = 0.03,
    duration = 1.5,
    stagger = 0.05,
    splitBy = 'word',
    animationFrom = { opacity: 0, y: 45 },
    animationTo = { opacity: 1, y: 0 },
    ease = [0.22, 1, 0.36, 1],
    replay = false,
    viewport = { once: true, margin: '-50px' },
    variants,
    ...restProps
  } = props

  const ElementTag = as

  const { currentLanguage } = useTranslation()
  if (currentLanguage === 'ar') {
    return <ElementTag className={className}>{children}</ElementTag>
  }

  const elements = useMemo(() => {
    const text = String(children)

    if (splitBy === 'word') {
      return text
        .split(' ')
        .map((word, i) => ({
          content: word,
          key: `word-${i}`,
          index: i,
          isSpace: false,
        }))
        .flatMap((word, i, arr) => (i < arr.length - 1 ? [word, { content: ' ', key: `space-${i}`, index: i, isSpace: true }] : [word]))
    }

    return text.split('').map((char, i) => ({
      content: char,
      key: `char-${i}`,
      index: i,
      isSpace: char === ' ',
    }))
  }, [children, splitBy])

  const animationVariants = useMemo(() => {
    if (variants) return variants

    return {
      hidden: animationFrom,
      visible: (i) => ({
        ...animationTo,
        transition: {
          delay: delay + i * stagger,
          duration,
          ease,
        },
      }),
    }
  }, [variants, animationFrom, animationTo, delay, stagger, duration, ease])

  return (
    <ElementTag
      className={className}
      {...restProps}
      style={{
        display: 'inline-block',
        ...restProps.style,
      }}
    >
      {elements.map((element) => (
        <motion.span
          key={element.key}
          custom={element.index}
          variants={animationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{
            display: 'inline-block',
            whiteSpace: element.isSpace ? 'pre' : 'normal',
            willChange: replay ? 'transform, opacity' : 'auto',
          }}
        >
          {element.content}
        </motion.span>
      ))}
    </ElementTag>
  )
})
