import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import { generateProjectSEO } from '@/config/seo.config'
import { Project } from '@/types/project'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import dynamic from 'next/dynamic'
import db from '@/database/urbnlanes-db.json'

const ProjectHero = dynamic(() => import('@/components/projects-components/ProjectHero'))
const ProjectBreadcrumb = dynamic(() => import('@/components/projects-components/ProjectBreadcrumb'))
const ProjectDetails = dynamic(() => import('@/components/projects-components/ProjectDetails'))
const ProjectGallery = dynamic(() => import('@/components/projects-components/ProjectGallery'))
const ProjectPartners = dynamic(() => import('@/components/projects-components/ProjectPartners'))
const ProjectAmenities = dynamic(() => import('@/components/projects-components/ProjectAmenities'))
const ProjectLocation = dynamic(() => import('@/components/projects-components/ProjectLocation'))
const SimilarProjects = dynamic(() => import('@/components/projects-components/SimilarProjects'))

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
      <ProjectDetails project={project} />
      <ProjectGallery project={project} />
      <ProjectPartners project={project} />
      <ProjectAmenities project={project} />
      {/* <ProjectLocation project={project} />
      <SimilarProjects currentProject={project} allProjects={db.projects as Project[]} /> */}
    </Suspense>
  )
}
