'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useMemo } from 'react'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import db from '@/database/urbnlanes-db.json'

const SectionHero = dynamic(() => import('@/components/hero-components/sectionHero'))
const TextPanel = dynamic(() => import('@/components/shared/TextPanel'))
const ProjectsShowcase = dynamic(() => import('@/components/projects-components/ProjectsShowcase'))
const ProjectsFilter = dynamic(() => import('@/components/projects-components/ProjectsFilter'))
const AllProjects = dynamic(() => import('@/components/projects-components/AllProjects'))
const LatestNews = dynamic(() => import('@/components/news-components/LatestNews'))
const Newsletter = dynamic(() => import('@/components/shared/Newsletter'))

export default function OurProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const { categories, statuses, cities, filteredProjects } = useMemo(() => {
    const categories = Array.from(
      new Set(
        db.projects.flatMap((project) => {
          // Handle both string and array category formats
          if (Array.isArray(project.category)) {
            return project.category
          }
          return project.category || []
        })
      )
    )
    const statuses = Array.from(new Set(db.projects.map((project) => project.status).filter((status): status is string => status !== undefined)))
    const cities = Array.from(new Set(db.projects.map((project) => project.location?.city || 'Unknown')))

    const filteredProjects = db.projects.filter((project) => {
      // Handle custom category filters
      let categoryMatch = selectedCategory === 'all'
      if (!categoryMatch) {
        switch (selectedCategory) {
          case 'administrative':
            // Check if project has administrative category (handle both string and array)
            if (Array.isArray(project.category)) {
              categoryMatch = project.category.includes('administrative') || project.category.includes('Administrative')
            } else {
              categoryMatch = project.category === 'administrative' || project.category === 'Administrative'
            }
            break
          case 'city':
            // Check if project has city category (handle both string and array)
            if (Array.isArray(project.category)) {
              categoryMatch = project.category.includes('city') || project.category.includes('City')
            } else {
              categoryMatch = project.category === 'city' || project.category === 'City'
            }
            break
          case 'educational':
            // Check if project has educational category (handle both string and array)
            if (Array.isArray(project.category)) {
              categoryMatch = project.category.includes('educational') || project.category.includes('Educational')
            } else {
              categoryMatch = project.category === 'educational' || project.category === 'Educational'
            }
            break
          case 'latest':
            categoryMatch = project.featured === true
            break
          case 'residential':
            // Check if project has residential category (handle both string and array)
            if (Array.isArray(project.category)) {
              categoryMatch = project.category.includes('residential') || project.category.includes('Residential')
            } else {
              categoryMatch = project.category === 'residential' || project.category === 'Residential'
            }
            break
          default:
            // For any other category, check both string and array formats
            if (Array.isArray(project.category)) {
              categoryMatch = project.category.includes(selectedCategory)
            } else {
              categoryMatch = project.category === selectedCategory
            }
        }
      }

      const statusMatch = selectedStatus === 'all' || project.status === selectedStatus
      const cityMatch = selectedCity === 'all' || selectedCity === 'Unknown' || project.location?.city === selectedCity
      return categoryMatch && statusMatch && cityMatch
    })

    return { categories, statuses, cities, filteredProjects }
  }, [selectedCategory, selectedStatus, selectedCity])

  return (
    <Suspense fallback={<LoadingLogo />}>
      <SectionHero
        title="nav.ourProjects"
        para="common.projectsDesc"
        image="/images/projects/noi/noi-gallery-13.webp"
        video="/videos/projects/mutlaa/mutlaa-main-1.mp4"
      />
      <TextPanel tKey="common.architecturalExcellence" paraTKey="common.architecturalExcellenceDesc" />
      <ProjectsShowcase />
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
      <AllProjects projects={filteredProjects} viewMode={viewMode} />
      <LatestNews className="bg-text text-black! px-18 max-md:px-4 py-0!" line={false} />
      <Newsletter dark={false} />
    </Suspense>
  )
}
