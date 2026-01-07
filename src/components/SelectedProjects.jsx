'use client'

import { useState } from 'react'
import { getAllProjects } from '@/lib/getDatabase'
import Heading from '@/components/ui/Heading'
import MasonryGrid from '@/components/ui/MasonryGrid'
import Modal from '@/components/ui/Modal'

export default function SelectedProjects() {
  const featuredProjects = getAllProjects().map((project, index) => ({
    id: project.id,
    title: project.name,
    category: project.category,
    image: project.gallery[0],
    gallery: project.gallery,
    description: project.description || project.shortDesc || 'A remarkable project by Urbnlanes Developments.',
    location: project.location,
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
      <Heading text="Featured Work" />
      <MasonryGrid projects={featuredProjects} openModal={openModal} />
      <Modal projects={featuredProjects} closeModal={closeModal} selectedProject={selectedProject} />
    </div>
  )
}
