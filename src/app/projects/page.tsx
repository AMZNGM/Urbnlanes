import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import SectionHero from '@/components/hero-components/SectionHero'
import LineHeading from '@/components/shared/LineHeading'
const AllProjects = dynamic(() => import('@/components/projects-components/AllProjects'))
const MarkedProjects = dynamic(() => import('@/components/projects-components/MarkedProjects'))
const ProjectsImpact = dynamic(() => import('@/components/projects-components/ProjectsImpact'))
import LatestNews from '@/components/news-components/LatestNews'

export const generateMetadata = metadataGenerators.ourProjects

export default function OurProjectsPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <div className="top-0 sticky">
        <SectionHero image="/images/projects/story-branded-residences/sbr-gallery-6.avif" tKey="nav.ourProjects" tKeyPara="common.projectsDesc" />
      </div>
      <LineHeading
        tKey="common.architecturalExcellence"
        sideParaTKey="common.architecturalExcellenceDesc"
        className="relative w-dvw overflow-hidden bg-text text-bg px-4 max-md:px-2 py-12"
      />
      <AllProjects />
      <MarkedProjects />
      <ProjectsImpact />
      <LatestNews className="pt-0 pb-28" />
    </Suspense>
  )
}
