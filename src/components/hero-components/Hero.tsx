'use client'

import { useHero } from '@/hooks/useHero'
import ArrowCursor from '@/components/ui/cursors/ArrowCursor'
import HeroBackground from '@/components/hero-components/HeroBackground'
import HeroVideoToggle from '@/components/hero-components/HeroVideoToggle'
import HeroControls from '@/components/hero-components/HeroControls'
import HeroContent from '@/components/hero-components/HeroContent'
import HeroIndicators from '@/components/hero-components/HeroIndicators'

export default function Hero() {
  const {
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

      <HeroVideoToggle isVideoMode={isVideoMode} setIsVideoMode={setIsVideoMode} />

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

      <div className="z-20 relative h-full flex flex-col justify-end gap-12 p-18 max-md:p-4">
        <HeroControls
          slides={slides}
          currentIndex={currentIndex}
          goToNext={goToNext}
          goToPrev={goToPrev}
          showNextSlide={showNextSlide}
          setShowNextSlide={setShowNextSlide}
          showPrevSlide={showPrevSlide}
          setShowPrevSlide={setShowPrevSlide}
          prefersReducedMotion={prefersReducedMotion}
        />

        <HeroContent currentSlide={currentSlide} currentIndex={currentIndex} prefersReducedMotion={prefersReducedMotion} />

        <HeroIndicators slides={slides} currentIndex={currentIndex} goToSlide={goToSlide} progressScale={progressScale} />
      </div>
    </section>
  )
}
