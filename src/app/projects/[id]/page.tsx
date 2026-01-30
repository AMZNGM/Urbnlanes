import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import { generateProjectSEO } from '@/seo/seo.config'
import { Project } from '@/types/project'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'
import db from '@/database/urbnlanes-db.json'

import ProjectHero from '@/components/projects-components/ProjectHero'
const ProjectBreadcrumb = dynamic(() => import('@/components/projects-components/ProjectBreadcrumb'))
const ProjectAbout = dynamic(() => import('@/components/projects-components/ProjectAbout'))
const ProjectGallery = dynamic(() => import('@/components/projects-components/ProjectGallery'))
const ProjectVideoGallery = dynamic(() => import('@/components/projects-components/ProjectVideoGallery'))
const ProjectConstructionGallery = dynamic(() => import('@/components/projects-components/ProjectConstructionGallery'))
const ProjectPartners = dynamic(() => import('@/components/projects-components/ProjectPartners'))
const ProjectAmenities = dynamic(() => import('@/components/projects-components/ProjectAmenities'))
const ProjectLocation = dynamic(() => import('@/components/projects-components/ProjectLocation'))
const ProjectOverview = dynamic(() => import('@/components/projects-components/ProjectOverview'))
const SimilarProjects = dynamic(() => import('@/components/projects-components/SimilarProjects'))
const LatestNews = dynamic(() => import('@/components/news-components/LatestNews'))
const Newsletter = dynamic(() => import('@/components/footer-components/Newsletter'))

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
      <ProjectAbout project={project} />
      <ProjectGallery project={project} />
      <ProjectVideoGallery project={project} />
      <ProjectConstructionGallery project={project} />
      <ProjectPartners project={project} />
      <ProjectAmenities project={project} />
      <ProjectLocation project={project} />
      {project.overview && <ProjectOverview project={project} />}
      <SimilarProjects currentProject={project} allProjects={db.projects as Project[]} />
      <LatestNews className="bg-text text-black! px-18 max-md:px-4 py-0!" />
      <Newsletter />
    </Suspense>
  )
}
