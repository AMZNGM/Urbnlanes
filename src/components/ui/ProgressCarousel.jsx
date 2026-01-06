'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getProjectById } from '@/lib/getDatabase'
import ArrowCursor from '@/components/ui/cursors/ArrowCursor'
import MainBtn from '@/components/ui/buttons/MainBtn'
import LoadingSkeleton from '@/components/loading-components/LoadingSkeleton'

export default function ProgressCarousel() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [slides, setSlides] = useState([])
  const [showNextSlide, setShowNextSlide] = useState(false)
  const [showPrevSlide, setShowPrevSlide] = useState(false)
  const duration = 5000

  const projectConfigs = [
    {
      id: 'levels-business-tower',
      galleryIndex: 12,
    },
    {
      id: 'east-lane',
      galleryIndex: 4,
    },
    {
      id: 'yellow-lane',
      galleryIndex: 6,
    },
  ]

  useEffect(() => {
    const fetchProjects = () => {
      try {
        const allSlides = projectConfigs.map((config) => {
          const project = getProjectById(config.id)
          if (!project) return null

          return {
            id: project.id,
            title: project.name || project.title || 'Project',
            description: project.shortDescription || project.tagline || project.description || '',
            image: (project.gallery && project.gallery[config.galleryIndex]) || project.gallery?.[0] || project.coverImage || '',
            buttonText: `More about ${project.name || project.title || 'Project'} project`,
            buttonHref: `/projects/${project.id}`,
            type: project.type,
            data: project,
          }
        })

        const filteredSlides = allSlides.filter(Boolean)
        setSlides(filteredSlides)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    setProgress(0)
    const startTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(progressInterval)
      }
    }, 16) // ~60fps

    const slideTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, duration)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(slideTimeout)
    }
  }, [currentIndex, slides.length])

  const goToSlide = (index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIndex(index)
    }
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  const handleButtonClick = () => {
    // You can add navigation to the project detail page here
    if (slides.length > 0 && currentIndex >= 0 && currentIndex < slides.length) {
      const projectId = slides[currentIndex]?.id
      // Example: router.push(`/projects/${projectId}`);
    }
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!slides.length) {
    return (
      <div className="relative w-full h-full overflow-hidden flex justify-center items-center bg-text text-bg">
        <h1>No projects found</h1>
      </div>
    )
  }

  const currentSlide = slides[currentIndex] || {}

  return (
    <section className="relative w-full h-full overflow-hidden bg-bg text-text">
      <ArrowCursor />

      {/* bg image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id || currentIndex}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0"
        >
          {currentSlide.image && (
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${currentSlide.image})` }}>
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next slide hover area */}
      <div
        className="right-0 z-20 absolute inset-y-0 w-1/3 flex justify-end items-center pr-12 cursor-pointer"
        onMouseEnter={() => setShowNextSlide(true)}
        onMouseLeave={() => setShowNextSlide(false)}
        onClick={goToNext}
      >
        <AnimatePresence>
          {showNextSlide && (
            <motion.div
              initial={{ x: '200%' }}
              animate={{ x: 0 }}
              exit={{ x: '200%' }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 80, ease: 'easeInOut' }}
              className="max-w-md bg-black/25 opacity-75 backdrop-blur-sm rounded-l-lg scale-80 p-6 select-none"
            >
              <p className="text-text/70 text-sm uppercase tracking-wider mb-2">Next Project</p>
              <h3 className="font-medium text-2xl">{slides[(currentIndex + 1) % slides.length]?.title || ''}</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Previous slide hover area */}
      <div
        className="left-0 z-20 absolute inset-y-0 w-1/3 flex justify-start items-center pl-12 cursor-pointer"
        onMouseEnter={() => setShowPrevSlide(true)}
        onMouseLeave={() => setShowPrevSlide(false)}
        onClick={goToPrev}
      >
        <AnimatePresence>
          {showPrevSlide && (
            <motion.div
              initial={{ x: '-200%' }}
              animate={{ x: 0 }}
              exit={{ x: '-200%' }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 80, ease: 'easeInOut' }}
              className="max-w-md bg-black/25 opacity-75 backdrop-blur-sm rounded-l-lg scale-80 p-6 select-none"
            >
              <p className="text-text/70 text-sm uppercase tracking-wider mb-2">Previous Project</p>
              <h3 className="font-medium text-2xl">{slides[(currentIndex - 1 + slides.length) % slides.length]?.title || ''}</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end gap-12 p-18 max-md:p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="max-w-4xl space-y-6"
          >
            <h1 className="font-sec font-light text-text text-5xl md:text-7xl lg:text-8xl tracking-tight">{slides[currentIndex].title}</h1>

            <p className="max-w-2xl font-light text-text/90 text-xl">{slides[currentIndex].description}</p>

            <MainBtn href={slides[currentIndex].buttonHref} className="z-40 relative">
              {slides[currentIndex].buttonText}
            </MainBtn>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="flex gap-3 max-md:gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="group relative h-0.5 overflow-hidden flex-1 bg-text/30 cursor-pointer"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Background hover effect */}
              <div className="absolute inset-0 bg-text/50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

              {/* Active progress bar */}
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-text origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              )}

              {/* Completed slides */}
              {index < currentIndex && <div className="absolute inset-0 bg-text" />}
            </button>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="md:hidden bottom-8 left-1/2 absolute space-x-2 -translate-x-1/2 transform">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-text w-8' : 'bg-text/50 hover:bg-text/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
