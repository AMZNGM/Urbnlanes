'use client'

import { useState } from 'react'
import { getYouTubeEmbedUrl, isYouTubeUrl, getYouTubeThumbnailUrl } from '@/hooks/useVideoUtils'
import { Project } from '@/types/project'
import { Play } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import VideoModal from '@/components/shared/VideoModal'

export default function ProjectConstructionGallery({ project }: { project: Project }) {
  let [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  let closeModel = () => setSelectedVideo(null)
  if (!project.constructionGallery || project.constructionGallery.length === 0) return null

  return (
    <section className="relative w-dvw overflow-hidden bg-black text-text px-18 max-md:px-4 py-12">
      <AnimText as={'h2'} className="font-sec text-2xl mb-8">
        <TText tKey="projects.constructionGallery.title" />
      </AnimText>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {project.constructionGallery.map((video, index) => {
          const isYouTube = isYouTubeUrl(video)
          const embedUrl = isYouTube ? getYouTubeEmbedUrl(video) : null

          return (
            <AnimIn
              key={index}
              delay={0.1 * index}
              onClick={() => setSelectedVideo(video)}
              className="group relative aspect-video overflow-hidden bg-main/25 border-2 border-main/1 hover:border-main/20 rounded-2xl transition-all cursor-pointer"
            >
              {isYouTube && embedUrl ? (
                <img src={getYouTubeThumbnailUrl(video) || ''} alt={`Video ${index + 1}`} className="w-full h-full object-cover" />
              ) : (
                <video src={video} muted playsInline className="w-full h-full object-cover" />
              )}

              <div className="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 flex justify-center items-center bg-main rounded-full">
                  <Play size={26} className="fill-black text-black" />
                </div>
              </div>

              <div className="right-0 bottom-0 left-0 absolute bg-linear-to-t from-black/80 to-transparent p-4">
                <p className="space-x-1 font-medium text-sm">
                  <span>{<TText tKey={`db.projects.${project.id}.name`} />}</span>
                  <span>{<TText tKey="projects.constructionGallery.update" />}</span>
                  <span>{index + 1}</span>
                </p>
              </div>
            </AnimIn>
          )
        })}
      </div>

      <VideoModal videos={selectedVideo} closeModel={closeModel} />
    </section>
  )
}
