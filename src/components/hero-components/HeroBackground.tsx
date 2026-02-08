import { RefObject } from 'react'
import { HeroSlide } from '@/types/hero'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function HeroBackground({
  currentSlide,
  currentIndex,
  isVideoMode,
  isMobile,
  videoRef,
  slidesCount,
  handleMediaLoad,
  handleAnimationStart,
}: {
  currentSlide: HeroSlide
  currentIndex: number
  isVideoMode: boolean
  isMobile: boolean
  videoRef: RefObject<HTMLVideoElement | null>
  slidesCount: number
  isLoading: boolean
  handleMediaLoad: () => void
  handleAnimationStart: () => void
}) {
  return (
    <AnimIn
      blur
      center
      reAnim={`${currentSlide.id || currentIndex}-${isVideoMode && !isMobile ? 'video' : 'image'}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${currentIndex + 1} of ${slidesCount}`}
      onAnimationStart={handleAnimationStart}
      className="inset-0 absolute!"
    >
      {!isMobile && isVideoMode && currentSlide.video ? (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            key={currentSlide.video}
            src={currentSlide.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={handleMediaLoad}
            onCanPlayThrough={(e) => (e.target as HTMLVideoElement).play()}
            poster={currentSlide.image}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ) : (
        currentSlide.image && (
          <div className="relative w-full h-full">
            <ImageIn
              src={currentSlide.image}
              alt={currentSlide.title || ''}
              priority
              onLoad={handleMediaLoad}
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 100vw"
            />
            <div className="z-10 absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent" />
          </div>
        )
      )}
    </AnimIn>
  )
}
