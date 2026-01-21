'use client'

import { motion, HTMLMotionProps } from 'motion/react'
import { ElementType, ReactNode } from 'react'

interface AnimInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: ReactNode
  as?: ElementType
  className?: string
  delay?: number | string
  duration?: number | string
  once?: boolean
}

export default function AnimIn({ children, as = 'div', className = '', delay = 0.1, duration = 0.75, once = true, ...props }: AnimInProps) {
  const Tag = motion.create(as as any)

  return (
    <Tag
      {...props}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 1 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      transition={{ duration: Number(duration), delay: Number(delay) }}
      className={className}
    >
      {children}
    </Tag>
  )
}

// , type: 'spring', stiffness: 60
