'use client'

import { ElementType, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'motion/react'

interface AnimInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: ReactNode
  as?: ElementType
  className?: string
  delay?: number | string
  duration?: number | string
  once?: boolean
  spring?: boolean
  toDown?: boolean
  center?: boolean
  blur?: boolean
}

export default function AnimIn({
  children,
  as = 'div',
  className = '',
  delay = 0.1,
  duration = 0.75,
  once = true,
  spring = false,
  toDown = false,
  center = false,
  blur = false,
  ...props
}: AnimInProps) {
  const Tag = motion.create(as as any)

  return (
    <Tag
      {...props}
      variants={{
        hidden: { opacity: 0, y: center ? 0 : toDown ? -40 : 40, filter: blur ? 'blur(8px)' : null },
        visible: { opacity: 1, y: 0, filter: blur ? 'blur(0px)' : null },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      transition={{
        duration: Number(duration),
        delay: Number(delay),
        filter: { type: 'spring', stiffness: 90, damping: 15 },
        ...(spring ? { type: 'spring', stiffness: 300, damping: 20 } : {}),
      }}
      className={className}
    >
      {children}
    </Tag>
  )
}
