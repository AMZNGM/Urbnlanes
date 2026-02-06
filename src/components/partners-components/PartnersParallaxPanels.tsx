'use client'

import { useRef } from 'react'
import { useScroll, useTransform } from 'motion/react'
import { getAllPartners } from '@/database/getPartners'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

let partnersData = [
  ...getAllPartners(),
  ...db.whoweare.sisterCompanies.map((company) => ({
    name: company.title,
    logo: company.logo,
    role: 'Sister Company',
    projects: [],
  })),
]

function ParallaxPanel({ partner, index }: { partner: (typeof partnersData)[0]; index: number }) {
  let panelRef = useRef<HTMLDivElement>(null)
  let { scrollYProgress } = useScroll({ target: panelRef, offset: ['start end', 'end start'] })
  let y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 100 : -100, index % 2 === 0 ? -100 : 100])
  let images = [
    { src: '/images/projects/levels-tower/levels-main.webp' },
    { src: '/images/projects/east-lane/el-gallery-1.webp' },
    { src: '/images/projects/mid-lane/ml-gallery-5.webp' },
    { src: '/images/projects/east-sabah/es-gallery-8.avif' },
    { src: '/images/projects/noi/noi-gallery-12.webp' },
  ]

  return (
    <section ref={panelRef} className="relative w-dvw h-dvh overflow-hidden bg-black text-text">
      <ImageIn src={images[index].src} alt={partner.name} sizes="100vw" style={{ y }} divClassName="absolute! inset-0 scale-130" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative w-full h-full flex flex-col justify-center items-start p-18 max-md:px-4">
        <div data-scroll data-scroll-speed="0.2" className="flex flex-col gap-4 rounded-2xl tracking-wider p-4">
          <AnimText as="h1" stagger={0.2} className="max-md:text-5xl text-7xl rtl:leading-22 tracking-wide">
            <TText tKey={`partners.partnersNames.${partner.name}`} />
          </AnimText>

          <AnimText as={'p'} delay={0.3} className="text-lg">
            <TText tKey={`partners.partnersRoles.${partner.role?.[0] ?? 'Partner'}`} />
          </AnimText>

          {partner.projects.length > 0 && (
            <AnimText as={'p'} delay={0.4} className="rtl:hidden">
              Partner in {partner.projects.length} project{partner.projects.length > 1 ? 's' : ''}
            </AnimText>
          )}
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
