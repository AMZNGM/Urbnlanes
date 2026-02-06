'use client'

import { motion, useInView } from 'motion/react'
import { useRef, useEffect, useMemo, useState } from 'react'
import { getAllPartners } from '@/database/getPartners'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import LineHeading from '@/components/shared/LineHeading'

let PartnerCard = ({ partner, index, onInView, isActive }: { partner: any; index: number; onInView: (id: string) => void; isActive: boolean }) => {
  let ref = useRef(null)
  let isInView = useInView(ref, { amount: 0.6, margin: '-20% 0px -20% 0px' })

  useEffect(() => {
    if (isInView) {
      onInView(partner.name || partner.title)
    }
  }, [isInView, partner.name, partner.title, onInView])

  return (
    <div ref={ref} id={partner.name || partner.title} className="group relative w-full border-bg! border-b py-12">
      <div className={`${isActive ? 'opacity-100 translate-x-4' : 'opacity-10 scale-95'} transition-all duration-700 ease-[0.16,1,0.3,1]`}>
        <div className="flex max-xl:flex-col flex-1 md:gap-8">
          <ImageIn
            src={partner.logo}
            alt={partner.name || partner.title}
            className="object-contain! invert"
            divClassName="w-38 md:w-64 h-38! md:h-64! bg-text!"
          />

          <div className="flex flex-col justify-center gap-2 mt-2">
            <h3 className="font-light max-md:text-3xl text-7xl leading-[0.8] tracking-tighter">
              <TText tKey={`partners.partnersNames.${partner.name || partner.title}`} />
            </h3>

            <div className="flex flex-wrap gap-4 font-mono text-sm ms-2">
              {partner.role && (
                <div className="flex flex-wrap text-main">
                  {Array.isArray(partner.role) ? (
                    partner.role.map((role: string, i: number) => (
                      <span key={role} className="flex items-center">
                        <TText tKey={`partners.partnersRoles.${role}`} />
                        {i < partner.role.length - 1 && <span className="opacity-30 mx-2">•</span>}
                      </span>
                    ))
                  ) : (
                    <TText tKey={`partners.partnersRoles.${partner.role}`} />
                  )}
                </div>
              )}
            </div>

            {partner.projects && (
              <div className="font-mono text-sm tracking-[0.2em] ms-4">
                {partner.projects.length} <TText tKey="nav.projects" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PartnersFilters() {
  let [selectedCategory, setSelectedCategory] = useState<'allPartners' | 'sisCompanies' | 'partners'>('allPartners')
  let [activePartner, setActivePartner] = useState<string>('')
  let sisterCompanies = db.whoweare.sisterCompanies
  let partners = getAllPartners()

  let filteredItems = useMemo(() => {
    let items: any[] = []
    if (selectedCategory === 'allPartners' || selectedCategory === 'partners') {
      items = [...items, ...partners]
    }
    if (selectedCategory === 'allPartners' || selectedCategory === 'sisCompanies') {
      items = [...items, ...sisterCompanies]
    }
    return items
  }, [selectedCategory, partners, sisterCompanies])

  let categories: { category: 'allPartners' | 'sisCompanies' | 'partners'; names: string }[] = [
    { category: 'allPartners', names: `partners.allPartners` },
    { category: 'partners', names: `partners.projectPartners` },
    { category: 'sisCompanies', names: `partners.sisCompanies` },
  ]

  let stats = [
    { titleKey: 'partners.projectPartners', value: partners.length },
    { titleKey: 'partners.sisCompanies', value: db.whoweare.sisterCompanies.length },
    { titleKey: 'common.featuredProjects', value: db.projects.length },
    { titleKey: 'db.whoweare.statistics[0].title', value: db.whoweare.statistics[0].value },
  ]

  return (
    <section className="relative w-dvw min-h-dvh bg-text text-bg px-4 max-md:px-2 pb-12">
      <div className="max-w-7xl gap-4 grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] xl:grid-cols-[400px_1fr] mx-auto">
        <aside className="top-18 sticky h-fit space-y-4">
          <LineHeading lineFrom="left" tKey="common.statistics" className="text-xs" />

          <div className="gap-1 grid grid-cols-2 mb-14">
            {stats.map((stat, index) => (
              <div key={index} className="border rounded-lg font-mono p-1.5">
                <AnimText className="text-2xl mb-1">{stat.value}</AnimText>

                <AnimText as={'p'} className="text-sm normal-case rtl:leading-6">
                  <TText tKey={stat.titleKey} />
                </AnimText>
              </div>
            ))}
          </div>

          <LineHeading lineFrom="right" tKey="filters.filter" className="text-xs" />

          <div className="flex flex-col gap-4 font-mono">
            {categories.map((category) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`group relative w-fit ltr:text-left rtl:text-right transition-all duration-300 cursor-pointer ${selectedCategory === category.category ? 'border-b-2 border-bg! ltr:translate-x-4 rtl:-translate-x-4' : 'border-b border-bg/50! text-bg hover:translate-x-2'}`}
              >
                <span className="font-black text-xs tracking-widest">
                  <TText tKey={category.names} />
                </span>

                {selectedCategory === category.category && (
                  <motion.div layoutId="active-cat" className="top-1/2 rtl:-right-4 ltr:-left-4 absolute w-1.5 h-2 bg-bg -translate-y-1/2" />
                )}
              </button>
            ))}
          </div>

          <AnimIn blur center reAnim key={selectedCategory} className="w-fit space-y-2 border rounded-lg font-mono text-xs mt-8 p-2">
            <p className="tracking-widest">
              <TText tKey="partners.allPartners" />
            </p>

            <div style={{ scrollbarWidth: 'none' }} className="max-h-[40vh] overflow-y-auto space-y-1">
              {filteredItems.map((item) => (
                <button
                  key={item.name || item.title}
                  onClick={() => {
                    let element = document.getElementById(item.name || item.title)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                  }}
                  className={`block  transition-all duration-300 ltr:text-left rtl:text-right w-full cursor-pointer ${
                    activePartner === (item.name || item.title) ? 'text-bg/75 font-bold translate-x-2' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  <TText tKey={`partners.partnersNames.${item.name || item.title}`} />
                </button>
              ))}
            </div>
          </AnimIn>
        </aside>

        <div>
          {filteredItems.map((item, index) => (
            <PartnerCard
              key={item.name || item.title}
              partner={item}
              index={index}
              onInView={setActivePartner}
              isActive={activePartner === (item.name || item.title)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
