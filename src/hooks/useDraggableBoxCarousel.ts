'use client'

import { useRef, useState, useEffect } from 'react'
import { useMotionValue, useSpring } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'

export function useDraggableBoxCarousel(itemsCount: number) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFace, setSelectedFace] = useState<number | null>(null)
  const rotateY = useMotionValue(45)
  const rotateX = useMotionValue(-25)
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 })
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 })
  const dragStart = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 })
  const isMobile = useIsMobile()
  const width = isMobile ? 250 : 300
  const height = isMobile ? 250 : 300
  const depth = width

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX
    const clientY = 'touches' in event ? event.touches[0].clientY : (event as React.MouseEvent).clientY

    dragStart.current = {
      x: clientX,
      y: clientY,
      rotY: rotateY.get(),
      rotX: rotateX.get(),
    }
  }

  const handleDragMove = (event: MouseEvent | TouchEvent) => {
    if (!isDragging) return

    if (window.TouchEvent && event instanceof TouchEvent && event.cancelable) {
      event.preventDefault()
    }

    const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX
    const clientY = 'touches' in event ? event.touches[0].clientY : (event as MouseEvent).clientY

    const deltaX = clientX - dragStart.current.x
    const deltaY = clientY - dragStart.current.y

    const rotationY = dragStart.current.rotY + deltaX * 0.5
    const rotationX = dragStart.current.rotX - deltaY * 0.5

    rotateY.set(rotationY)
    rotateX.set(rotationX)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleFaceClick = (faceIndex: number) => {
    if (!isDragging) {
      setSelectedFace(faceIndex)
    }
  }

  const handleCloseFullscreen = () => {
    setSelectedFace(null)
  }

  const handlePreviousImage = () => {
    setSelectedFace((prev) => ((prev ?? 0) - 1 + itemsCount) % itemsCount)
  }

  const handleNextImage = () => {
    setSelectedFace((prev) => ((prev ?? 0) + 1) % itemsCount)
  }

  useEffect(() => {
    const handleMouseUp = () => handleDragEnd()
    const handleTouchEnd = () => handleDragEnd()
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e)
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedFace !== null) {
        handleCloseFullscreen()
      } else if (e.key === 'ArrowLeft' && selectedFace !== null) {
        handlePreviousImage()
      } else if (e.key === 'ArrowRight' && selectedFace !== null) {
        handleNextImage()
      }
    }

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchend', handleTouchEnd)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    if (selectedFace !== null) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDragging, selectedFace, itemsCount])

  return {
    isDragging,
    selectedFace,
    springRotateY,
    springRotateX,
    width,
    height,
    depth,
    handleDragStart,
    handleFaceClick,
    handleCloseFullscreen,
    handlePreviousImage,
    handleNextImage,
  }
}
