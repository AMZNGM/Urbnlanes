'use client'

import Image from 'next/image'
import { Project, Partner } from '@/types/project'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function ProjectPartners({ project }: { project: Project }) {
  if (!project || !project.partners?.length) return null

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-24">
      <div className="container">
        <AnimIn delay={0.2} className="space-y-4 text-center mb-16">
          <h2 className="font-sec text-black text-4xl uppercase tracking-widest">Our Partners</h2>
          <p className="font-light text-black/60 text-lg">Collaborating with the industry's best to deliver excellence.</p>
        </AnimIn>

        <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {project.partners.map((partner: Partner, index: number) => (
            <AnimIn
              key={partner.name}
              delay={0.1 * index}
              className="group flex flex-col items-center bg-white/5 hover:bg-main/5 border border-white/10 hover:border-main/30 rounded-3xl text-center transition-all duration-500 p-10"
            >
              <div className="relative w-24 h-24 grayscale group-hover:grayscale-0 invert transition-all duration-500 mb-6">
                <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
              </div>
              <h3 className="font-medium text-black group-hover:text-black text-xl transition-colors mb-2">{partner.name}</h3>
              <p className="text-black/40 text-sm uppercase tracking-wider">{partner.role}</p>
            </AnimIn>
          ))}
        </div>
      </div>
    </section>
  )
}
