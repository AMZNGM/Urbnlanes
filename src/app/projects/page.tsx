import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import OurProjectsHero from '@/components/projects-components/OurProjectsHero'
const TextPanel = dynamic(() => import('@/components/shared/TextPanel'))
const ProjectsShowcase = dynamic(() => import('@/components/projects-components/ProjectsShowcase'))
const AllProjects = dynamic(() => import('@/components/projects-components/AllProjects'))
const LatestNews = dynamic(() => import('@/components/news-components/LatestNews'))
const Newsletter = dynamic(() => import('@/components/shared/Newsletter'))

export const generateMetadata = metadataGenerators.ourProjects

export default function OurProjectsPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <OurProjectsHero />
      <TextPanel tKey="common.architecturalExcellence" paraTKey="common.architecturalExcellenceDesc" />
      <ProjectsShowcase />
      <AllProjects />
      <LatestNews className="bg-text text-black! px-18 max-md:px-4 py-0!" line={false} />
      <Newsletter dark={false} />
    </Suspense>
  )
}
