import db from '@/database/urbnlanes-db.json'

export interface Partner {
  name: string
  logo: string
  role?: string
  projects: string[]
}

export const getAllPartners = (): Partner[] => {
  const allPartners = new Map<string, Partner>()

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

  return Array.from(allPartners.values())
}
