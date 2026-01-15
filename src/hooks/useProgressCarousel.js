'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useMotionValue, useTransform, animate, useReducedMotion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { useIsMobile } from '@/hooks/useIsMobile'
import { getProjectById } from '@/lib/getDatabase'

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

export function useProgressCarousel() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
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
