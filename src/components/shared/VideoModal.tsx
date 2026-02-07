'use client'

import { motion, AnimatePresence } from 'motion/react'
import { getYouTubeEmbedUrl, isYouTubeUrl } from '@/hooks/useVideoUtils'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import CloseBtn from '@/components/ui/buttons/CloseBtn'

export default function VideoModal({ videos, closeModel }: { videos: string | null; closeModel: () => void }) {
  useBodyScrollLock(!!videos)

  return (
    <AnimatePresence>
      {videos && (
        <motion.div
          onClick={closeModel}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-60 fixed inset-0 bg-black/95 backdrop-blur-xs"
        >
          <motion.div initial={{ y: -80 }} animate={{ y: 0 }} exit={{ x: 50 }}>
            <CloseBtn onClick={closeModel} className="top-4 right-4 absolute!" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scaleX: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scaleX: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scaleX: 0, filter: 'blur(10px)' }}
            transition={{ type: 'spring', stiffness: 120, damping: 15, filter: { delay: 0.2 }, scaleX: { delay: 0.1 } }}
            className="relative w-full h-full flex justify-center items-center p-4"
          >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-6xl aspect-video">
              {isYouTubeUrl(videos) ? (
                <iframe
                  src={getYouTubeEmbedUrl(videos) || ''}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full bg-main/25 rounded-lg"
                />
              ) : (
                <video src={videos} controls autoPlay className="w-full h-full bg-main/25 rounded-lg" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
