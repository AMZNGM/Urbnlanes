import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/text/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

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

export default function ProjectPartners() {
  return (
    <section className="relative w-dvw overflow-hidden bg-black text-text px-18 max-md:px-4 py-12">
      <AnimText as="h3" className="font-sec text-3xl mb-12">
        <TText tKey="common.projectPartners" />
      </AnimText>

      <div className="gap-8 max-md:gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {uniquePartners.map((partner, index) => (
          <AnimIn key={partner.name} delay={0.1 * index} className="group">
            <div className="relative h-full overflow-hidden flex flex-col justify-between bg-main/25 group-hover:bg-main/50 rounded-2xl transition-all group-hover:-translate-y-2 duration-300 p-8">
              <ImageIn src={partner.logo} alt={partner.name} className="object-contain!" divClassName="h-24! mb-12" />

              <h4 className="font-medium text-lg text-center mb-2">{partner.name}</h4>

              <p className="opacity-75 text-sm text-center mb-4">{partner.role}</p>

              <p className="bg-main opacity-60 rounded-2xl font-black text-black text-xs text-center mt-4 p-2">
                {partner.projects.length} project{partner.projects.length > 1 ? 's' : ''}
              </p>
            </div>
          </AnimIn>
        ))}
      </div>
    </section>
  )
}
