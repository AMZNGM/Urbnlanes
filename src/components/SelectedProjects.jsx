'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import db from '@/database/urbnlanes-db.json'
import Heading from '@/components/ui/Heading'
import MasonryGrid from '@/components/ui/MasonryGrid'
import Modal from '@/components/ui/Modal'

export default function SelectedProjects() {
  const { t } = useTranslation()
  const SelectedProjects = db.projects.slice(0, 9).map((project) => {
    const translationKey = `db.projects.${project.id}`
    const t_name = t(`${translationKey}.name`)
    const t_description = t(`${translationKey}.description`)
    const t_description2 = t(`${translationKey}.description2`)
    const t_shortDesc = t(`${translationKey}.shortDesc`)

    const rawDescription = project.description || project.shortDesc
    const fallbackDescription = Array.isArray(rawDescription) ? rawDescription.join(' ') : rawDescription

    const description =
      t_description !== `${translationKey}.description`
        ? t_description
        : t_description2 !== `${translationKey}.description2`
          ? t_description2
          : t_shortDesc !== `${translationKey}.shortDesc`
            ? t_shortDesc
            : fallbackDescription || 'A remarkable project by Urbnlanes Developments.'

    return {
      ...project,
      title: t_name !== `${translationKey}.name` ? t_name : project.name,
      image: project.gallery[0],
      description: description,
    }
  })

  const reorderedProjects = [...SelectedProjects]
  const yrIndex = reorderedProjects.findIndex((p) => p.id === 'yellow-residence')
  if (yrIndex > -1) {
    const [yr] = reorderedProjects.splice(yrIndex, 1)
    reorderedProjects.splice(4, 0, yr)
  }

  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <div className="relative w-full h-full bg-black text-text px-4 pt-8 pb-24">
      <Heading text={t('nav.selectedProjectsTitle')} />
      <MasonryGrid projects={reorderedProjects} openModal={openModal} />
      <Modal closeModal={closeModal} selectedProject={selectedProject} />
    </div>
  )
}
