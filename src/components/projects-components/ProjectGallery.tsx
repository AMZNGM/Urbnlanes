'use client'

import { useState } from 'react'
import { Project } from '@/types/project'
import { Lamp } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import ArrowBtn from '@/components/ui/buttons/ArrowBtn'
import SwitchBtn from '@/components/ui/buttons/SwitchBtn'

export default function ProjectGallery({ project }: { project: Project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [fullGallery, setFullGallery] = useState(null as string[] | null)
  const [darkMode, setDarkMode] = useState(null as string[] | null)
  const mapImages = project.gallery?.filter((img) => img.includes('-map.webp')) || []
  const masterPlanImages = project.gallery?.filter((img) => img.includes('-masterplan.webp')) || []
  const regularGallery = project.gallery?.filter((img) => !img.includes('-map.webp') && !img.includes('-masterplan.webp')) || []

  if (!project || !project.gallery?.length) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (project.gallery?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (project.gallery?.length || 1)) % (project.gallery?.length || 1))
  }

  return (
    <section
      className={`relative w-dvw overflow-hidden px-18 max-md:px-4 py-12 space-y-12 transition-colors duration-300 ${!darkMode ? 'bg-black text-text' : 'text-black bg-text'}`}
    >
      <AnimIn delay={1} className="group flex items-center gap-2">
        <MainBtn onClick={() => setDarkMode(darkMode ? null : project.gallery || [])} size="lg" className="z-10 relative">
          <Lamp />
        </MainBtn>

        <div className="w-fit bg-text opacity-0 group-hover:opacity-100 rounded-2xl text-black text-sm -translate-x-full group-hover:translate-x-0 duration-300 px-4 py-4">
          <TText tKey="gallery.lighting" />
        </div>
      </AnimIn>

      <AnimIn className="flex max-md:flex-col justify-between items-end max-md:items-center gap-8 max-md:gap-12">
        <div className="space-y-2 max-md:text-center">
          <AnimText as={'h2'} delay={0.9} className="font-sec text-4xl">
            <TText tKey="gallery.title" />
          </AnimText>

          <AnimText as={'p'} delay={1.2} className="opacity-75 font-light">
            <TText tKey="gallery.description" />
          </AnimText>
        </div>

        <div className="max-md:w-full flex max-md:justify-between items-center gap-6">
          <div className="font-mono text-text/40 text-xl">
            <span className="text-main">{String(currentImageIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(project.gallery.length).padStart(2, '0')}</span>
          </div>

          <div className="flex rtl:flex-row-reverse gap-6">
            <ArrowBtn onClick={prevImage} className="scale-125" />
            <ArrowBtn onClick={nextImage} direction="right" className="scale-125" />
          </div>
        </div>
      </AnimIn>

      <ImageIn
        src={regularGallery[currentImageIndex] || project.gallery[0]}
        alt={`${project.name} - Image ${currentImageIndex + 1}`}
        priority
        sizes="100vw"
        className="hover:scale-100!"
        divClassName="aspect-video overflow-hidden rounded-2xl"
      />

      <AnimIn delay={0.6} style={{ scrollbarWidth: 'none' }} className="overflow-x-auto flex gap-4 p-4">
        {regularGallery.map((img, i) => (
          <ImageIn
            src={img}
            alt="thumb"
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            divClassName={`relative w-66 max-md:w-33 shrink-0 aspect-video rounded-2xl overflow-hidden border-2 transition-all duration-300 ${i === currentImageIndex ? 'border-main scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
          />
        ))}
      </AnimIn>

      <AnimIn delay={0.6} style={{ scrollbarWidth: 'none' }} className="gap-4 max-md:gap-2 grid grid-cols-8 max-md:grid-cols-4">
        {regularGallery.map((img, i) => (
          <ImageIn
            src={img}
            alt="thumb"
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            divClassName={`relative w-full aspect-video rounded-2xl overflow-hidden border-2 transition-all duration-300 ${i === currentImageIndex ? 'border-main scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
          />
        ))}
      </AnimIn>

      <div className="group w-full flex flex-row-reverse items-center gap-2">
        <SwitchBtn
          checked={!!fullGallery}
          onChange={(checked: boolean) => setFullGallery(checked ? project.gallery || [] : null)}
          className="z-10 relative"
          aria-label="Toggle full gallery view"
        />

        <div className="w-fit bg-text opacity-0 group-hover:opacity-100 rounded-2xl text-black text-sm translate-x-full group-hover:translate-x-0 duration-300 px-4 py-1">
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
              divClassName="relative w-full h-full aspect-video rounded-2xl overflow-hidden"
            />
          ))}
        </AnimIn>
      )}

      {mapImages.length > 0 && (
        <AnimIn delay={0.8} className="mt-16">
          <AnimText as={'h3'} className="font-sec text-2xl mb-6">
            <TText tKey="common.location" />
          </AnimText>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            {mapImages.map((mapImg, i) => (
              <ImageIn key={i} src={mapImg} alt={`${project.name} map ${i + 1}`} className="overflow-hidden rounded-2xl" divClassName="aspect-video" />
            ))}
          </div>
        </AnimIn>
      )}

      {masterPlanImages.length > 0 && (
        <AnimIn delay={1} className="mt-16">
          <AnimText as={'h3'} className="font-sec text-2xl mb-6">
            <TText tKey="common.masterPlan" />
          </AnimText>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            {masterPlanImages.map((planImg, i) => (
              <ImageIn key={i} src={planImg} alt={`${project.name} master plan ${i + 1}`} className="overflow-hidden rounded-2xl" divClassName="aspect-video" />
            ))}
          </div>
        </AnimIn>
      )}
    </section>
  )
}
