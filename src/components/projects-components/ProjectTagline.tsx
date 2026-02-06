import { Project } from '@/types/project'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function ProjectTagline({ project }: { project: Project }) {
  return (
    <div className="relative w-dvw overflow-hidden bg-text text-bg px-4 max-md:px-2 pb-12">
      {project.tagline && (
        <AnimText as={'p'} delay={0.5} className="max-w-5xl font-medium max-md:text-5xl text-8xl normal-case md:leading-28!">
          <TText tKey={`db.projects.${project.id}.tagline`} />
        </AnimText>
      )}
    </div>
  )
}
