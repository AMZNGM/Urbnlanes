import { RefObject, Dispatch, SetStateAction } from 'react'
import { MotionValue } from 'motion/react'

export interface HeroSlide {
  id: string
  title: string
  description: string
  image: string
  video: string | null
  buttonText: string
  buttonHref: string
  type: string
  data: any
}

export interface HeroData {
  currentIndex: number
  setCurrentIndex: Dispatch<SetStateAction<number>>
  showNextSlide: boolean
  setShowNextSlide: Dispatch<SetStateAction<boolean>>
  showPrevSlide: boolean
  setShowPrevSlide: Dispatch<SetStateAction<boolean>>
  isVideoMode: boolean
  setIsVideoMode: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  handleMediaLoad: () => void
  handleAnimationStart: () => void
  slides: HeroSlide[]
  currentSlide: HeroSlide
  progressScale: MotionValue<number>
  goToNext: () => void
  goToPrev: () => void
  goToSlide: (index: number) => void
  isMobile: boolean
  prefersReducedMotion: boolean | null
  videoRef: RefObject<HTMLVideoElement | null>
  t: (key: string, params?: any) => string
}
