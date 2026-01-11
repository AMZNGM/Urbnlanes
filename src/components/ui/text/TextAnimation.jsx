'use client'

import React from 'react'
import { motion } from 'motion/react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const generateVariants = (direction, speed = 1) => {
  const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y'
  const value = direction === 'right' || direction === 'down' ? 100 : -100
  const baseDuration = 0.4
  const duration = baseDuration / Math.max(0.1, speed) // Ensure speed is positive and non-zero

  return {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      [`translate${axis}`]: value,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      [`translate${axis}`]: 0,
      transition: {
        duration,
        ease: 'easeOut',
      },
    },
  }
}

const defaultViewport = { amount: 0.3, margin: '0px 0px 0px 0px' }

export default function TextAnimation({
  as = 'h1',
  text,
  className = '',
  viewport = defaultViewport,
  variants,
  direction = 'up',
  letterAnime = false,
  lineAnime = false,
  speed = 1,
  animateOnce = true,
}) {
  const baseVariants = variants || generateVariants(direction, speed)
  const modifiedVariants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVariants.visible.transition,
        repeat: animateOnce ? 0 : Infinity,
        repeatType: 'reverse',
      },
    },
  }
  const MotionComponent = motion[as]
  // Configure viewport options based on animateOnce
  const viewportOptions = {
    ...viewport,
    once: animateOnce,
  }

  return (
    <MotionComponent
      whileInView="visible"
      initial="hidden"
      variants={containerVariants}
      viewport={viewportOptions}
      className={`${className}`}
    >
      {lineAnime ? (
        <motion.span className={`inline-block`} variants={modifiedVariants}>
          {text}
        </motion.span>
      ) : (
        <>
          {text.split(' ').map((word, index) => (
            <motion.span key={index} className={`inline-block`} variants={letterAnime === false ? modifiedVariants : {}}>
              {letterAnime ? (
                <>
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span key={letterIndex} className={`inline-block`} variants={modifiedVariants}>
                      {letter}
                    </motion.span>
                  ))}
                  &nbsp;
                </>
              ) : (
                <>{word}&nbsp;</>
              )}
            </motion.span>
          ))}
        </>
      )}
    </MotionComponent>
  )
}
