'use client'

import { useHero } from '@/hooks/useHero'
import ArrowCursor from '@/components/ui/cursors/ArrowCursor'
import HeroVideoToggle from '@/components/hero-components/HeroVideoToggle'
import HeroIndicators from '@/components/hero-components/HeroIndicators'
import HeroControls from '@/components/hero-components/HeroControls'
import HeroBackground from '@/components/hero-components/HeroBackground'
import HeroContent from '@/components/hero-components/HeroContent'

export default function Hero() {
  let {
    currentIndex,
    showNextSlide,
    setShowNextSlide,
    showPrevSlide,
    setShowPrevSlide,
    isVideoMode,
    setIsVideoMode,
    isLoading,
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
  } = useHero()

  return (
    <section
      dir="ltr"
      role="region"
      aria-roledescription="hero-carousel"
      aria-label="Project showcase"
      className="relative w-dvw h-dvh overflow-hidden bg-bg text-text px-4 max-md:px-2"
    >
      <ArrowCursor />

      <HeroVideoToggle isVideoMode={isVideoMode} setIsVideoMode={setIsVideoMode} />

      <HeroIndicators slides={slides} currentIndex={currentIndex} goToSlide={goToSlide} progressScale={progressScale} />

      <HeroControls
        slides={slides}
        currentIndex={currentIndex}
        currentSlide={currentSlide}
        goToNext={goToNext}
        goToPrev={goToPrev}
        showNextSlide={showNextSlide}
        setShowNextSlide={setShowNextSlide}
        showPrevSlide={showPrevSlide}
        setShowPrevSlide={setShowPrevSlide}
        prefersReducedMotion={prefersReducedMotion}
      />

      <HeroBackground
        currentSlide={currentSlide}
        currentIndex={currentIndex}
        isVideoMode={isVideoMode}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
        videoRef={videoRef}
        slidesCount={slides.length}
        isLoading={isLoading}
        handleMediaLoad={handleMediaLoad}
        handleAnimationStart={handleAnimationStart}
      />

      <HeroContent currentSlide={currentSlide} currentIndex={currentIndex} prefersReducedMotion={prefersReducedMotion} />
    </section>
  )
}
