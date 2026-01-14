'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { getProjectById } from '@/lib/getDatabase'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import ArrowCursor from '@/components/ui/cursors/ArrowCursor'
import MainBtn from '@/components/ui/buttons/MainBtn'
import SwitchBtn from '@/components/ui/buttons/SwitchBtn'

export default function ProgressCarousel() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [slides, setSlides] = useState([])
  const [showNextSlide, setShowNextSlide] = useState(false)
  const [showPrevSlide, setShowPrevSlide] = useState(false)
  const [isVideoMode, setIsVideoMode] = useState(true)
  const duration = 5000

  const projectConfigs = [
    {
      id: 'levels-business-tower',
      galleryIndex: 12,
      video: '/videos/projects/levels-tower/levels-e-and.mp4',
    },
    {
      id: 'east-lane',
      galleryIndex: 4,
      video: '/videos/projects/east-lane/el-main.mp4',
    },
    {
      id: 'yellow-lane',
      galleryIndex: 6,
      video: '/videos/projects/yellow-lane/yl-main.mp4',
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
            title: t(`db.projects.${project.id}.name`) || project.name || project.title || 'Project',
            description:
              t(`db.projects.${project.id}.description`) || project.shortDescription || project.tagline || project.description || '',
            image: (project.gallery && project.gallery[config.galleryIndex]) || project.gallery?.[0] || project.coverImage || '',
            video: config.video || project.video || null,
            buttonText: t('common.moreAboutProject', {
              name: t(`db.projects.${project.id}.name`) || project.name || project.title || 'Project',
            }),
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

  if (isLoading) {
    return (
      <div className="h-dvh">
        <LoadingLogo />
      </div>
    )
  }

  if (!slides.length) {
    return (
      <div className="relative w-full h-dvh overflow-hidden flex justify-center items-center bg-text text-bg">
        <h1>{t('noProjectsFound')}</h1>
      </div>
    )
  }

  const currentSlide = slides[currentIndex] || {}

  return (
    <section className="relative w-full h-dvh overflow-hidden bg-black text-text">
      <ArrowCursor />

      <div className="top-44 max-md:top-28 right-18 max-md:right-4 z-99999 absolute h-13 flex items-center gap-4 bg-black/30 backdrop-blur-md border border-text/10 rounded-full px-5">
        <span
          onClick={() => setIsVideoMode(false)}
          className={`text-xs font-medium tracking-wider transition-colors cursor-pointer py-4 ${
            !isVideoMode ? 'text-text' : 'text-main hover:text-text'
          }`}
        >
          Image
        </span>

        <SwitchBtn checked={isVideoMode} onChange={setIsVideoMode} className="w-12" />

        <span
          onClick={() => setIsVideoMode(true)}
          className={`text-xs font-medium tracking-wider transition-colors cursor-pointer py-4 ${
            isVideoMode ? 'text-text' : 'text-main hover:text-text'
          }`}
        >
          Video
        </span>
      </div>

      {/* bg (Video or Image) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentSlide.id || currentIndex}-${isVideoMode ? 'video' : 'image'}`}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0"
        >
          {currentSlide.video && isVideoMode ? (
            <div className="relative w-full h-full">
              <video src={currentSlide.video} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
              {/* <div className="absolute inset-0 bg-black/20" /> */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
            </div>
          ) : (
            currentSlide.image && (
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${currentSlide.image})` }}>
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
              </div>
            )
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end gap-12 p-18 max-md:p-4">
        {/* Next slide hover area */}
        <div
          onClick={goToNext}
          onMouseEnter={() => setShowNextSlide(true)}
          onMouseLeave={() => setShowNextSlide(false)}
          className="max-md:hidden right-0 z-20 absolute inset-y-0 w-1/3 flex justify-end items-center pr-12 cursor-pointer"
        >
          <AnimatePresence>
            {showNextSlide && (
              <motion.div
                initial={{ x: document.dir === 'ltr' ? '200%' : '400%' }}
                animate={{ x: document.dir === 'ltr' ? 0 : '100%' }}
                exit={{ x: document.dir === 'ltr' ? '200%' : '400%' }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 80, ease: 'easeInOut' }}
                className="max-w-md bg-black/25 opacity-75 backdrop-blur-sm rounded-2xl scale-80 p-6 select-none"
              >
                <p className="text-text/70 text-sm uppercase tracking-wider mb-2">{t('common.nextProject')}</p>
                <h3 className="font-medium text-2xl">{slides[(currentIndex + 1) % slides.length]?.title || ''}</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Previous slide hover area */}
        <div
          onClick={goToPrev}
          onMouseEnter={() => setShowPrevSlide(true)}
          onMouseLeave={() => setShowPrevSlide(false)}
          className="max-md:hidden left-0 z-20 absolute inset-y-0 w-1/3 flex justify-start items-center pl-12 cursor-pointer"
        >
          <AnimatePresence>
            {showPrevSlide && (
              <motion.div
                initial={{ x: document.dir === 'ltr' ? '-200%' : '-400%' }}
                animate={{ x: document.dir === 'ltr' ? 0 : '-100%' }}
                exit={{ x: document.dir === 'ltr' ? '-200%' : '-400%' }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 80, ease: 'easeInOut' }}
                className="max-w-md bg-black/25 opacity-75 backdrop-blur-sm rounded-2xl scale-80 p-6 select-none"
              >
                <p className="text-text/70 text-sm uppercase tracking-wider mb-2">{t('common.previousProject')}</p>
                <h3 className="font-medium text-2xl">{slides[(currentIndex - 1 + slides.length) % slides.length]?.title || ''}</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="z-40 relative max-w-4xl space-y-6 backdrop-blur-xs rounded-2xl p-2"
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
                  className="absolute inset-0 bg-text ltr:origin-left rtl:origin-right"
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
