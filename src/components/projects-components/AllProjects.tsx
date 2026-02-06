'use client'

import { useState, memo, useMemo } from 'react'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import ProjectsFilter from '@/components/projects-components/ProjectsFilter'
import MasonryGrid from '@/components/projects-components/MasonryGrid'
import ListGrid from '@/components/projects-components/ListGrid'
import ProjectModal from '@/components/projects-components/ProjectModal'

function AllProjectsComponent() {
  let [selectedProject, setSelectedProject] = useState(null)
  let [selectedCategory, setSelectedCategory] = useState<string>('all')
  let [selectedStatus, setSelectedStatus] = useState<string>('all')
  let [selectedCity, setSelectedCity] = useState<string>('all')
  let [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  let { categories, statuses, cities, filteredProjects } = useMemo(() => {
    let categories = Array.from(
      new Set(
        db.projects.flatMap((project) => {
          let cats = project.category
          return Array.isArray(cats) ? cats : cats ? [cats] : []
        })
      )
    )
    let statuses = Array.from(new Set(db.projects.map((project) => project.status).filter((status): status is string => Boolean(status))))
    let cities = Array.from(new Set(db.projects.map((project) => project.location?.city || 'Unknown')))

    let filteredProjects = db.projects.filter((project) => {
      let categoryMatch = selectedCategory === 'all'
      if (!categoryMatch) {
        if (selectedCategory === 'latest') {
          categoryMatch = project.featured === true
        } else {
          let cats = project.category
          let projectCategories = Array.isArray(cats) ? cats : cats ? [cats] : []
          categoryMatch = projectCategories.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase())
        }
      }

      let statusMatch = selectedStatus === 'all' || project.status === selectedStatus
      let cityMatch = selectedCity === 'all' || selectedCity === 'Unknown' || project.location?.city === selectedCity

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

      <section className="relative w-dvw min-h-dvh overflow-hidden bg-text text-bg px-4 max-md:px-2 py-12">
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

        <ProjectModal dark={false} selectedProject={selectedProject} closeModal={() => setSelectedProject(null)} />
      </section>
    </>
  )
}

let AllProjects = memo(AllProjectsComponent)
AllProjects.displayName = 'AllProjects'

export default AllProjects
