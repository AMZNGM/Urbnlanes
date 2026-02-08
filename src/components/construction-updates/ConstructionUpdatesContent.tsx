'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, ChevronDown, Calendar } from 'lucide-react'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import VideoModal from '@/components/shared/VideoModal'

interface Update {
  projectId: string
  projectName: string
  location: any
  date: string
  updates: string[]
}

export default function ConstructionUpdatesContent() {
  let [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  let [expandedId, setExpandedId] = useState<string | null>(null)
  let closeModel = () => setSelectedVideo(null)

  const updates = useMemo(() => {
    const groups: Update[] = []
    const projectsWithUpdates = db.projects.filter((project) => project.constructionGallery && project.constructionGallery.length > 0)
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    projectsWithUpdates.forEach((project) => {
      const gallery = project.constructionGallery || []
      for (let i = 0; i < gallery.length; i += 2) {
        const monthIndex = Math.floor(i / 2) % 12
        const simulatedDate = `${months[monthIndex]} 2024`
        groups.push({
          projectId: project.id,
          projectName: project.name,
          location: project.location,
          date: simulatedDate,
          updates: gallery.slice(i, i + 2),
        })
      }
    })

    return groups.reverse()
  }, [])

  if (updates.length === 0) {
    return (
      <section className="relative w-dvw bg-text text-bg px-4 max-md:px-2 py-12">
        <p className="bg-main/25 rounded-lg text-xl text-center normal-case py-12">
          <TText tKey="common.noProjectsFound" />
        </p>
      </section>
    )
  }

  return (
    <section className="relative w-dvw bg-bg text-text px-4 py-24">
      <div className="max-w-6xl space-y-4 mx-auto">
        {updates.map((group, index) => {
          let id = `${group.projectId}-${index}`
          let isExpanded = expandedId === id

          return (
            <AnimIn key={id} delay={0.1 * index} className="border-text/30! last:border-0 border-b">
              <button onClick={() => setExpandedId(isExpanded ? null : id)} className="group w-full flex justify-between items-center py-8 cursor-pointer">
                <div className="flex items-center gap-8 max-md:gap-4">
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2 font-mono text-main text-xs tracking-widest">
                      <Calendar size={12} /> {group.date}
                    </span>

                    <h3 className="font-sec group-hover:text-main text-xl md:text-5xl uppercase transition-colors duration-100 mt-1">
                      <TText tKey={`db.projects.${group.projectId}.name`} />
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="max-md:hidden opacity-40 font-mono text-[10px] tracking-widest">
                    {group.location?.city ? <TText tKey={`locations.${group.location.city}`} /> : ''}
                  </div>

                  <div className="border border-text/30! group-hover:border-text! rounded-full text-main group-hover:text-text transition-colors duration-300 p-2">
                    <ChevronDown size={18} className={`transition-transform duration-300 ease-linear ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 pt-4 pb-12">
                      {group.updates.map((video, vindex) => (
                        <div
                          key={vindex}
                          onClick={() => setSelectedVideo(video)}
                          className="group relative aspect-video overflow-hidden bg-main rounded-lg cursor-pointer"
                        >
                          <div className="z-10 absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                          <ImageIn
                            src={db.projects.find((p) => p.id === group.projectId)?.gallery?.[0] || ''}
                            alt="Update"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            divClassName="absolute inset-0"
                          />

                          <div className="z-20 absolute inset-0 flex justify-center items-center">
                            <div className="w-14 h-14 flex justify-center items-center bg-bg/50 backdrop-blur-xl rounded-full">
                              <Play size={20} className="fill-text" />
                            </div>
                          </div>

                          <div className="bottom-4 left-4 z-20 absolute">
                            <p className="bg-bg/50 opacity-70 backdrop-blur-2xl rounded-lg font-mono text-[10px] tracking-widest p-2">
                              Progress Update {vindex + 1}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AnimIn>
          )
        })}
      </div>

      <VideoModal videos={selectedVideo} closeModel={closeModel} />
    </section>
  )
}
