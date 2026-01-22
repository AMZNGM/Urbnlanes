'use client'

import { Project } from '@/types/project'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import { SoftLine } from '@/components/ui/effects/Lines'

export default function ProjectDetails({ project }: { project: Project }) {
  if (!project) return null

  const details = [
    { label: 'Status', value: project.status },
    { label: 'City', value: project.location?.city },
    { label: 'Country', value: project.location?.country },
    { label: 'Category', value: project.category },
    { label: 'Area', value: project.location?.neighborhood },
  ].filter((d) => d.value)

  return (
    <section className="w-full bg-black py-24">
      <div className="container">
        <div className="gap-20 grid lg:grid-cols-2">
          {/* Main Description */}
          <AnimIn delay={0.2} className="space-y-8">
            <h2 className="font-sec text-main text-4xl uppercase tracking-widest">The Project</h2>
            <div className="space-y-6 font-light text-text/80 text-lg leading-relaxed">
              <p>{project.description || project.shortDesc}</p>
              {project.description2 && <p>{project.description2}</p>}
            </div>
          </AnimIn>

          {/* Key Details Grid */}
          <AnimIn delay={0.4} className="bg-main/5 border border-main/10 rounded-3xl p-10 lg:p-16">
            <h3 className="font-sec text-text text-2xl mb-10">Quick Details</h3>
            <div className="gap-x-12 gap-y-10 grid sm:grid-cols-2">
              {details.map((detail, i) => (
                <div key={i} className="group space-y-2">
                  <p className="font-medium text-main/60 text-sm uppercase tracking-wider">{detail.label}</p>
                  <p className="font-light text-text group-hover:text-main text-xl transition-colors duration-300">{detail.value}</p>
                  <SoftLine className="opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </AnimIn>
        </div>
      </div>
    </section>
  )
}
