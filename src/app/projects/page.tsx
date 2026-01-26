'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useMemo } from 'react'
import { LoadingLogo } from '@/components/loading-components/LoadingAnimations'
import db from '@/database/urbnlanes-db.json'

import SectionHero from '@/components/hero-components/sectionHero'
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
