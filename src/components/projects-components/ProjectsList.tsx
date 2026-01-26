import TText from '@/translations/TText'
import { formatTextContent } from '@/utils/textUtils'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import { Grid, List } from 'lucide-react'

interface ProjectsListProps {
  projects: any[]
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-sec text-3xl text-center mb-12">
          <TText tKey="common.allProjects" />
        </h2>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="opacity-75 text-xl">
              <TText tKey="common.noProjectsFound" />
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project, index) => (
              <AnimIn key={project.id} delay={0.1 * index} className="group">
                <div className="relative overflow-hidden bg-black rounded-2xl text-text transition-all group-hover:-translate-y-1 duration-300">
                  <div className="flex md:flex-row flex-col">
                    {/* Project Image */}
                    <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                      <ImageIn
                        src={project.gallery?.[0] || '/images/placeholder.webp'}
                        alt={project.name}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="group-hover:scale-110 transition-transform duration-300"
                        divClassName="absolute inset-0"
                      />

                      {/* Status Badge */}
                      <div className="top-4 right-4 absolute">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status === 'completed'
                              ? 'bg-green-500 text-white'
                              : project.status === 'ongoing'
                                ? 'bg-blue-500 text-white'
                                : 'bg-yellow-500 text-black'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="top-4 left-4 absolute">
                          <span className="bg-main rounded-full font-semibold text-black text-xs px-3 py-1">
                            <TText tKey="common.featured" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 p-6">
                      <div className="h-full flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            {project.logo && (
                              <ImageIn
                                src={project.logo}
                                alt={`${project.name} logo`}
                                sizes="32px"
                                className="w-8 h-8 object-contain"
                                divClassName="w-8 h-8 flex-shrink-0"
                              />
                            )}
                            <h3 className="font-sec font-bold text-2xl">{project.name}</h3>
                          </div>

                          <p className="opacity-75 text-base line-clamp-3 mb-4">{formatTextContent(project.shortDesc) || project.tagline}</p>

                          <div className="flex flex-wrap gap-4 opacity-60 text-sm mb-6">
                            <span>
                              {project.location?.city}, {project.location?.country}
                            </span>
                            <span className="capitalize">{project.category}</span>
                            {project.partners && project.partners.length > 0 && <span>{project.partners.length} Partners</span>}
                          </div>
                        </div>

                        <div className="flex flex-col justify-end ml-6">
                          <MainBtn href={`/projects/${project.id}`} tKey="common.viewProject" className="whitespace-nowrap" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
