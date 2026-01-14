'use client'

import Image from 'next/image'
import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useReducedMotion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { getProjectById } from '@/lib/getDatabase'
import ArrowCursor from '@/components/ui/cursors/ArrowCursor'
import MainBtn from '@/components/ui/buttons/MainBtn'
import SwitchBtn from '@/components/ui/buttons/SwitchBtn'

const PROJECT_CONFIGS = [
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

export default function ProgressCarousel() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showNextSlide, setShowNextSlide] = useState(false)
  const [showPrevSlide, setShowPrevSlide] = useState(false)
  const [isVideoMode, setIsVideoMode] = useState(false)
  const duration = 5000
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef(null)

  const slides = useMemo(() => {
    return PROJECT_CONFIGS.map((config) => {
      const project = getProjectById(config.id)
      if (!project) return null

      return {
        id: project.id,
        title: t(`db.projects.${project.id}.name`) || project.name || project.title || 'Project',
        description: t(`db.projects.${project.id}.description`) || project.shortDescription || project.tagline || project.description || '',
        image: (project.gallery && project.gallery[config.galleryIndex]) || project.gallery?.[0] || project.coverImage || '',
        video: config.video || project.video || null,
        buttonText: t('common.moreAboutProject', {
          name: t(`db.projects.${project.id}.name`) || project.name || project.title || 'Project',
        }),
        buttonHref: `/projects/${project.id}`,
        type: project.type,
        data: project,
      }
    }).filter(Boolean)
  }, [t])

  const currentSlide = useMemo(() => slides[currentIndex] || {}, [slides, currentIndex])

  const progressMotion = useMotionValue(0)
  const progressScale = useTransform(progressMotion, [0, 100], [0, 1])

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIndex(index)
    }
  }

  useEffect(() => {
    const handleVisibility = () => {
      if (!videoRef.current || !isVideoMode) return
      document.hidden ? videoRef.current.pause() : videoRef.current.play()
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [isVideoMode])

  useEffect(() => {
    progressMotion.set(0)
    const controls = animate(progressMotion, 100, {
      duration: duration / 1000,
      ease: 'linear',
      onComplete: goToNext,
    })

    return () => controls.stop()
  }, [currentIndex, slides.length])

  if (!slides.length) {
    return (
      <div className="relative w-full h-dvh overflow-hidden flex justify-center items-center bg-text text-bg">
        <h1>{t('noProjectsFound')}</h1>
      </div>
    )
  }

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Project showcase"
      className="relative w-full h-dvh overflow-hidden bg-black text-text"
    >
      <ArrowCursor />

      {/* Switch btn */}
      <div
        dir="ltr"
        className="top-38 max-md:top-28 right-18 max-md:right-4 z-99999 absolute h-10 flex items-center gap-4 bg-black/50 backdrop-blur-lg border border-text/10 rounded-full px-4"
      >
        <button
          onClick={() => setIsVideoMode(false)}
          className={`text-xs font-medium tracking-wider transition-colors cursor-pointer py-4 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 ${
            !isVideoMode ? 'text-text' : 'text-main hover:text-text'
          }`}
        >
          {t('common.image')}
        </button>

        <SwitchBtn checked={isVideoMode} onChange={setIsVideoMode} className="w-10" />

        <button
          onClick={() => setIsVideoMode(true)}
          className={`text-xs font-medium tracking-wider transition-colors cursor-pointer py-4 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 ${
            isVideoMode ? 'text-text' : 'text-main hover:text-text'
          }`}
        >
          {t('common.video')}
        </button>
      </div>

      {/* bg (Video or Image) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentSlide.id || currentIndex}-${isVideoMode ? 'video' : 'image'}`}
          initial={{ opacity: 0, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0"
          role="group"
          aria-roledescription="slide"
          aria-label={`${currentIndex + 1} of ${slides.length}`}
        >
          {isVideoMode && currentSlide.video ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                key={currentSlide.video}
                src={currentSlide.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="z-10 absolute inset-0 bg-black/40" />
              <div className="z-10 absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
            </div>
          ) : (
            currentSlide.image && (
              <div className="relative w-full h-full">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  priority={currentIndex === 0}
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="z-10 absolute inset-0 bg-black/30" />
                <div className="z-10 absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
              </div>
            )
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="z-20 relative h-full flex flex-col justify-end gap-12 p-18 max-md:p-4">
        {/* Next slide hover area */}
        <button
          onClick={goToNext}
          onMouseEnter={() => setShowNextSlide(true)}
          onMouseLeave={() => setShowNextSlide(false)}
          aria-label="Next project"
          className="rtl:hidden max-md:hidden right-0 z-20 absolute inset-y-0 w-1/3 flex justify-end items-center focus:outline-none pr-12 cursor-pointer"
        >
          <AnimatePresence>
            {showNextSlide && (
              <motion.div
                initial={{ x: document.dir === 'ltr' ? '200%' : '400%' }}
                animate={{ x: document.dir === 'ltr' ? 0 : '100%' }}
                exit={{ x: document.dir === 'ltr' ? '200%' : '400%' }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  type: 'spring',
                  stiffness: 80,
                  ease: 'easeInOut',
                }}
                className="max-w-md bg-black/25 opacity-75 rounded-2xl scale-80 p-6 select-none"
              >
                <p className="text-text/70 text-sm uppercase tracking-wider mb-2">{t('common.nextProject')}</p>
                <h3 className="font-medium text-2xl">{slides[(currentIndex + 1) % slides.length]?.title || ''}</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Previous slide hover area */}
        <button
          onClick={goToPrev}
          onMouseEnter={() => setShowPrevSlide(true)}
          onMouseLeave={() => setShowPrevSlide(false)}
          aria-label="Previous project"
          className="rtl:hidden max-md:hidden left-0 z-20 absolute inset-y-0 w-1/3 flex justify-start items-center focus:outline-none pl-12 cursor-pointer"
        >
          <AnimatePresence>
            {showPrevSlide && (
              <motion.div
                initial={{ x: document.dir === 'ltr' ? '-200%' : '-400%' }}
                animate={{ x: document.dir === 'ltr' ? 0 : '-100%' }}
                exit={{ x: document.dir === 'ltr' ? '-200%' : '-400%' }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  type: 'spring',
                  stiffness: 80,
                  ease: 'easeInOut',
                }}
                className="max-w-md bg-black/25 opacity-75 rounded-2xl scale-80 p-6 select-none"
              >
                <p className="text-text/70 text-sm uppercase tracking-wider mb-2">{t('common.previousProject')}</p>
                <h3 className="font-medium text-2xl">{slides[(currentIndex - 1 + slides.length) % slides.length]?.title || ''}</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="z-40 relative max-w-4xl space-y-6 rounded-2xl p-2"
          >
            <h1 className="font-sec font-light text-text text-5xl md:text-7xl lg:text-8xl tracking-tight">{currentSlide.title}</h1>

            <p className="max-w-2xl font-light text-text/90 text-xl">{currentSlide.description}</p>

            <MainBtn href={currentSlide.buttonHref} className="z-40 relative">
              {currentSlide.buttonText}
            </MainBtn>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="flex gap-3 max-md:gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="group relative h-11 flex flex-1 items-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 cursor-pointer"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            >
              <div className="relative w-full h-0.5 overflow-hidden bg-text/30">
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-text/50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

                {/* Active progress bar */}
                {index === currentIndex && (
                  <motion.div className="absolute inset-0 bg-text ltr:origin-left rtl:origin-right" style={{ scaleX: progressScale }} />
                )}

                {/* Completed slides */}
                {index < currentIndex && <div className="absolute inset-0 bg-text" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="md:hidden bottom-8 left-1/2 z-30 absolute flex items-center gap-1 transition-all -translate-x-1/2 duration-300">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="w-10 h-10 flex justify-center items-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-text w-8 h-2' : 'bg-text/50 w-2 h-2 hover:bg-text/75'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
