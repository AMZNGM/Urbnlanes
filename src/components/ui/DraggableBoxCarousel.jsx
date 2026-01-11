'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
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
  const rotateY = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 })
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 })
  const dragStart = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 })
  const isMobile = useIsMobile()
  const width = isMobile ? 240 : 500
  const height = isMobile ? 180 : 500
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

  useEffect(() => {
    const handleMouseUp = () => handleDragEnd()
    const handleTouchEnd = () => handleDragEnd()
    const handleMouseMove = (e) => handleDragMove(e)
    const handleTouchMove = (e) => handleDragMove(e)

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchend', handleTouchEnd)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove)

      return () => {
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchend', handleTouchEnd)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [isDragging])

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex justify-center items-center bg-black text-text">
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
            style={{
              transform: `rotateY(0deg) translateZ(${depth / 2}px)`,
            }}
            className="absolute w-full h-full overflow-hidden shadow-2xl backface-hidden"
          >
            <img src={carouselItems[0].src} alt={carouselItems[0].alt} draggable={false} className="w-full h-full object-cover" />
          </div>

          {/* Right Face */}
          <div
            className="absolute w-full h-full overflow-hidden shadow-2xl"
            style={{
              transform: `rotateY(90deg) translateZ(${depth / 2}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img src={carouselItems[1].src} alt={carouselItems[1].alt} draggable={false} className="w-full h-full object-cover" />
          </div>

          {/* Back Face */}
          <div
            className="absolute w-full h-full overflow-hidden shadow-2xl"
            style={{
              transform: `rotateY(180deg) translateZ(${depth / 2}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img src={carouselItems[2].src} alt={carouselItems[2].alt} draggable={false} className="w-full h-full object-cover" />
          </div>

          {/* Left Face */}
          <div
            className="absolute w-full h-full overflow-hidden shadow-2xl"
            style={{
              transform: `rotateY(-90deg) translateZ(${depth / 2}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img src={carouselItems[3].src} alt={carouselItems[3].alt} draggable={false} className="w-full h-full object-cover" />
          </div>

          {/* Top Face */}
          <div
            className="absolute w-full h-full overflow-hidden shadow-2xl"
            style={{
              transform: `rotateX(90deg) translateZ(${depth / 2}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img src={carouselItems[4].src} alt={carouselItems[4].alt} draggable={false} className="w-full h-full object-cover" />
          </div>

          {/* Bottom Face */}
          <div
            className="absolute w-full h-full overflow-hidden shadow-2xl"
            style={{
              transform: `rotateX(-90deg) translateZ(${depth / 2}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img src={carouselItems[5].src} alt={carouselItems[5].alt} draggable={false} className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
