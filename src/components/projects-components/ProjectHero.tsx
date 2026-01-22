import { Project } from '@/types/project'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/text/AnimText'
import ImageIn from '../ui/unstyled/ImageIn'
import TText from '@/translations/TText'

export default function ProjectHero({ project }: { project: Project }) {
  if (!project) return null

  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-black text-text">
      <ImageIn
        src={project.gallery?.[0] || '/images/placeholder.webp'}
        alt={project.name}
        priority
        sizes="100vw"
        className="opacity-60"
        divClassName="absolute! inset-0"
        hasIconOverlay
      />

      <div className="relative w-full h-full flex flex-col justify-end p-18 max-md:px-4">
        <AnimText as="h1" className="font-sec max-md:text-5xl text-6xl leading-12 rtl:leading-22 tracking-tight">
          <TText tKey={`db.projects.${project.id}.name`} />
        </AnimText>

        {project.tagline && (
          <AnimIn delay={0.4}>
            <p className="max-w-3xl text-text/90 text-lg normal-case md:text-balance leading-relaxed tracking-wider">
              <TText tKey={`db.projects.${project.id}.tagline`} />
            </p>
          </AnimIn>
        )}
      </div>
    </section>
  )
}
