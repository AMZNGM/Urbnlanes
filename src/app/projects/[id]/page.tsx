import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { generateProjectSEO } from '@/seo/seo.config'
import { Project } from '@/types/project'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'
import db from '@/database/urbnlanes-db.json'

import ProjectHero from '@/components/projects-components/ProjectHero'
import ProjectBreadcrumb from '@/components/projects-components/ProjectBreadcrumb'
import ProjectTagline from '@/components/projects-components/ProjectTagline'
const ProjectGallery = dynamic(() => import('@/components/projects-components/ProjectGallery'))
const ProjectAbout = dynamic(() => import('@/components/projects-components/ProjectAbout'))
import ProjectLocation from '@/components/projects-components/ProjectLocation'
import ProjectOverview from '@/components/projects-components/ProjectOverview'
const ProjectAmenities = dynamic(() => import('@/components/projects-components/ProjectAmenities'))
import ProjectPartners from '@/components/projects-components/ProjectPartners'
const SimilarProjects = dynamic(() => import('@/components/projects-components/SimilarProjects'))
import LatestNews from '@/components/news-components/LatestNews'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const project = db.projects.find((p) => p.id === id)

  if (!project) {
    return metadataGenerators.notFound()
  }

  return metadataGenerators.project({
    ...generateProjectSEO(project),
    alternates: {
      languages: {
        en: `/projects/${id}`,
        ar: `/projects/${id}`,
      },
    },
  })
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = db.projects.find((p) => p.id === id) as Project

  if (!project) {
    notFound()
  }

  return (
    <Suspense fallback={<LoadingLogo />}>
      <ProjectHero project={project} />
      <ProjectBreadcrumb project={project} />
      <ProjectTagline project={project} />
      <ProjectGallery project={project} />
      <ProjectAbout project={project} />
      <ProjectLocation project={project} />
      {project.overview && <ProjectOverview project={project} />}
      <ProjectAmenities project={project} />
      <ProjectPartners project={project} />
      <SimilarProjects currentProject={project} allProjects={db.projects as Project[]} />
      <LatestNews className="-mt-18" />
    </Suspense>
  )
}
