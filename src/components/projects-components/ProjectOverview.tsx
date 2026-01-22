import { Project } from '@/types/project'
import { Calendar, TrendingUp } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/text/AnimText'

export default function ProjectOverview({ project }: { project: Project }) {
  if (!project.overview) return null

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-12">
      <AnimText as={'h2'} className="font-sec text-4xl text-center rtl:leading-12 mb-8">
        <TText tKey="modal.overview" />
      </AnimText>

      <AnimIn className="max-w-6xl gap-8 grid grid-cols-1 md:grid-cols-3 mx-auto">
        {project.overview.value && (
          <div className="bg-main/25 rounded-2xl text-center p-6">
            <TrendingUp className="w-8 h-8 text-main mx-auto mb-4" />
            <div className="font-medium text-3xl">{project.overview.value}</div>
            <p className="opacity-75 text-sm mt-2">Investment Value</p>
          </div>
        )}

        {project.overview.startdate && (
          <div className="bg-main/25 rounded-2xl text-center p-6">
            <Calendar className="w-8 h-8 text-main mx-auto mb-4" />
            <div className="font-medium text-2xl">{project.overview.startdate}</div>
            <p className="opacity-75 text-sm mt-2">Start Date</p>
          </div>
        )}

        {project.overview.enddate && (
          <div className="bg-main/25 rounded-2xl text-center p-6">
            <Calendar className="w-8 h-8 text-main mx-auto mb-4" />
            <div className="font-medium text-2xl">{project.overview.enddate}</div>
            <p className="opacity-75 text-sm mt-2">Completion Date</p>
          </div>
        )}
      </AnimIn>
    </section>
  )
}
