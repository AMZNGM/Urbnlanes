import { Project } from '@/types/project'
import { Calendar, TrendingUp, Clock, Building2 } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function ProjectOverview({ project }: { project: Project }) {
  if (!project.overview) return null

  const overviewItems = [
    {
      value: project.overview.startdate,
      icon: Calendar,
      labelKey: 'projects.overview.startDate',
      className: 'text-2xl',
    },
    {
      value: project.overview.value,
      icon: TrendingUp,
      labelKey: 'projects.overview.investmentValue',
      className: 'text-3xl',
    },
    {
      value: project.overview.enddate,
      icon: Calendar,
      labelKey: 'projects.overview.endDate',
      className: 'text-2xl',
    },
    {
      value: project.overview.workingTime,
      icon: Clock,
      labelKey: 'projects.overview.workingTime',
      className: 'text-2xl',
    },
    {
      value: project.overview.buildingArea,
      icon: Building2,
      labelKey: 'projects.overview.buildingArea',
      className: 'text-2xl',
    },
  ].filter((item) => item.value)

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-bg px-18 max-md:px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <AnimText as={'h2'} className="font-sec font-bold text-main text-4xl text-center rtl:leading-12 tracking-wider mb-4">
          <TText tKey="modal.overview" />
        </AnimText>

        <AnimIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {overviewItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="bg-main/25 rounded-2xl text-center p-6">
                <Icon className="w-8 h-8 text-main mx-auto mb-4" />
                <div className={`font-bold text-bg/50 ${item.className}`}>{item.value}</div>
                <p className="opacity-75 text-sm mt-2">
                  <TText tKey={item.labelKey} />
                </p>
              </div>
            )
          })}
        </AnimIn>
      </div>
    </section>
  )
}
