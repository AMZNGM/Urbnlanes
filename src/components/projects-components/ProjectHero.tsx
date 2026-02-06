import { Project } from '@/types/project'
import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '../ui/unstyled/ImageIn'

export default function ProjectHero({ project }: { project: Project }) {
  if (!project) return null

  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-bg text-text px-4 max-md:px-2 pb-8">
      <ImageIn
        src={project.gallery?.[0] || '/images/projects/yellow-residence/yr-gallery-2.webp'}
        alt={project.name}
        priority
        sizes="100vw"
        className="scale-100!"
        divClassName="blur-none! absolute! inset-0"
      />

      <MotionLine className="top-12 absolute bg-bg!" />

      <div className="w-full h-full flex flex-col justify-end">
        <AnimText as={'h1'} className="font-sec text-7xl capitalize">
          <TText tKey={`db.projects.${project.id}.name`} />
        </AnimText>
      </div>
    </section>
  )
}
