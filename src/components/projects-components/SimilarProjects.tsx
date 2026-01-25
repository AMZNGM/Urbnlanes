import Link from 'next/link'
import { Project } from '@/types/project'
import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import RippleEffect from '@/components/ui/effects/RippleEffect'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function SimilarProjects({ currentProject, allProjects }: { currentProject: Project; allProjects: Project[] }) {
  if (!currentProject || !allProjects?.length) return null

  const similarProjects = allProjects.filter((project) => project.id !== currentProject.id && project.category === currentProject.category)

  // if (similarProjects.length === 0) return null

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-12">
      <MotionLine delay={1} />

      <AnimText as={'p'} delay={0.9} className="font-sec font-medium text-xs">
        <TText tKey="common.similarProjectsDesc" />
      </AnimText>

      <AnimText as={'h2'} delay={0.9} className="font-sec font-medium text-4xl text-center rtl:leading-12 tracking-widest mt-2">
        <TText tKey="common.similarProjects" />
      </AnimText>

      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4 mt-12">
        {similarProjects.slice(0, 4).map((project, index) => (
          <AnimIn key={project.id} delay={0.1 * index} className="group">
            <RippleEffect className="relative w-full h-full overflow-hidden flex flex-col rounded-2xl">
              <Link
                href={`/projects/${project.id}`}
                className="h-full overflow-hidden bg-main/25 border rounded-2xl transition-all group-hover:-translate-y-2 duration-500"
              >
                <ImageIn
                  src={project.gallery?.[0] || '/images/placeholder.webp'}
                  alt={project.name}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="group-hover:scale-105 transition-transform duration-500"
                  divClassName="relative overflow-hidden h-48!"
                  hasOverlay
                />

                <div className="space-y-2 px-4 py-8">
                  {project.category && (
                    <p className="font-mono font-bold text-xs tracking-widest">
                      <TText tKey={`common.${project.category}`} />
                    </p>
                  )}

                  {project.name && (
                    <h3 className="font-medium text-2xl">
                      <TText tKey={`db.projects.${project.id}.name`} />
                    </h3>
                  )}

                  {project.tagline && (
                    <p className="opacity-75 text-sm normal-case line-clamp-2 leading-relaxed">
                      <TText tKey={`db.projects.${project.id}.tagline`} />
                    </p>
                  )}

                  {project.shortDesc && (
                    <p className="opacity-75 text-sm normal-case line-clamp-3 leading-relaxed mt-2">
                      {typeof project.shortDesc === 'string' ? (
                        <TText tKey={`db.projects.${project.id}.shortDesc`} />
                      ) : (
                        <TText tKey={`db.projects.${project.id}.shortDesc.0`} />
                      )}
                    </p>
                  )}
                </div>
              </Link>
            </RippleEffect>
          </AnimIn>
        ))}
      </div>

      {similarProjects.length > 4 && (
        <AnimIn delay={0.6} className="text-center my-18">
          <MainBtn to="/projects" tKey="common.viewAllProjects" />
        </AnimIn>
      )}

      <MotionLine delay={1} />
    </section>
  )
}
