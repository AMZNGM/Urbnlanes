'use client'

import { useState, memo } from 'react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import MasonryGrid from '@/components/shared/MasonryGrid'
import Modal from '@/components/shared/Modal'

function AllProjectsComponent({ projects, viewMode }: { projects: any[]; viewMode: 'grid' | 'list' }) {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-12">
      {projects.length === 0 ? (
        <p className="bg-main/25 rounded-2xl font-bold text-2xl text-center py-12">
          <TText tKey="common.noProjectsFound" />
        </p>
      ) : (
        <>
          {viewMode === 'grid' ? (
            // grid
            <>
              <MasonryGrid projects={projects} openModal={setSelectedProject} />
              <Modal selectedProject={selectedProject} closeModal={() => setSelectedProject(null)} dark={false} />
            </>
          ) : (
            // list
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
                            <TText tKey={`locations.${project.location.city}`} />
                            <span className="me-1">,</span>
                            <TText tKey={`locations.${project.location.country}`} />
                          </span>
                        )}

                        {project.category && (
                          <div className="flex gap-2">
                            <span className="text-xs md:text-sm">
                              <TText tKey={`filters.${project.category[0]}`} />
                            </span>
                            <span className="text-xs md:text-sm">
                              <TText tKey={`filters.${project.category[1]}`} />
                            </span>
                          </div>
                        )}

                        {project.partners && project.partners.length > 0 && (
                          <span className="text-xs md:text-sm">
                            {project.partners.length} Partner{project.partners.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>

                    <MainBtn href={`/projects/${project.id}`} tKey="common.viewProject" className="max-md:w-full max-md:mx-auto ms-auto" />
                  </div>
                </AnimIn>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

const AllProjects = memo(AllProjectsComponent)
AllProjects.displayName = 'AllProjects'

export default AllProjects
