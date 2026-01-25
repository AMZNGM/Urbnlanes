'use client'

import { useState } from 'react'
import TText from '@/translations/TText'
import db from '@/database/urbnlanes-db.json'
import Heading from '@/components/shared/Heading'
import MasonryGrid from '@/components/shared/MasonryGrid'
import Modal from '@/components/shared/Modal'

export default function SelectedProjects() {
  const projects = db.projects.slice(0, 9)
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="relative w-full h-full bg-black text-text px-4 pt-8 pb-24">
      <Heading text={<TText tKey="nav.selectedProjectsTitle" />} />
      <MasonryGrid projects={projects} openModal={setSelectedProject} />
      <Modal closeModal={() => setSelectedProject(null)} selectedProject={selectedProject} />
    </section>
  )
}
