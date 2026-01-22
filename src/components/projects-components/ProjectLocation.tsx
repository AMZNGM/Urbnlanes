'use client'

import Image from 'next/image'
import { Project } from '@/types/project'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import { SoftLine } from '@/components/ui/effects/Lines'

export default function ProjectLocation({ project }: { project: Project }) {
  if (!project || !project.location) return null

  return (
    <section className="relative w-full overflow-hidden bg-black py-24 pb-48">
      <div className="container">
        <div className="items-center gap-16 grid lg:grid-cols-12">
          {/* Location Info */}
          <AnimIn delay={0.2} className="space-y-10 lg:col-span-4">
            <div className="space-y-4">
              <h2 className="font-sec text-main text-4xl uppercase tracking-widest">Location</h2>
              <p className="font-light text-text/60 text-lg">Strategically positioned to offer the best of urban living.</p>
            </div>

            <div className="space-y-8 bg-white/5 border border-white/10 rounded-3xl p-10">
              <div className="space-y-2">
                <p className="font-medium text-main/60 text-sm uppercase tracking-wider">City</p>
                <p className="font-light text-text text-2xl">{project.location.city}</p>
                <SoftLine className="opacity-20" />
              </div>

              <div className="space-y-2">
                <p className="font-medium text-main/60 text-sm uppercase tracking-wider">Country</p>
                <p className="font-light text-text text-2xl">{project.location.country}</p>
                <SoftLine className="opacity-20" />
              </div>

              {project.location.neighborhood && (
                <div className="space-y-2">
                  <p className="font-medium text-main/60 text-sm uppercase tracking-wider">Area</p>
                  <p className="font-light text-text text-2xl">{project.location.neighborhood}</p>
                  <SoftLine className="opacity-20" />
                </div>
              )}
            </div>
          </AnimIn>

          {/* Map Image */}
          {project.location.map && (
            <AnimIn
              delay={0.4}
              className="group relative aspect-[16/10] overflow-hidden lg:col-span-8 border border-white/10 rounded-[3rem]"
            >
              <Image
                src={project.location.map}
                alt={`${project.name} Location`}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Map Pointer Decoration */}
              <div className="top-1/2 left-1/2 absolute flex justify-center items-center -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-main opacity-20 rounded-full animate-ping" />
                  <div className="relative w-8 h-8 flex justify-center items-center bg-main shadow-2xl border-4 border-black rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </AnimIn>
          )}
        </div>
      </div>
    </section>
  )
}
