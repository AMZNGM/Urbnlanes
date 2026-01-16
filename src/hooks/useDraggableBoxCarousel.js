'use client'

import { useRef, useState, useEffect } from 'react'
import { useMotionValue, useSpring } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'

export function useDraggableBoxCarousel(itemsCount) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFace, setSelectedFace] = useState(null)
  const rotateY = useMotionValue(45)
  const rotateX = useMotionValue(-25)
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 })
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 })
  const dragStart = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 })
  const isMobile = useIsMobile()
  const width = isMobile ? 250 : 300
  const height = isMobile ? 250 : 300
  const depth = width

  const handleDragStart = (event) => {
    setIsDragging(true)
    const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX
    const clientY = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY

    dragStart.current = {
      x: clientX,
      y: clientY,
      rotY: rotateY.get(),
      rotX: rotateX.get(),
    }
  }

  const handleDragMove = (event) => {
    if (!isDragging) return

    if (event.type.includes('touch') && event.cancelable) {
      event.preventDefault()
    }

    const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX
    const clientY = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY

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

  const handleFaceClick = (faceIndex) => {
    if (!isDragging) {
      setSelectedFace(faceIndex)
    }
  }

  const handleCloseFullscreen = () => {
    setSelectedFace(null)
  }

  const handlePreviousImage = () => {
    setSelectedFace((prev) => (prev - 1 + itemsCount) % itemsCount)
  }

  const handleNextImage = () => {
    setSelectedFace((prev) => (prev + 1) % itemsCount)
  }

  useEffect(() => {
    const handleMouseUp = () => handleDragEnd()
    const handleTouchEnd = () => handleDragEnd()
    const handleMouseMove = (e) => handleDragMove(e)
    const handleTouchMove = (e) => handleDragMove(e)
    const handleKeyDown = (e) => {
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
