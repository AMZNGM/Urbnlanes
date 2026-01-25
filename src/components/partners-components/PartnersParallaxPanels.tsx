'use client'

import { useRef } from 'react'
import { useScroll, useTransform } from 'motion/react'
import db from '@/database/urbnlanes-db.json'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'

const images = [
  { src: '/images/projects/levels-tower/levels-main.webp' },
  { src: '/images/projects/east-lane/el-gallery-1.webp' },
  { src: '/images/projects/mid-lane/ml-gallery-5.webp' },
  { src: '/images/projects/east-sabah/es-gallery-8.avif' },
  { src: '/images/projects/noi/noi-gallery-12.webp' },
]

const allPartners = new Map<string, { name: string; logo: string; role?: string; projects: string[] }>()

db.projects.forEach((project) => {
  if (project.partners) {
    project.partners.forEach((partner) => {
      if (!allPartners.has(partner.name)) {
        allPartners.set(partner.name, {
          name: partner.name,
          logo: partner.logo,
          role: (partner as any).role || 'Partner',
          projects: [project.id],
        })
      } else {
        const existing = allPartners.get(partner.name)!
        existing.projects.push(project.id)
      }
    })
  }
})

const partnersData = [
  ...allPartners.values(),
  ...db.whoweare.sisterCompanies.map((company) => ({
    name: company.title,
    logo: company.logo,
    role: 'Sister Company',
    projects: [],
  })),
]

function ParallaxPanel({ partner, index }: { partner: (typeof partnersData)[0]; index: number }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 100 : -100, index % 2 === 0 ? -100 : 100])

  return (
    <section ref={panelRef} className="relative w-dvw h-dvh overflow-hidden bg-black text-text">
      <ImageIn src={images[index].src} alt={partner.name} sizes="100vw" style={{ y }} divClassName="absolute! inset-0 scale-130" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative w-full h-full flex flex-col justify-center items-start p-18 max-md:px-4">
        <div className="flex flex-col gap-4 rounded-2xl tracking-wider p-4">
          <AnimText as="h1" stagger={0.3} className="max-md:text-5xl text-7xl">
            {partner.name}
          </AnimText>
          <AnimText as={'p'} delay={0.4} className="text-lg">
            {partner.role}
          </AnimText>
          {partner.projects.length > 0 && (
            <AnimText as={'p'}>
              Partner in {partner.projects.length} project{partner.projects.length > 1 ? 's' : ''}
            </AnimText>
          )}

          <MainBtn tKey="common.findOutMore" className="mt-4" />
        </div>
      </div>
    </section>
  )
}

export default function PartnersParallaxPanels() {
  const displayPartners = partnersData.slice(0, 5)

  return (
    <>
      {displayPartners.map((partner, index) => (
        <ParallaxPanel key={partner.name} partner={partner} index={index} />
      ))}
    </>
  )
}
