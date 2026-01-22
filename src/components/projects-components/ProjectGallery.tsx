'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Project } from '@/types/project'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function ProjectGallery({ project }: { project: Project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!project || !project.gallery?.length) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (project.gallery?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (project.gallery?.length || 1)) % (project.gallery?.length || 1))
  }

  return (
    <section className="relative w-full bg-black py-24 pb-40">
      <div className="container">
        <AnimIn delay={0.2} className="flex md:flex-row flex-col justify-between md:items-end gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="font-sec text-main text-4xl uppercase tracking-widest">Gallery</h2>
            <p className="font-light text-text/60 text-lg">Visualizing the masterpiece in every detail.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="font-mono text-text/40 text-xl">
              <span className="text-main">{String(currentImageIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(project.gallery.length).padStart(2, '0')}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevImage}
                className="group bg-white/5 hover:bg-main/20 border border-white/10 rounded-full transition-all duration-500 p-4"
              >
                <ChevronLeft className="w-6 h-6 text-text group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextImage}
                className="group bg-white/5 hover:bg-main/20 border border-white/10 rounded-full transition-all duration-500 p-4"
              >
                <ChevronRight className="w-6 h-6 text-text group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </AnimIn>

        <AnimIn delay={0.4} className="relative w-full aspect-video overflow-hidden border border-white/5 rounded-[2rem]">
          <Image
            src={project.gallery[currentImageIndex]}
            alt={`${project.name} - Image ${currentImageIndex + 1}`}
            fill
            sizes="100vw"
            className="object-cover transition-opacity duration-700"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </AnimIn>

        {/* Thumbnails Strip */}
        <AnimIn delay={0.6} className="overflow-x-auto flex gap-4 mt-8 pb-4 no-scrollbar">
          {project.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`relative shrink-0 w-32 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 ${i === currentImageIndex ? 'border-main scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
            >
              <Image src={img} alt="thumb" fill className="object-cover" />
            </button>
          ))}
        </AnimIn>
      </div>
    </section>
  )
}
