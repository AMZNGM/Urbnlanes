'use client'

import { useState } from 'react'
import db from '@/database/urbnlanes-db.json'
import MasonryGrid from '@/components/projects-components/MasonryGrid'
import ProjectModal from '@/components/projects-components/ProjectModal'

export default function SelectedProjects() {
  let projects = db.projects.slice(0, 9)
  let [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="relative w-full h-full bg-black text-text px-4 pt-8 pb-24">
      {/* <Heading text={<TText tKey="nav.selectedProjectsTitle" />} className="mb-24" /> */}
      <MasonryGrid projects={projects} openModal={setSelectedProject} />
      <ProjectModal closeModal={() => setSelectedProject(null)} selectedProject={selectedProject} />
    </section>
  )
}
