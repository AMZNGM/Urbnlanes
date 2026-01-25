'use client'

import { Project } from '@/types/project'
import { Play, X, HardHat } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface ConstructionGalleryProps {
  project: Project
}

export default function ProjectConstructionGallery({ project }: ConstructionGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  if (!project.constructionGallery || project.constructionGallery.length === 0) return null

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  return (
    <section className="relative w-dvw overflow-hidden bg-main/5 text-black px-18 max-md:px-4 py-12">
      <div className="flex justify-center items-center gap-3 mb-8">
        <HardHat className="w-10 h-10 text-main" />
        <AnimText as={'h2'} className="font-sec text-4xl text-center rtl:leading-12">
          <TText tKey="projects.constructionGallery.title" />
        </AnimText>
      </div>

      <AnimIn className="max-w-7xl gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
        {project.constructionGallery.map((video, index) => {
          const isYouTube = isYouTubeUrl(video)
          const embedUrl = isYouTube ? getYouTubeEmbedUrl(video) : null

          return (
            <div
              key={index}
              className="group relative aspect-video overflow-hidden bg-black/10 border-2 border-main/20 hover:border-main/40 rounded-xl transition-colors cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              {isYouTube && embedUrl ? (
                <img
                  src={`https://img.youtube.com/vi/${embedUrl.split('/').pop()}/maxresdefault.jpg`}
                  alt={`Construction Update ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video src={video} className="w-full h-full object-cover" muted playsInline />
              )}

              <div className="absolute inset-0 flex justify-center items-center bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 flex justify-center items-center bg-main rounded-full">
                  <Play className="w-8 h-8 fill-black text-black ml-1" />
                </div>
              </div>

              <div className="right-0 bottom-0 left-0 absolute bg-linear-to-t from-black/90 to-transparent p-4">
                <p className="font-medium text-text text-sm">
                  <TText tKey="projects.constructionGallery.update" /> {index + 1}
                </p>
              </div>
            </div>
          )
        })}
      </AnimIn>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 fixed inset-0 flex justify-center items-center bg-black/95 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              className="top-4 right-4 z-10 absolute w-12 h-12 flex justify-center items-center bg-text/10 hover:bg-text/20 rounded-full transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-6 h-6 text-text" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-6xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {isYouTubeUrl(selectedVideo) ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideo) || ''}
                  className="w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={selectedVideo} className="w-full h-full rounded-xl" controls autoPlay />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
