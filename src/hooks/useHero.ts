import { useState, useEffect, useMemo, useRef } from 'react'
import { useMotionValue, useTransform, animate, useReducedMotion } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { useIsMobile } from '@/hooks/useIsMobile'
import { HeroData, HeroSlide } from '@/types/hero'
import db from '@/database/urbnlanes-db.json'

const PROJECT_CONFIGS = [
  {
    id: 'yellow-residence',
    galleryIndex: 1,
    video: '/videos/projects/yellow-residence/yr-main-2.mp4',
  },
  {
    id: 'levels-business-tower',
    galleryIndex: 0,
    video: '/videos/projects/levels-tower/levels-e-and-1.mp4',
  },
  {
    id: 'yellow-lane',
    galleryIndex: 0,
    video: '/videos/projects/yellow-lane/yl-main-1.mp4',
  },
]

export function useHero(): HeroData {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showNextSlide, setShowNextSlide] = useState(false)
  const [showPrevSlide, setShowPrevSlide] = useState(false)
  const [isVideoMode, setIsVideoMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const duration = 5000
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  const slides = useMemo(() => {
    return PROJECT_CONFIGS.map((config) => {
      const project = db.projects.find((project) => project.id === config.id) as any
      if (!project) return null

      const slide: HeroSlide = {
        id: project.id,
        title: t(`db.projects.${project.id}.name`) || 'Project',
        description: t(`db.projects.${project.id}.shortDesc`) || t(`db.projects.${project.id}.description`) || '',
        image: (project.gallery && project.gallery[config.galleryIndex]) || '',
        video: config.video || project.video || null,
        buttonText: t('common.moreAboutProject', {
          name: t(`db.projects.${project.id}.name`) || 'Project',
        }),
        buttonHref: `/projects/${project.id}`,
        type: project.type,
        data: project,
      }
      return slide
    }).filter((s): s is HeroSlide => s !== null)
  }, [t])

  const currentSlide = useMemo(() => slides[currentIndex] || slides[0], [slides, currentIndex])

  const progressMotion = useMotionValue(0)
  const progressScale = useTransform(progressMotion, [0, 100], [0, 1])

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIndex(index)
    }
  }

  const handleMediaLoad = () => {
    setIsLoading(false)
  }

  const handleAnimationStart = () => {
    setIsLoading(true)
  }

  useEffect(() => {
    // Preload all slides images
    slides.forEach((slide) => {
      if (typeof window !== 'undefined') {
        const img = new Image()
        img.src = slide.image
      }
    })

    // Preload first video metadata
    if (!isMobile && slides[0]?.video) {
      if (typeof window !== 'undefined') {
        const video = document.createElement('video')
        video.src = slides[0].video
        video.preload = 'metadata'
      }
    }
  }, [slides, isMobile])

  // const preloadedAssets = useRef<Set<string>>(new Set())
  // useEffect(() => {
  //   if (typeof window === 'undefined') return

  //   // Preload all slides images
  //   slides.forEach((slide) => {
  //     if (slide.image && !preloadedAssets.current.has(slide.image)) {
  //       const img = new Image()
  //       img.src = slide.image
  //       preloadedAssets.current.add(slide.image)
  //     }
  //   })

  //   // Preload first video metadata
  //   const firstVideo = slides[0]?.video
  //   if (!isMobile && firstVideo && !preloadedAssets.current.has(firstVideo)) {
  //     const video = document.createElement('video')
  //     video.src = firstVideo
  //     video.preload = 'metadata'
  //     preloadedAssets.current.add(firstVideo)
  //   }
  // }, [slides, isMobile])

  useEffect(() => {
    const handleVisibility = () => {
      if (!videoRef.current || !isVideoMode || isMobile) return
      document.hidden ? videoRef.current.pause() : videoRef.current.play()
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [isVideoMode, isMobile])

  useEffect(() => {
    progressMotion.set(0)
    const controls = animate(progressMotion, 100, {
      duration: duration / 1000,
      ease: 'linear',
      onComplete: goToNext,
    })

    return () => controls.stop()
  }, [currentIndex, slides.length])

  return {
    currentIndex,
    setCurrentIndex,
    showNextSlide,
    setShowNextSlide,
    showPrevSlide,
    setShowPrevSlide,
    isVideoMode,
    setIsVideoMode,
    isLoading,
    setIsLoading,
    handleMediaLoad,
    handleAnimationStart,
    slides,
    currentSlide,
    progressScale,
    goToNext,
    goToPrev,
    goToSlide,
    isMobile,
    prefersReducedMotion,
    videoRef,
    t,
  }
}
