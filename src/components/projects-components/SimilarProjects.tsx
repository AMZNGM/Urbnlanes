'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function SimilarProjects({ currentProject, allProjects }: { currentProject: Project; allProjects: Project[] }) {
  if (!currentProject || !allProjects?.length) return null

  const similarProjects = allProjects.filter((project) => project.id !== currentProject.id && project.category === currentProject.category)

  if (similarProjects.length === 0) return null

  return (
    <section className="relative w-full bg-black py-24 pb-48">
      <div className="container">
        <AnimIn delay={0.2} className="space-y-4 mb-16">
          <h2 className="font-sec text-main text-4xl uppercase tracking-widest">Similar Projects</h2>
          <p className="font-light text-text/60 text-lg">Explore more of our architectural masterpieces.</p>
        </AnimIn>

        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          {similarProjects.slice(0, 3).map((project, index) => (
            <AnimIn key={project.id} delay={0.1 * index} className="group">
              <Link href={`/projects/${project.id}`} className="block">
                <div className="relative overflow-hidden bg-white/5 border border-white/10 hover:border-main/50 rounded-3xl transition-all group-hover:-translate-y-2 duration-500">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.gallery?.[0] || '/images/placeholder.webp'}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
                  </div>
                  <div className="space-y-3 p-8">
                    <p className="font-mono text-main text-xs uppercase tracking-widest">{project.category}</p>
                    <h3 className="font-sec text-text group-hover:text-main text-2xl transition-colors">{project.name}</h3>
                    <p className="font-light text-text/60 text-sm line-clamp-2 leading-relaxed">{project.tagline}</p>
                  </div>
                </div>
              </Link>
            </AnimIn>
          ))}
        </div>

        {similarProjects.length > 3 && (
          <AnimIn delay={0.6} className="text-center mt-20">
            <Link
              href="/our-projects"
              className="inline-flex items-center bg-white/5 hover:bg-main border border-white/20 rounded-full font-sec hover:text-black text-sm uppercase tracking-widest transition-all duration-500 px-10 py-4"
            >
              View All Projects
            </Link>
          </AnimIn>
        )}
      </div>
    </section>
  )
}
