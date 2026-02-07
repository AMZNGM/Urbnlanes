'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { getYouTubeEmbedUrl, isYouTubeUrl, getYouTubeThumbnailUrl } from '@/hooks/useVideoUtils'
import { Project } from '@/types/project'
import { Asterisk, LampIcon, Play } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import ArrowBtn from '@/components/ui/buttons/ArrowBtn'
import SwitchBtn from '@/components/ui/buttons/SwitchBtn'
import VideoModal from '@/components/shared/VideoModal'
import LineHeading from '@/components/shared/LineHeading'

export default function ProjectGallery({ project }: { project: Project }) {
  let { scrollYProgress } = useScroll()
  let [darkMode, setDarkMode] = useState(false)
  let [currentImageIndex, setCurrentImageIndex] = useState(0)
  let [fullGallery, setFullGallery] = useState(null as string[] | null)
  let [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  let mapImages = project.gallery?.filter((img) => img.includes('-map.webp')) || []
  let masterPlanImages = project.gallery?.filter((img) => img.includes('-masterplan.webp')) || []
  let regularGallery = project.gallery?.filter((img) => !img.includes('-map.webp') && !img.includes('-masterplan.webp')) || []

  let closeModel = () => setSelectedVideo(null)

  if (!project || !project.gallery?.length) return null

  let nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (project.gallery?.length || 1))
  }

  let prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (project.gallery?.length || 1)) % (project.gallery?.length || 1))
  }

  let handleDragEnd = (event: any, info: any) => {
    let { offset, velocity } = info
    let swipeThreshold = 50

    if (offset.x > swipeThreshold || velocity.x > 500) {
      prevImage()
    } else if (offset.x < -swipeThreshold || velocity.x < -500) {
      nextImage()
    }
  }

  useEffect(() => {
    let handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [project.gallery?.length])

  return (
    <section
      className={`relative w-dvw overflow-hidden px-18 max-md:px-4 pt-38 pb-22 space-y-12 transition-colors duration-300 ${!darkMode ? 'bg-black text-text' : 'text-bg bg-text'}`}
    >
      <div className="flex justify-center items-center text-center">
        <AnimText as={'h2'} className="font-sec font-bold text-[6dvw] rtl:leading-40">
          <TText tKey="gallery.project" />
        </AnimText>

        <motion.div style={{ rotate: useTransform(scrollYProgress, [0, 1], ['180deg', '1800deg']) }}>
          <Asterisk className="size-[6dvw] mb-2 md:mb-8" />
        </motion.div>

        <AnimText as={'h2'} className="font-sec font-bold text-[6dvw] rtl:leading-40">
          <TText tKey="gallery.gallery" />
        </AnimText>
      </div>

      <AnimIn className="flex max-md:flex-col justify-end items-end max-md:items-center gap-8 max-md:gap-12">
        <div className="max-md:w-full flex max-md:justify-between items-center gap-8">
          <AnimIn delay={0.5} className="group flex items-center gap-2">
            <MainBtn onClick={() => setDarkMode(!darkMode)} className="z-10 relative text-main">
              <LampIcon />
            </MainBtn>

            <div className="w-fit bg-text opacity-0 group-hover:opacity-100 rounded-lg text-bg text-sm -translate-x-full group-hover:translate-x-0 duration-300 px-2 py-3">
              <TText tKey="gallery.lighting" />
            </div>
          </AnimIn>

          <div className="font-mono text-main/75 text-xl">
            <span className="text-main">{String(currentImageIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(project.gallery?.length || 0).padStart(2, '0')}</span>
          </div>

          <div className="flex gap-2 md:scale-125">
            <ArrowBtn onClick={prevImage} />
            <ArrowBtn onClick={nextImage} direction="right" />
          </div>
        </div>
      </AnimIn>

      <motion.div
        drag="x"
        onDragEnd={handleDragEnd}
        dragConstraints={{ left: 0, right: 0 }}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      >
        <ImageIn
          src={regularGallery[currentImageIndex] || project.gallery[0]}
          alt={`${project.name} - Image ${currentImageIndex + 1}`}
          priority
          sizes="100vw"
          className="rounded-lg hover:scale-100! pointer-events-none"
          divClassName="aspect-video overflow-hidden rounded-lg"
        />
      </motion.div>

      <div className="group w-full flex flex-row-reverse items-center gap-2">
        <SwitchBtn
          checked={!!fullGallery}
          onChange={(checked: boolean) => setFullGallery(checked ? project.gallery || [] : null)}
          className="z-10 relative"
          aria-label="Toggle full gallery view"
        />

        <div className="w-fit bg-text opacity-0 group-hover:opacity-100 rounded-lg text-bg text-sm translate-x-full group-hover:translate-x-0 duration-300 px-4 py-1">
          <TText tKey="gallery.fullGallery" />
        </div>
      </div>

      {fullGallery && (
        <AnimIn style={{ scrollbarWidth: 'none' }} className="flex flex-col space-y-8 max-md:space-y-4">
          {regularGallery.map((img, i) => (
            <ImageIn
              src={img}
              alt="thumb"
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className="hover:scale-100!"
              divClassName="relative w-full h-full aspect-video rounded-lg overflow-hidden"
            />
          ))}
        </AnimIn>
      )}

      <AnimIn reAnim={!fullGallery} delay={0.3} style={{ scrollbarWidth: 'none' }} className="overflow-x-auto flex gap-4 p-4">
        {regularGallery.map((img, i) => (
          <ImageIn
            src={img}
            alt="thumb"
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            divClassName={`relative w-66 max-md:w-33 shrink-0 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${i === currentImageIndex ? 'border-main scale-105' : 'border-transparent opacity-75 hover:opacity-100'}`}
          />
        ))}
      </AnimIn>

      <AnimIn reAnim={!fullGallery} delay={0.3} style={{ scrollbarWidth: 'none' }} className="gap-4 max-md:gap-2 grid grid-cols-8 max-md:grid-cols-4">
        {regularGallery.map((img, i) => (
          <ImageIn
            src={img}
            alt="thumb"
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            divClassName={`relative w-full aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${i === currentImageIndex ? 'border-main scale-105' : 'border-transparent opacity-75 hover:opacity-100'}`}
          />
        ))}
      </AnimIn>

      {masterPlanImages.length > 0 && (
        <AnimIn delay={0.5} className="mt-16">
          <AnimText as={'h3'} className="font-sec text-2xl mb-6">
            <TText tKey="common.masterPlan" />
          </AnimText>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
            {masterPlanImages.map((planImg, i) => (
              <ImageIn key={i} src={planImg} alt={`${project.name} master plan ${i + 1}`} className="overflow-hidden rounded-lg" divClassName="aspect-video" />
            ))}
          </div>
        </AnimIn>
      )}

      {project.videoGallery && project.videoGallery.length > 0 && (
        <AnimIn delay={0.6} className="bg-main/15 rounded-lg p-4">
          <LineHeading tKey="projects.videoGallery.title" className="opacity-75 text-current mb-2" />

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {project.videoGallery.map((video, index) => {
              const isYouTube = isYouTubeUrl(video)
              const embedUrl = isYouTube ? getYouTubeEmbedUrl(video) : null

              return (
                <AnimIn
                  blur
                  center
                  key={index}
                  delay={0.1 * index}
                  onClick={() => setSelectedVideo(video)}
                  className="group relative aspect-video overflow-hidden bg-main/15 border-2 border-main/1 hover:border-main/20 rounded-lg transition-all cursor-pointer"
                >
                  {isYouTube && embedUrl ? (
                    <img src={getYouTubeThumbnailUrl(video) || ''} alt={`Video ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <video src={video} muted playsInline className="w-full h-full object-cover" />
                  )}

                  <div className="absolute inset-0 flex justify-center items-center bg-current/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 flex justify-center items-center bg-main rounded-full">
                      <Play size={26} className="fill-bg text-current" />
                    </div>
                  </div>

                  <div className="right-0 bottom-0 left-0 absolute bg-linear-to-t from-bg/80 to-transparent p-4">
                    <p className="space-x-1 font-medium text-text text-sm">
                      <span>{<TText tKey={`db.projects.${project.id}.name`} />}</span>
                      <span>{<TText tKey="projects.videoGallery.video" />}</span>
                      <span>{index + 1}</span>
                    </p>
                  </div>
                </AnimIn>
              )
            })}
          </div>
        </AnimIn>
      )}

      {project.constructionGallery && project.constructionGallery.length > 0 && (
        <AnimIn delay={0.6} className="bg-main/15 rounded-lg p-4">
          <LineHeading tKey="projects.constructionGallery.title" className="opacity-75 text-current mb-2" />

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {project.constructionGallery.map((video, index) => {
              const isYouTube = isYouTubeUrl(video)
              const embedUrl = isYouTube ? getYouTubeEmbedUrl(video) : null

              return (
                <AnimIn
                  key={index}
                  delay={0.1 * index}
                  onClick={() => setSelectedVideo(video)}
                  className="group relative aspect-video overflow-hidden bg-main/15 border-2 border-main/1 hover:border-main/20 rounded-lg transition-all cursor-pointer"
                >
                  {isYouTube && embedUrl ? (
                    <img src={getYouTubeThumbnailUrl(video) || ''} alt={`Video ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <video src={video} muted playsInline className="w-full h-full object-cover" />
                  )}

                  <div className="absolute inset-0 flex justify-center items-center bg-current/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 flex justify-center items-center bg-main rounded-full">
                      <Play size={26} className="fill-bg text-current" />
                    </div>
                  </div>

                  <div className="right-0 bottom-0 left-0 absolute bg-linear-to-t from-bg/80 to-transparent p-4">
                    <p className="space-x-1 font-medium text-text text-sm">
                      <span>{<TText tKey={`db.projects.${project.id}.name`} />}</span>
                      <span>{<TText tKey="projects.constructionGallery.update" />}</span>
                      <span>{index + 1}</span>
                    </p>
                  </div>
                </AnimIn>
              )
            })}
          </div>
        </AnimIn>
      )}

      {mapImages.length > 0 && (
        <AnimIn delay={0.4} className="bg-main/15 rounded-lg p-4">
          <LineHeading tKey="common.location" className="opacity-75 text-current mb-2" />

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {mapImages.map((mapImg, i) => (
              <AnimIn
                key={i}
                delay={0.1 * i}
                className="group relative aspect-video overflow-hidden bg-main/15 border-2 border-main/1 hover:border-main/20 rounded-lg transition-all cursor-pointer"
              >
                <ImageIn src={mapImg} alt={`${project.name} map ${i + 1}`} className="w-full h-full object-cover" />

                <div className="right-0 bottom-0 left-0 absolute bg-linear-to-t from-bg/80 to-transparent p-4">
                  <p className="space-x-1 font-medium text-text text-sm">
                    <span>{<TText tKey={`db.projects.${project.id}.name`} />}</span>
                    <span>{<TText tKey="common.location" />}</span>
                    <span>{i + 1}</span>
                  </p>
                </div>
              </AnimIn>
            ))}
          </div>
        </AnimIn>
      )}

      <VideoModal videos={selectedVideo} closeModel={closeModel} />
    </section>
  )
}
