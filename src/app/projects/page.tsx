import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'

import SectionHero from '@/components/shared/SectionHero'
import LineHeading from '@/components/shared/LineHeading'
const MarkedProjects = dynamic(() => import('@/components/projects-components/MarkedProjects'))
const ProjectsImpact = dynamic(() => import('@/components/projects-components/ProjectsImpact'))
const AllProjects = dynamic(() => import('@/components/projects-components/AllProjects'))
import LatestNews from '@/components/news-components/LatestNews'

export const generateMetadata = metadataGenerators.ourProjects

export default function OurProjectsPage() {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <div className="top-0 sticky">
        <SectionHero image="/images/projects/noi/noi-gallery-18.webp" tKey="nav.ourProjects" tKeyPara="common.projectsDesc" />
      </div>
      <LineHeading
        tKey="common.architecturalExcellence"
        sideParaTKey="common.architecturalExcellenceDesc"
        className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-12"
      />
      <MarkedProjects />
      <ProjectsImpact />
      {/* <AllProjects /> */}
      <LatestNews />
    </Suspense>
  )
}
