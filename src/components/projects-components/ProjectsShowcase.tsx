import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import LineHeading from '@/components/shared/LineHeading'
import ProjectsImpact from '@/components/projects-components/ProjectsImpact'

export default function ProjectsShowcase() {
  const projectsIds = ['east-lane', 'levels-business-tower', 'noi', 'mid-lane', 'yellow-lane']
  const markedProjects = db.projects.filter((p) => projectsIds.includes(p.id))

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-24 max-md:py-12">
      <LineHeading tKey="common.markedProjects" />

      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 mb-12 py-8">
        {markedProjects.map((project, index) => (
          <AnimIn
            key={project.id}
            delay={0.1 * index}
            className={`group relative overflow-hidden bg-black rounded-2xl text-text cursor-pointer
              ${
                (index === 0 ? 'lg:col-start-1 lg:col-span-2' : '') +
                (index === 1 ? 'lg:col-start-3 lg:col-span-2' : '') +
                (index === 2 ? 'lg:col-start-5 lg:col-span-2' : '') +
                (index === 3 ? 'lg:col-start-2 lg:col-span-2 md:col-span-2' : '') +
                (index === 4 ? 'lg:col-start-4 lg:col-span-2' : '')
              }
            `}
          >
            <ImageIn
              src={project.gallery?.[2] || '/images/poster.png'}
              alt={project.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              divClassName="h-64!"
            />

            <div className="flex flex-col space-y-4 p-6">
              <AnimText as={'h4'} delay={0.5} className="font-sec font-bold text-xl">
                <TText tKey={`db.projects.${project.id}.name`} />
              </AnimText>
              <MainBtn href={`/projects/${project.id}`} tKey="common.viewProject" size="sm" />
            </div>
          </AnimIn>
        ))}
      </div>

      <LineHeading tKey="common.inKuwait" />

      <div className="h-full gap-4 grid md:grid-cols-2 py-8">
        <div className="h-full gap-4 max-md:order-last grid grid-cols-2">
          {db.whoweare.kuwaitProjects.map((project, index) => (
            <AnimIn key={index} delay={0.05 * index} className="group bg-black/10 hover:bg-black/20 rounded-lg transition-colors p-4">
              <AnimText as={'p'} delay={0.5} className="opacity-80 group-hover:opacity-100 text-sm transition-opacity duration-200">
                <TText tKey={`db.whoweare.kuwaitProjects.${index}`} />
              </AnimText>
            </AnimIn>
          ))}
        </div>

        <ProjectsImpact />
      </div>
    </section>
  )
}
