'use client'

import { isValidElement } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'

export default function AnimText({
  children,
  className = '',
  as = 'div',
  delay = 0,
  stagger = 0.008,
  ...props
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  delay?: number
  stagger?: number
  [key: string]: any
}) {
  const { t } = useTranslation()
  let text = ''

  if (isValidElement(children) && 'tKey' in (children.props as object)) {
    text = t((children.props as { tKey: string }).tKey)
  } else {
    text = String(children)
  }

  if (Array.isArray(text)) {
    text = text.join(' ')
  }

  const Tag = as
  const words = text.split(' ')

  return (
    <Tag className={`relative overflow-hidden ${className}`} {...props}>
      <motion.span
        variants={{ visible: { transition: { delayChildren: delay, staggerChildren: stagger } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative space-x-1.5 ltr:leading-none"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block relative overflow-hidden">
            <motion.span
              variants={{ hidden: { opacity: 0, y: '100%' }, visible: { opacity: 1, y: '0%' } }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block relative"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
