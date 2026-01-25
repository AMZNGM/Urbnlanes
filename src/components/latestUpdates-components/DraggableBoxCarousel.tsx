'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useDraggableBoxCarousel } from '@/hooks/useDraggableBoxCarousel'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import db from '@/database/urbnlanes-db.json'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import ArrowBtn from '@/components/ui/buttons/ArrowBtn'

const carouselItems = [
  {
    src: db.projects.find((project) => project.id === 'yellow-lane')?.gallery[2] ?? '',
    alt: db.projects.find((project) => project.id === 'yellow-lane')?.name ?? '',
  },
  {
    src: db.projects.find((project) => project.id === 'yellow-residence')?.gallery[2] ?? '',
    alt: db.projects.find((project) => project.id === 'yellow-residence')?.name ?? '',
  },
  {
    src: db.projects.find((project) => project.id === 'east-lane')?.gallery[5] ?? '',
    alt: db.projects.find((project) => project.id === 'east-lane')?.name ?? '',
  },
  {
    src: db.projects.find((project) => project.id === 'levels-business-tower')?.gallery[13] ?? '',
    alt: db.projects.find((project) => project.id === 'levels-business-tower')?.name ?? '',
  },
  {
    src: db.projects.find((project) => project.id === 'mid-lane')?.gallery[4] ?? '',
    alt: db.projects.find((project) => project.id === 'mid-lane')?.name ?? '',
  },
  {
    src: db.projects.find((project) => project.id === 'mutlaa-city')?.gallery[5] ?? '',
    alt: db.projects.find((project) => project.id === 'mutlaa-city')?.name ?? '',
  },
]

export default function DraggableBoxCarousel({ className = '' }) {
  const {
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
  } = useDraggableBoxCarousel(carouselItems.length)

  return (
    <section className={`${className}`}>
      {/* Cube */}
      <AnimIn
        data-scroll
        data-scroll-speed="0.12"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{ width: `${width}px`, height: `${height}px` }}
        className="relative perspective-distant touch-none select-none"
      >
        <motion.div
          style={{ transform: `translateZ(-${depth / 2}px)`, rotateY: springRotateY, rotateX: springRotateX }}
          className="relative w-full h-full transform-3d cursor-grab active:cursor-grabbing"
        >
          {carouselItems.map((item, index) => {
            const transforms = [
              `rotateY(0deg) translateZ(${depth / 2}px)`, // Front
              `rotateY(90deg) translateZ(${depth / 2}px)`, // Right
              `rotateY(180deg) translateZ(${depth / 2}px)`, // Back
              `rotateY(-90deg) translateZ(${depth / 2}px)`, // Left
              `rotateX(90deg) translateZ(${depth / 2}px)`, // Top
              `rotateX(-90deg) translateZ(${depth / 2}px)`, // Bottom
            ]

            return (
              <div
                key={index}
                onClick={() => handleFaceClick(index)}
                style={{ transform: transforms[index] }}
                className="absolute w-full h-full overflow-hidden shadow-2xl hover:brightness-110 transition-all duration-300 backface-hidden cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.alt || ''}
                  draggable={false}
                  fill
                  priority
                  sizes="(max-width: 768px) 200px, 150px"
                  className="object-cover"
                />
              </div>
            )
          })}
        </motion.div>
      </AnimIn>

      {/* Modal */}
      <AnimatePresence>
        {selectedFace !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseFullscreen}
            className="z-50 fixed inset-0 flex justify-center items-center bg-black/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90dvw] h-[70dvh]"
            >
              <Image
                src={carouselItems[selectedFace].src}
                alt={carouselItems[selectedFace].alt || ''}
                fill
                sizes="(max-width: 768px) 45vw, 35vw"
                className="object-contain"
              />
              <div className="flex justify-between items-center gap-2">
                <CloseBtn onClick={handleCloseFullscreen} />
                <div className="space-x-2">
                  <ArrowBtn onClick={handleNextImage} className="rotate-180" />
                  <ArrowBtn onClick={handlePreviousImage} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
