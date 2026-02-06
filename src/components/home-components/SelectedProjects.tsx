'use client'

import { useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import db from '@/database/urbnlanes-db.json'
import MainBtn from '@/components/ui/buttons/MainBtn'
import LineHeading from '@/components/shared/LineHeading'
import MasonryGrid from '@/components/projects-components/MasonryGrid'
import ProjectModal from '@/components/projects-components/ProjectModal'

export default function SelectedProjects() {
  let isMobile = useIsMobile()
  let projects = db.projects.slice(0, isMobile ? 9 : 18)
  let [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="relative w-full h-full bg-black text-text px-4 pt-8 pb-24">
      <LineHeading tKey="nav.selectedProjectsTitle" className="mb-24" />
      <MainBtn to="/projects" tKey="common.allProjects" size="sm" look="mono" className="right-4 bottom-12 absolute!" />
      <MasonryGrid projects={projects} openModal={setSelectedProject} />
      <ProjectModal closeModal={() => setSelectedProject(null)} selectedProject={selectedProject} />
    </section>
  )
}
