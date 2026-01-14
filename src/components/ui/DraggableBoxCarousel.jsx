'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import db from '@/database/urbnlanes-db.json'

const carouselItems = [
  {
    src: db.projects.find((project) => project.id === 'yellow-lane').gallery[2],
    alt: db.projects.find((project) => project.id === 'yellow-lane').name,
  },
  {
    src: db.projects.find((project) => project.id === 'yellow-residence').gallery[2],
    alt: db.projects.find((project) => project.id === 'yellow-residence').name,
  },
  {
    src: db.projects.find((project) => project.id === 'east-lane').gallery[5],
    alt: db.projects.find((project) => project.id === 'east-lane').name,
  },
  {
    src: db.projects.find((project) => project.id === 'levels-business-tower').gallery[13],
    alt: db.projects.find((project) => project.id === 'levels-business-tower').name,
  },
  {
    src: db.projects.find((project) => project.id === 'mid-lane').gallery[4],
    alt: db.projects.find((project) => project.id === 'mid-lane').name,
  },
  {
    src: db.projects.find((project) => project.id === 'mutlaa-city').gallery[5],
    alt: db.projects.find((project) => project.id === 'mutlaa-city').name,
  },
]

export default function DraggableBoxCarousel() {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFace, setSelectedFace] = useState(null)
  const rotateY = useMotionValue(45)
  const rotateX = useMotionValue(-25)
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 })
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 })
  const dragStart = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 })
  const isMobile = useIsMobile()
  const width = isMobile ? 240 : 300
  const height = isMobile ? 180 : 300
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
    setSelectedFace((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  const handleNextImage = () => {
    setSelectedFace((prev) => (prev + 1) % carouselItems.length)
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
      window.addEventListener('touchmove', handleTouchMove)
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
  }, [isDragging, selectedFace])

  return (
    <>
      <div
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{
          perspective: '1200px',
          width: `${width}px`,
          height: `${height}px`,
        }}
        className="relative select-none"
      >
        <motion.div
          style={{
            transform: `translateZ(-${depth / 2}px)`,
            rotateY: springRotateY,
            rotateX: springRotateX,
          }}
          className="relative w-full h-full transform-3d cursor-grab active:cursor-grabbing"
        >
          {/* Front Face */}
          <div
            onClick={() => handleFaceClick(0)}
            style={{
              transform: `rotateY(0deg) translateZ(${depth / 2}px)`,
            }}
            className="absolute w-full h-full overflow-hidden shadow-2xl hover:brightness-110 transition-all duration-300 backface-hidden cursor-pointer"
          >
            <img src={carouselItems[0].src} alt={carouselItems[0].alt} draggable={false} className="w-full h-full object-cover" />
          </div>

          {/* Right Face */}
          <div
            onClick={() => handleFaceClick(1)}
            className="absolute w-full h-full overflow-hidden shadow-2xl hover:brightness-110 transition-all duration-300 cursor-pointer"
            style={{
              transform: `rotateY(90deg) translateZ(${depth / 2}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img src={carouselItems[1].src} alt={carouselItems[1].alt} draggable={false} className="w-full h-full object-cover" />
          </div>

          {/* Back Face */}
          <div
            onClick={() => handleFaceClick(2)}
            className="absolute w-full h-full overflow-hidden shadow-2xl hover:brightness-110 transition-all duration-300 cursor-pointer"
            style={{
              transform: `rotateY(180deg) translateZ(${depth / 2}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img src={carouselItems[2].src} alt={carouselItems[2].alt} draggable={false} className="w-full h-full object-cover" />
          </div>

          {/* Left Face */}
          <div
            onClick={() => handleFaceClick(3)}
            className="absolute w-full h-full overflow-hidden shadow-2xl hover:brightness-110 transition-all duration-300 cursor-pointer"
            style={{
              transform: `rotateY(-90deg) translateZ(${depth / 2}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img src={carouselItems[3].src} alt={carouselItems[3].alt} draggable={false} className="w-full h-full object-cover" />
          </div>

          {/* Top Face */}
          <div
            onClick={() => handleFaceClick(4)}
            className="absolute w-full h-full overflow-hidden shadow-2xl hover:brightness-110 transition-all duration-300 cursor-pointer"
            style={{
              transform: `rotateX(90deg) translateZ(${depth / 2}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img src={carouselItems[4].src} alt={carouselItems[4].alt} draggable={false} className="w-full h-full object-cover" />
          </div>

          {/* Bottom Face */}
          <div
            onClick={() => handleFaceClick(5)}
            className="absolute w-full h-full overflow-hidden shadow-2xl hover:brightness-110 transition-all duration-300 cursor-pointer"
            style={{
              transform: `rotateX(-90deg) translateZ(${depth / 2}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img src={carouselItems[5].src} alt={carouselItems[5].alt} draggable={false} className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedFace !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="z-50 fixed inset-0 flex justify-center items-center bg-black/90 backdrop-blur-sm"
            onClick={handleCloseFullscreen}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-[90vw] h-full max-h-[70vh] flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={carouselItems[selectedFace].src}
                alt={carouselItems[selectedFace].alt}
                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
              />

              {/* Previous Button */}
              <button
                onClick={handlePreviousImage}
                className="top-1/2 left-4 absolute bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all -translate-y-1/2 duration-200 p-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextImage}
                className="top-1/2 right-4 absolute bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all -translate-y-1/2 duration-200 p-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={handleCloseFullscreen}
                className="top-4 right-4 absolute bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-200 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
