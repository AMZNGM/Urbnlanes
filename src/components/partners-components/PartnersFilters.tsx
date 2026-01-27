'use client'

import { useState } from 'react'
import { getAllPartners } from '@/utils/partnerUtils'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import Shine from '@/components/ui/effects/Shine'
import MainBtn from '@/components/ui/buttons/MainBtn'
import LineHeading from '@/components/shared/LineHeading'

export default function PartnersFilters() {
  let partners = getAllPartners()
  let [selectedCategory, setSelectedCategory] = useState<'allPartners' | 'sisCompanies' | 'projectPartners'>('allPartners')
  let categories: { category: 'allPartners' | 'sisCompanies' | 'projectPartners'; names: string }[] = [
    { category: 'allPartners', names: `partners.allPartners` },
    { category: 'projectPartners', names: `partners.projectPartners` },
    { category: 'sisCompanies', names: `partners.sisCompanies` },
  ]

  return (
    <section className="relative w-dvw overflow-hidden bg-black text-text px-18 max-md:px-4 py-12">
      <div className="flex justify-center gap-4">
        {categories.map((category) => (
          <MainBtn
            key={category.category}
            size="lg"
            tKey={category.names}
            onClick={() => setSelectedCategory(category.category)}
            className={`w-full ${selectedCategory === category.category ? 'bg-main!' : 'bg-main/25! text-current! hover:bg-main/50'}`}
          />
        ))}
      </div>

      <div className={`relative w-full gap-8 max-md:gap-4 grid py-12 ${selectedCategory === 'allPartners' ? 'grid-cols-2' : ''}`}>
        {(selectedCategory === 'allPartners' || selectedCategory === 'projectPartners') && (
          <section className="relative w-full">
            <LineHeading tKey="partners.projectPartners" />

            <div className={`gap-8 max-md:gap-4 grid mt-8 ${selectedCategory === 'allPartners' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
              {partners.map((partner, index) => (
                <AnimIn key={partner.name} delay={0.1 * index} className="group">
                  <div className="relative h-85 overflow-hidden flex flex-col justify-between bg-main/25 group-hover:bg-main/50 rounded-2xl transition-all group-hover:-translate-y-2 duration-300 p-8">
                    <ImageIn
                      src={partner.logo}
                      alt={partner.name}
                      className="object-contain! rounded-2xl scale-100! p-4"
                      divClassName="h-24! rounded-2xl mb-8"
                    />

                    <h4 className="font-medium text-lg text-center mb-2">
                      <TText tKey={`partners.partnersNames.${partner.name}`} />
                    </h4>

                    <p className="opacity-75 text-sm text-center mb-4">
                      {Array.isArray(partner.role) ? (
                        partner.role.map((role: string, index: number) => (
                          <span key={role}>
                            <TText tKey={`partners.partnersRoles.${role}`} />
                            {index < (partner.role?.length || 0) - 1 && ', '}
                          </span>
                        ))
                      ) : (
                        <TText tKey={`partners.partnersRoles.${partner.role}`} />
                      )}
                    </p>

                    <p className="bg-main opacity-60 rounded-2xl font-black text-black text-xs text-center mt-4 p-2">
                      {partner.projects.length} <TText tKey="nav.projects" />
                      <span className="rtl:hidden">{partner.projects.length > 1 ? 's' : ''}</span>
                    </p>
                    <Shine />
                  </div>
                </AnimIn>
              ))}
            </div>
          </section>
        )}

        {(selectedCategory === 'allPartners' || selectedCategory === 'sisCompanies') && (
          <section className="relative w-full">
            <LineHeading tKey="partners.sisCompanies" />

            <div className={`gap-8 max-md:gap-4 grid mt-8 ${selectedCategory === 'allPartners' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
              {db.whoweare.sisterCompanies.map((company, index) => (
                <AnimIn key={company.title} delay={0.1 * index} className="group">
                  <div className="relative h-85 overflow-hidden flex flex-col justify-between bg-main/25 group-hover:bg-main/50 rounded-2xl transition-all group-hover:-translate-y-2 duration-300 p-8">
                    <ImageIn src={company.logo} alt={company.title} className="object-contain! rounded-2xl scale-100! p-4" divClassName="rounded-2xl mb-8" />
                    <h4 className="font-medium text-lg text-center mb-2">
                      <TText tKey={`partners.partnersNames.${company.title}`} />
                    </h4>
                    <Shine />
                  </div>
                </AnimIn>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  )
}
