import { getAllPartners } from '@/utils/partnerUtils'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function PartnershipStats() {
  let partners = getAllPartners()
  let stats = [
    { delay: 0.3, titleKey: 'partners.projectPartners', value: partners.length },
    { delay: 0.1, titleKey: 'partners.sisCompanies', value: db.whoweare.sisterCompanies.length },
    { delay: 0.2, titleKey: 'common.featuredProjects', value: db.projects.length },
    { delay: 0.4, titleKey: 'db.whoweare.statistics[0].title', value: db.whoweare.statistics[0].value },
  ]

  return (
    <section className="relative w-dvw overflow-hidden bg-black text-text">
      <div className="h-66 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <AnimIn
            key={index}
            delay={stat.delay}
            className="h-full flex flex-col justify-center items-center gap-4 bg-black/25 hover:bg-main/50 border text-center transition-colors duration-200"
          >
            <div className="font-bold text-4xl mb-2">{stat.value}</div>
            <p className="opacity-75 text-sm">
              <TText tKey={stat.titleKey} />
            </p>
          </AnimIn>
        ))}
      </div>
    </section>
  )
}
