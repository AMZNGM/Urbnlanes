import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function ListGrid({ projects, openModal }: { projects: any[]; openModal: (p: any) => void }) {
  return (
    <div className="h-full gap-4 grid grid-cols-2">
      {projects.map((project, index) => (
        <AnimIn
          key={project.id}
          delay={0.1 * index}
          className="group relative h-full overflow-hidden flex max-md:flex-col bg-main/50 hover:bg-main/75 backdrop-blur-2xl rounded-2xl transition-colors duration-500"
        >
          <ImageIn
            src={project.gallery?.[0] || '/images/placeholder.webp'}
            alt={project.name}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="group-hover:scale-110 transition-transform duration-700 ease-out"
            divClassName="relative max-md:w-full md:w-2/5 h-48! md:h-full! overflow-hidden"
            hasOverlay
          />

          <div
            className={`top-4 rtl:right-4 ltr:left-4 z-10 absolute pointer-events-none px-3 py-1.5 rounded-full text-xs font-semibold
                          ${project.status === 'completed' ? 'bg-green-500 text-text' : project.status === 'ongoing' ? 'bg-blue-500 text-text' : 'bg-yellow-500 text-black'}`}
          >
            {project.status}
          </div>

          <div className="flex flex-col flex-1 justify-between gap-4 p-4">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h3 className="font-sec font-bold text-2xl md:text-3xl">
                  <TText tKey={`db.projects.${project.id}.name`} />
                </h3>
                <p className="text-sm md:text-base normal-case line-clamp-2">
                  <TText tKey={`db.projects.${project.id}.shortDesc`} />
                </p>
              </div>

              <div className="flex flex-col flex-wrap gap-2 border-t normal-case mt-8 pt-2">
                {project.location?.city && project.location?.country && (
                  <span className="text-xs md:text-sm">
                    {project.location.city}, {project.location.country}
                  </span>
                )}

                {project.category && (
                  <div className="flex gap-2">
                    <span className="text-xs md:text-sm">{project.category[0]}</span>
                    {project.category[1] && (
                      <>
                        <span className="text-xs md:text-sm">•</span>
                        <span className="text-xs md:text-sm">{project.category[1]}</span>
                      </>
                    )}
                  </div>
                )}

                {project.partners && project.partners.length > 0 && (
                  <span className="text-xs md:text-sm">
                    {project.partners.length} Partner{project.partners.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            <MainBtn
              // href={`/projects/${project.id}`}
              onClick={() => openModal(project)}
              tKey="common.viewProject"
              className="max-md:w-full max-md:mx-auto ms-auto"
            />
          </div>
        </AnimIn>
      ))}
    </div>
  )
}
