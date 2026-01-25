import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'

interface ProjectsStatsProps {
  totalProjects: number
  filteredProjects: number
  categories: number
  cities: number
}

export default function ProjectsStats({ totalProjects, filteredProjects, categories, cities }: ProjectsStatsProps) {
  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-sec text-3xl text-center mb-12">
          <TText tKey="common.projectStatistics" />
        </h2>

        <div className="gap-8 grid grid-cols-2 md:grid-cols-4">
          <AnimIn delay={0.1} className="text-center">
            <div className="font-bold text-main text-4xl mb-2">{totalProjects}</div>
            <p className="opacity-75 text-sm">
              <TText tKey="common.totalProjects" />
            </p>
          </AnimIn>

          <AnimIn delay={0.2} className="text-center">
            <div className="font-bold text-main text-4xl mb-2">{filteredProjects}</div>
            <p className="opacity-75 text-sm">
              <TText tKey="common.filteredProjects" />
            </p>
          </AnimIn>

          <AnimIn delay={0.3} className="text-center">
            <div className="font-bold text-main text-4xl mb-2">{categories}</div>
            <p className="opacity-75 text-sm">
              <TText tKey="common.categories" />
            </p>
          </AnimIn>

          <AnimIn delay={0.4} className="text-center">
            <div className="font-bold text-main text-4xl mb-2">{cities}</div>
            <p className="opacity-75 text-sm">
              <TText tKey="common.cities" />
            </p>
          </AnimIn>
        </div>
      </div>
    </section>
  )
}
