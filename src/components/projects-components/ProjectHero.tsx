import { Project } from '@/types/project'
import TText from '@/translations/TText'
import ImageIn from '../ui/unstyled/ImageIn'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function ProjectHero({ project }: { project: Project }) {
  if (!project) return null

  return (
    <section className="relative w-dvw h-dvh overflow-hidden bg-text text-text p-2">
      <ImageIn
        src={project.gallery?.[0] || '/images/projects/yellow-residence/yr-gallery-2.webp'}
        alt={project.name}
        priority
        sizes="100vw"
        className="opacity-60 scale-100!"
        divClassName="overflow-hidden rounded-2xl blur-none! bg-bg!"
        data-scroll
        data-scroll-speed="-0.6"
      />

      <div data-scroll data-scroll-speed="0.6" className="z-10 absolute inset-0 flex flex-col justify-end duration-300 ease-linear px-18 max-md:px-4 py-4">
        <AnimText
          as="h1"
          stagger={0.15}
          className="rounded-2xl font-bold text-[10vw] max-md:text-[12dvw] text-center text-nowrap ltr:leading-38 rtl:leading-88 max-2xl:ltr:leading-none transition-all duration-200"
        >
          <TText tKey={`db.projects.${project.id}.name`} />
        </AnimText>
      </div>
    </section>
  )
}
