import { Project, Partner } from '@/types/project'
import { SoftLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function ProjectPartners({ project }: { project: Project }) {
  if (!project || !project.partners?.length) return null

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-bg px-4 max-md:px-2 py-12">
      <AnimText as={'h2'} className="font-sec text-4xl text-center rtl:leading-16 tracking-widest">
        <TText tKey="nav.partnersAssociates" />
      </AnimText>

      <AnimText as={'p'} className="font-light text-lg text-center normal-case tracking-widest">
        <TText tKey="common.collab" />
      </AnimText>

      <SoftLine className="h-0.5!" />

      <div
        className={`gap-8 max-md:gap-4 grid mt-16 ${
          project.partners.length === 1 ? 'grid-cols-1 justify-items-center' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}
      >
        {project.partners.map((partner: Partner, index: number) => (
          <AnimIn key={partner.name} delay={0.2 * index} className="flex flex-col items-center gap-2 bg-main/25 rounded-lg p-8">
            <ImageIn src={partner.logo} alt={partner.name} className="object-contain! invert p-4!" divClassName="w-38 h-38! mb-6 rounded-lg bg-text" />

            <AnimText as={'h3'} className="font-medium text-xl">
              {partner.name}
            </AnimText>

            <AnimText as={'p'} className="opacity-75 text-sm tracking-wider">
              {partner.role}
            </AnimText>
          </AnimIn>
        ))}
      </div>
    </section>
  )
}
