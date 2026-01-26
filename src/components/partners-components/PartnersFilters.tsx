'use client'

import { useState } from 'react'
import PartnersCategoryTabs from '@/components/partners-components/PartnersCategoryTabs'
import ProjectPartners from '@/components/partners-components/ProjectPartners'
import SisterPartners from '@/components/partners-components/SisterPartners'

export default function PartnersFilters() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sister' | 'project'>('all')

  return (
    <>
      <PartnersCategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      {(selectedCategory === 'all' || selectedCategory === 'project') && <ProjectPartners />}
      {(selectedCategory === 'all' || selectedCategory === 'sister') && <SisterPartners />}
    </>
  )
}
