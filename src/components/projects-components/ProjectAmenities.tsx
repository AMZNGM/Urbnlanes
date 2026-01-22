'use client'

import { Project } from '@/types/project'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import * as Icons from 'lucide-react'

export default function ProjectAmenities({ project }: { project: Project }) {
  if (!project || !project.amenities?.length) return null

  return (
    <section className="relative w-full bg-black py-24">
      <div className="container">
        <AnimIn delay={0.2} className="space-y-4 text-center mb-20">
          <h2 className="font-sec text-main text-4xl uppercase tracking-widest">Amenities</h2>
          <p className="max-w-2xl font-light text-text/60 text-lg mx-auto">
            Experience an unparalleled lifestyle with our world-class facilities and services.
          </p>
        </AnimIn>

        <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {project.amenities.map((amenity, index) => {
            const IconComponent = (Icons as any)[amenity.icon] || Icons.Sparkles

            return (
              <AnimIn
                key={amenity.id}
                delay={0.1 * index}
                className="group relative overflow-hidden bg-white/5 hover:bg-main/10 border border-white/10 hover:border-main/30 rounded-3xl transition-all duration-500 p-8"
              >
                <div className="top-0 right-0 absolute w-32 h-32 bg-main/5 group-hover:bg-main/20 blur-3xl rounded-full transition-all -mt-16 -mr-16" />

                <div className="z-10 relative">
                  <div className="w-14 h-14 flex justify-center items-center bg-main/10 group-hover:bg-main/20 rounded-2xl group-hover:scale-110 transition-all duration-500 mb-6">
                    <IconComponent className="w-8 h-8 text-main" />
                  </div>
                  <h3 className="font-medium text-text group-hover:text-main text-xl transition-colors mb-3">{amenity.name}</h3>
                  <p className="font-light text-text/60 leading-relaxed">{amenity.description}</p>
                </div>
              </AnimIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
