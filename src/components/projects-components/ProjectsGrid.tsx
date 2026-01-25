'use client'

import { useState } from 'react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import MasonryGrid from '@/components/shared/MasonryGrid'
import Modal from '@/components/shared/Modal'

interface ProjectsGridProps {
  projects: any[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-sec text-3xl text-center mb-12">
          <TText tKey="common.allProjects" />
        </h2>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="opacity-75 text-xl">
              <TText tKey="common.noProjectsFound" />
            </p>
          </div>
        ) : (
          <>
            <MasonryGrid projects={projects} openModal={setSelectedProject} />
            <Modal closeModal={() => setSelectedProject(null)} selectedProject={selectedProject} />
          </>
        )}
      </div>
    </section>
  )
}
