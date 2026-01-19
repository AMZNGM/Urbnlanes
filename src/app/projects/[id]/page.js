'use client'

import { useParams } from 'next/navigation'
import { Suspense } from 'react'
import { metadataGenerators } from '@/lib/seo-helpers'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import { generateProjectSEO } from '@/config/seo.config'
import dynamic from 'next/dynamic'
import db from '@/database/urbnlanes-db.json'

const ProjectHero = dynamic(() => import('@/components/projects-components/ProjectHero'))
const ProjectGallery = dynamic(() => import('@/components/projects-components/ProjectGallery'))
const ProjectDetails = dynamic(() => import('@/components/projects-components/ProjectDetails'))
const ProjectPartners = dynamic(() => import('@/components/projects-components/ProjectPartners'))
const ProjectAmenities = dynamic(() => import('@/components/projects-components/ProjectAmenities'))
const ProjectLocation = dynamic(() => import('@/components/projects-components/ProjectLocation'))
const SimilarProjects = dynamic(() => import('@/components/projects-components/SimilarProjects'))

// export const generateMetadata = ({ params }) => {
//   const project = db.projects.find((p) => p.id === params.id)

//   if (!project) {
//     return metadataGenerators.notFound(params.id)
//   }

//   return metadataGenerators.project({
//     ...generateProjectSEO(project),
//     alternates: {
//       languages: {
//         en: `/projects/${params.id}`,
//         ar: `/projects/${params.id}`,
//       },
//     },
//   })
// }

export default function ProjectPage() {
  const params = useParams()

  return (
    <Suspense fallback={<LoadingLogo />}>
      <ProjectHero project={db.projects.find((p) => p.id === params.id)} />
      <ProjectDetails project={db.projects.find((p) => p.id === params.id)} />
      <ProjectGallery project={db.projects.find((p) => p.id === params.id)} />
      <ProjectPartners project={db.projects.find((p) => p.id === params.id)} />
      <ProjectAmenities project={db.projects.find((p) => p.id === params.id)} />
      <ProjectLocation project={db.projects.find((p) => p.id === params.id)} />
      <SimilarProjects currentProject={db.projects.find((p) => p.id === params.id)} allProjects={db.projects} />
    </Suspense>
  )
}
