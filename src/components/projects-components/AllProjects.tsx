'use client'

import { useState, memo, useMemo } from 'react'
import TText from '@/translations/TText'
import ProjectsFilter from '@/components/projects-components/ProjectsFilter'
import MasonryGrid from '@/components/projects-components/MasonryGrid'
import ListGrid from '@/components/projects-components/ListGrid'
import Modal from '@/components/projects-components/Modal'
import db from '@/database/urbnlanes-db.json'

function AllProjectsComponent() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const { categories, statuses, cities, filteredProjects } = useMemo(() => {
    const categories = Array.from(
      new Set(
        db.projects.flatMap((project) => {
          const cats = project.category
          return Array.isArray(cats) ? cats : cats ? [cats] : []
        })
      )
    )
    const statuses = Array.from(new Set(db.projects.map((project) => project.status).filter((status): status is string => Boolean(status))))
    const cities = Array.from(new Set(db.projects.map((project) => project.location?.city || 'Unknown')))

    const filteredProjects = db.projects.filter((project) => {
      let categoryMatch = selectedCategory === 'all'
      if (!categoryMatch) {
        if (selectedCategory === 'latest') {
          categoryMatch = project.featured === true
        } else {
          const cats = project.category
          const projectCategories = Array.isArray(cats) ? cats : cats ? [cats] : []
          categoryMatch = projectCategories.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase())
        }
      }

      const statusMatch = selectedStatus === 'all' || project.status === selectedStatus
      const cityMatch = selectedCity === 'all' || selectedCity === 'Unknown' || project.location?.city === selectedCity

      return categoryMatch && statusMatch && cityMatch
    })

    return { categories, statuses, cities, filteredProjects }
  }, [selectedCategory, selectedStatus, selectedCity])

  return (
    <>
      <ProjectsFilter
        categories={categories}
        statuses={statuses}
        cities={cities}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        selectedCity={selectedCity}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
        onCityChange={setSelectedCity}
        filteredProjects={filteredProjects}
        viewMode={viewMode}
        onToggleView={() => setViewMode((prevViewMode) => (prevViewMode === 'grid' ? 'list' : 'grid'))}
      />

      <section className="relative w-dvw min-h-dvh overflow-hidden bg-text text-black px-18 max-md:px-4 py-12">
        {filteredProjects.length === 0 ? (
          <p className="bg-main/25 rounded-2xl font-bold text-2xl text-center py-12">
            <TText tKey="common.noProjectsFound" />
          </p>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <MasonryGrid projects={filteredProjects} openModal={setSelectedProject} />
            ) : (
              <ListGrid projects={filteredProjects} openModal={setSelectedProject} />
            )}
          </>
        )}

        <Modal selectedProject={selectedProject} closeModal={() => setSelectedProject(null)} dark={false} />
      </section>
    </>
  )
}

const AllProjects = memo(AllProjectsComponent)
AllProjects.displayName = 'AllProjects'

export default AllProjects
