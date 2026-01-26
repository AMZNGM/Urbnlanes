'use client'

import { useState, memo } from 'react'
import TText from '@/translations/TText'
import MasonryGrid from '@/components/projects-components/MasonryGrid'
import ListGrid from '@/components/projects-components/ListGrid'
import Modal from '@/components/projects-components/Modal'

function AllProjectsComponent({ projects, viewMode }: { projects: any[]; viewMode: 'grid' | 'list' }) {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-12">
      {projects.length === 0 ? (
        <p className="bg-main/25 rounded-2xl font-bold text-2xl text-center py-12">
          <TText tKey="common.noProjectsFound" />
        </p>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <MasonryGrid projects={projects} openModal={setSelectedProject} />
          ) : (
            <ListGrid projects={projects} openModal={setSelectedProject} />
          )}
        </>
      )}

      <Modal selectedProject={selectedProject} closeModal={() => setSelectedProject(null)} dark={false} />
    </section>
  )
}

const AllProjects = memo(AllProjectsComponent)
AllProjects.displayName = 'AllProjects'

export default AllProjects
