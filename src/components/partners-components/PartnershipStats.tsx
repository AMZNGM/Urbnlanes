import TText from '@/translations/TText'
import db from '@/database/urbnlanes-db.json'
import AnimIn from '@/components/ui/unstyled/AnimIn'

const allPartners = new Map<string, { name: string; logo: string; role?: string; projects: string[] }>()

db.projects.forEach((project) => {
  if (project.partners) {
    project.partners.forEach((partner) => {
      if (!allPartners.has(partner.name)) {
        allPartners.set(partner.name, {
          name: partner.name,
          logo: partner.logo,
          role: (partner as any).role || 'Partner',
          projects: [project.id],
        })
      } else {
        const existing = allPartners.get(partner.name)!
        existing.projects.push(project.id)
      }
    })
  }
})

const uniquePartners = Array.from(allPartners.values())

export default function PartnershipStats() {
  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black">
      <div className="h-66 grid grid-cols-2 md:grid-cols-4 mx-auto">
        <AnimIn delay={0.7} className="h-full flex flex-col justify-center items-center gap-4 bg-main/25 border text-center">
          <div className="font-bold text-4xl mb-2">{uniquePartners.length}</div>
          <p className="opacity-75 text-sm">
            <TText tKey="common.projectPartners" />
          </p>
        </AnimIn>

        <AnimIn delay={0.3} className="h-full flex flex-col justify-center items-center gap-4 bg-main/25 border text-center">
          <div className="font-bold text-4xl mb-2">{db.whoweare.sisterCompanies.length}</div>
          <p className="opacity-75 text-sm">
            <TText tKey="common.sisCompanies" />
          </p>
        </AnimIn>

        <AnimIn delay={0.4} className="h-full flex flex-col justify-center items-center gap-4 bg-main/25 border text-center">
          <div className="font-bold text-4xl mb-2">{db.projects.length}</div>
          <p className="opacity-75 text-sm">
            <TText tKey="common.projectsDelivered" />
          </p>
        </AnimIn>

        <AnimIn delay={0.9} className="h-full flex flex-col justify-center items-center gap-4 bg-main/25 border text-center">
          <div className="font-bold text-4xl mb-2">36+</div>
          <p className="opacity-75 text-sm">
            <TText tKey="db.whoweare.statistics[0].title" />
          </p>
        </AnimIn>
      </div>
    </section>
  )
}
