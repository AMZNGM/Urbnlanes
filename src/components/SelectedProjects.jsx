'use client'

import { useState } from 'react'
import { getAllProjects } from '@/lib/getDatabase'
import Heading from '@/components/ui/Heading'
import MasonryGrid from '@/components/ui/MasonryGrid'
import Modal from '@/components/ui/Modal'

export default function SelectedProjects() {
  const SelectedProjects = getAllProjects().map((project, index) => ({
    id: project.id,
    title: project.name,
    category: project.category,
    image: project.gallery[0],
    gallery: project.gallery,
    description: project.description || project.shortDesc || 'A remarkable project by Urbnlanes Developments.',
    location: project.location,
    status: project.status,
    height: ['h-[40vh]', 'h-[52vh]', 'h-[45vh]', 'h-[38vh]', 'h-[50vh]', 'h-[42vh]'][index % 6],
  }))

  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <div className="relative w-full h-full bg-black text-text px-18 max-md:px-4 py-8">
      <Heading text="Selected projects" />
      <MasonryGrid projects={SelectedProjects} openModal={openModal} />
      <Modal projects={SelectedProjects} closeModal={closeModal} selectedProject={selectedProject} />
    </div>
  )
}
