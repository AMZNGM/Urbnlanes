'use client'

import { ElementType, ReactNode } from 'react'
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react'

interface AnimInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: ReactNode
  as?: ElementType
  className?: string
  delay?: number | string
  duration?: number | string
  exitDuration?: number | string
  once?: boolean
  spring?: boolean
  toDown?: boolean
  center?: boolean
  blur?: boolean
  reAnim?: boolean
}

export default function AnimIn({
  children,
  as = 'div',
  className = '',
  delay = 0.1,
  duration = 0.75,
  exitDuration = 0.75,
  once = true,
  spring = false,
  toDown = false,
  center = false,
  blur = false,
  reAnim = true,
  ...props
}: AnimInProps) {
  let Tag = motion.create(as as any)

  return (
    <AnimatePresence>
      {reAnim && (
        <Tag
          {...props}
          transition={{
            duration: Number(duration),
            delay: Number(delay),
            filter: { type: 'spring', stiffness: 90, damping: 15 },
            ...(spring ? { type: 'spring', stiffness: 300, damping: 20 } : {}),
          }}
          variants={{
            hidden: {
              opacity: 0,
              y: center ? 0 : toDown ? -40 : 40,
              filter: blur ? 'blur(8px)' : null,
              transition: {
                duration: exitDuration !== undefined ? Number(exitDuration) : Number(duration),
                filter: { type: 'spring', stiffness: 90, damping: 15 },
                ...(spring ? { type: 'spring', stiffness: 300, damping: 20 } : {}),
              },
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: blur ? 'blur(0px)' : null,
              transition: {
                duration: Number(duration),
                delay: Number(delay),
                filter: { type: 'spring', stiffness: 90, damping: 15 },
                ...(spring ? { type: 'spring', stiffness: 300, damping: 20 } : {}),
              },
            },
            exit: {
              display: 'none',
              opacity: 0,
              y: center ? 0 : toDown ? -40 : 40,
              filter: blur ? 'blur(8px)' : null,
              transition: {
                duration: exitDuration !== undefined ? Number(exitDuration) : Number(duration),
                filter: { type: 'spring', stiffness: 90, damping: 15 },
                ...(spring ? { type: 'spring', stiffness: 300, damping: 20 } : {}),
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once }}
          className={`relative ${className}`}
        >
          {children}
        </Tag>
      )}
    </AnimatePresence>
  )
}
